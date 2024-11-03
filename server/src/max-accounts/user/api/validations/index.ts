// import { Joi } from 'celebrate';
// import { toObjectId } from '../../../../unboxd-shared/validateToObjectID';

// export default {
//   updateProfile: {
//     body: Joi.object(
//       {
//         avatar: Joi.any(),
//         firstname: Joi.string().pattern(/^[a-zA-Z]+$/),
//         lastname: Joi.string().pattern(/^[a-zA-Z]+$/),
//         organisationName: Joi.string(),
//         organisationCategoryID: Joi.string().min(24).max(24).custom(toObjectId),
//       }
//     ).or('firstname', 'lastname', 'avatar'),
//   },

//   updateUsername: {
//     body: Joi.object(
//       {
//         username: Joi.string().pattern(/^[a-zA-Z]+$/).required(),
//       }
//     )
//   },

//   updateEmail: {
//     body: Joi.object(
//       {
//         email: Joi.string().required(),
//         password: Joi.string().required(),
//         otp: Joi.string().required(),
//       }
//     )
//   },

//   get: {
//     params: {
//       ID: Joi.string().min(24).max(24).required(),
//     }
//   },

//   getUserProfile: {
//     query: Joi.object({
//       email: Joi.string(), 
//       userID: Joi.string().min(24).max(24),
//       username: Joi.string(),
//     }).or("email", "userID", "username")
//   },

//   checkUsername: {
//     query: {
//       username: Joi.string().required(),
//     }
//   },

//   checkEmail: {
//     query: {
//       email: Joi.string().required(),
//     }
//   }
// } 
