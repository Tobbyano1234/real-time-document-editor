// import { Request } from 'express';
// import { Role } from '../../types/user';

// export const userIDProviderService = (
//   request: Request,
//   ADMIN_USERID_ERROR: string
// ) => {
//   /**
//    * Make provision for admin.
//    */
//   const { sub, role } = request.token;

//   let userId;
//   if (role === Role.ADMIN) {
//     const userID = request.params.userID;
//     if (!userID) {
//       throw Error(ADMIN_USERID_ERROR);
//     }
//     userId = userID;
//   }

//   if (!userId) {
//     userId = sub;
//   } 
  
//   return userId;  
// };
