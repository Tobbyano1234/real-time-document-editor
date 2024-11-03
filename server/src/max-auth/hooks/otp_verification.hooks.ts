// import { UserMetaDataGeneral } from "../../typings/User.types";
// // import { AdminMetaDataGeneral } from "../../typings/Admin.types";
// import { sendRegistrationMail } from "../../entrova-shared/mail";
// import { timeDifferenceInSeconds } from "../../entrova-shared/time";
// import { CompanyMetaDataGeneral } from "../../typings/Company.types";
// // import { MerchantMetaDataGeneral } from "../../typings/Merchant.types";
// import { CompanyEmployeeMetaDataGeneral } from "../../typings/CompanyStaff.types";
// import {
//     User,
//     GeneralModel, ModelNames,
//     Company,
//     // Admin,

//     // Merchant,
//     CompanyEmployee
// } from "../../entrova-entities";


// export const OTPUserVerifiedHook = (user: User) => process.nextTick(async () => {
//   const {_id} = user;
//   const UserMetaData = await GeneralModel.findOne(
//     {collectionID: _id, collectionName: ModelNames.USER, 'associatedData.type': 'metaData'}) as 
//     UserMetaDataGeneral;
//   if (UserMetaData){
//     const verifiedAt = UserMetaData.associatedData.metaData.verifiedAt;
//     if (timeDifferenceInSeconds(verifiedAt) <= 30){
//       await sendRegistrationMail(user);
//     }
//   }
// });

// export const OTPCompanyEmployeeVerifiedHook = (companyStaff: CompanyEmployee) => process.nextTick(async () => {
//   const {_id} = companyStaff;
//   const CompanyStaffMetaData = await GeneralModel.findOne(
//     {collectionID: _id, collectionName: ModelNames.COMPANY_EMPLOYEE, 'associatedData.type': 'metaData'}) as 
//     CompanyEmployeeMetaDataGeneral;
//   if (CompanyStaffMetaData){
//     const verifiedAt = CompanyStaffMetaData.associatedData.metaData.verifiedAt;
//     if (timeDifferenceInSeconds(verifiedAt) <= 30){
//       await sendRegistrationMail(companyEmployee);
//     }
//   }
// });

// // export const OTPAdminVerifedHook = (admin: Admin) => process.nextTick(async () => {
// //   const {_id} = admin;
// //   const AdminMetaData = await GeneralModel.findOne(
// //     {collectionID: _id, collectionName: ModelNames.ADMIN, 'associatedData.type': 'metaData'}) as 
// //     AdminMetaDataGeneral;
// //   if (AdminMetaData){
// //     const verifiedAt = AdminMetaData.associatedData.metaData.verifiedAt;
// //     if (timeDifferenceInSeconds(verifiedAt) <= 30){
// //       await sendRegistrationMail(admin);
// //     }
// //   }
// // });

// export const OTPCompanyVerifiedHook = (company: Company) => process.nextTick(async () => {
//   const {_id, email, name} = company;
//   const CompanyMetaData = await GeneralModel.findOne(
//     {collectionID: _id, collectionName: ModelNames.COMPANY, 'associatedData.type': 'metaData'}) as 
//     CompanyMetaDataGeneral;
//   if (CompanyMetaData){
//     const verifiedAt = CompanyMetaData.associatedData.metaData.verifiedAt;
//     if (timeDifferenceInSeconds(verifiedAt) <= 30){
//       await sendRegistrationMail({email, firstname: name, lastname: ""});
//     }
//   }
// });

