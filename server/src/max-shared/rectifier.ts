
type baseObjectType =  {[key:string]: any};
type rectifyOptionType =
 | [string] 
 | [string, string] 
 | [string, string, (...args: any[]) => any] 
 | {from: string, to?: string, as?: (...args: any[]) => any};

export type rectifyOptions = Array<rectifyOptionType>;
export const rectifier = async (_Object: baseObjectType, options: rectifyOptions) => {
  const rectifiedObject: baseObjectType = {};
  for (let opt of options){
    if (Array.isArray(opt)){
      if (opt.length == 1){
        rectifiedObject[opt[0]] = _Object[opt[0]];
      }
      if (opt.length == 2){
        rectifiedObject[opt[0]] = _Object[opt[1]];
      }
      if (opt.length == 3){
        rectifiedObject[opt[0]] = await opt[2](_Object[opt[1]]);
      }
    }else{
      if (opt.from && !(opt.to || opt.as)){
        rectifiedObject[opt.from] = _Object[opt.from];
      }
      if (opt.from && opt.to && !opt.as){
        rectifiedObject[opt.from] = _Object[opt.to];
      }
      if (opt.from && opt.to && opt.as){
        rectifiedObject[opt.from] = await opt.as(_Object[opt.to]);
      }
    }
  }
  return rectifiedObject;
};


// const listObj: baseObjectType = {'23045': {
//   name: 'Super List',
// }}

// async function getListByID(id: string){
//   return new Promise((resolve, _reject) => resolve(listObj[id].name));
// }

// const qopt: rectifyOptions = [
//   // ['name'],
//   // ['wishlistName', 'listID', async (id: string) => await getListByID(id)],
//   // ['amountPaid', 'paid'],
//   // ['totalCost'],
//   {from: 'name'},
//   {from: 'wishlistName', to: 'listID', as: async (id: string) => await getListByID(id)},
//   {from: 'amountPaid', to: 'paid'},
//   {from: 'totalCost'},
// ];

// const obj = {
//   name: 'Timi',
//   listID: '23045',
//   paid: 5000,
//   totalCost: 7500,
// };

// (async function run(){
//   console.log(
//     await rectifier(
//       obj, 
//       qopt
//     )
//   );
// })();
