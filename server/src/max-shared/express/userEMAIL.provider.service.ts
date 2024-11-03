// import { Request } from 'express';
// import { Role } from '../../types/user';

// export const userEMAILProviderService = (
//   email: string,
//   request: Request,
//   ADMIN_USEREMAIL_ERROR: string,
// ) => {
//   /**
//    * Make provision for admin.
//    */
//   const { role } = request.token;

//   let mail;
//   if (role === Role.ADMIN) {
//     const userEmail = request.params.email;
//     if (!userEmail) {
//       throw Error(ADMIN_USEREMAIL_ERROR);
//     }
//     mail = userEmail;
//   }

//   if (!mail) {
//     mail = email;
//   } 
  
//   return mail;  
// };
