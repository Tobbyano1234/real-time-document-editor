// import { Request } from 'express';
// import httpStatus from 'http-status';

// import { BaseController } from '../../../../entrova-shared/api';
// import { UserOnboardingModule } from '../../../../entrova-dashboard/modules/userOnboarding.module';
// import { UserOnboardingSetupDTO } from '../../DTOs/UserOnboardingSetupDTO';
// import { singleFileUpload } from '../../../../entrova-shared/fileUpload';

// import { GetUserModule } from '../../modules/getUser.module';
// import { UpdateUserModule } from '../../modules/updateUser.module';
// import { CheckEmailDTO, CheckUserDTO, GetUserDTO } from '../../DTOs/GetUserDTO';
// import { singleFileUpload } from '../../../../entrova-shared/fileUpload';
// import { UpdateUserNameHook } from '../../hooks/update.user.username.hook';
// import { UpdateUserFullNameHook } from '../../hooks/update.user.fullname.hook';
// import { UpdateUserProfileDTO, UpdateUserUsernameDTO, UpdateUserEmailDTO } from '../../DTOs/UpdateUserDTO';


// export class UserController {
    //   static checkEmail = BaseController(async (request: Request) => {
    //     const email = request.query.email as string;
    //     const CheckEmailDTO = { email, userID: request.token._id } as CheckEmailDTO;
    //     const { success, message, data } = (await GetUserModule(
    //       { DTO: ['check-email', CheckEmailDTO], onSuccess: () => { } }))!;
    //     return { status: success ? httpStatus.OK : httpStatus.BAD_REQUEST, message, data };
    //   }
    //   );

    //   static checkUsername = BaseController(
    //     async (request: Request) => {
    //       const username = request.query.username as string;
    //       const CheckUserDTO = { username, userID: request.token._id } as CheckUserDTO;
    //       const { success, message, data } = (await GetUserModule(
    //         { DTO: ['check-username', CheckUserDTO], onSuccess: () => { } }))!;
    //       return { status: success ? httpStatus.OK : httpStatus.BAD_REQUEST, message, data };
    //     }
    //   );



    //   static updateProfile = BaseController(
    //     async (request: Request) => {
    //       const UpdateUserProfileDTO = request.body as UpdateUserProfileDTO;
    //       const { avatar: image } = UpdateUserProfileDTO;
    //       UpdateUserProfileDTO.userID = request.token._id;
    //       UpdateUserProfileDTO.avatar = request.file ? (await singleFileUpload(request)).secure_url : image || '';
    //       const { message, data } = (await UpdateUserModule({ DTO: ['profile', UpdateUserProfileDTO], onSuccess: UpdateUserFullNameHook }))!;
    //       return { status: httpStatus.OK, message, data };
    //     }
    //   );

    //   static updateUsername = BaseController(
    //     async (request: Request) => {
    //       const UpdateUserUsernameDTO = request.body as UpdateUserUsernameDTO;
    //       UpdateUserUsernameDTO.userID = request.token._id;
    //       const { message, data } = (await UpdateUserModule({ DTO: ['username', UpdateUserUsernameDTO], onSuccess: UpdateUserNameHook }))!;
    //       return { status: httpStatus.OK, message, data };
    //     }
    //   );

    //   static updateEmail = BaseController(
    //     async (request: Request) => {
    //       const UpdateUserEmailDTO = request.body as UpdateUserEmailDTO;
    //       UpdateUserEmailDTO.userID = request.token._id;
    //       const { message, data } = (await UpdateUserModule({ DTO: ['email', UpdateUserEmailDTO], onSuccess: () => { } }))!;
    //       return { status: httpStatus.OK, message, data };
    //     }
    //   );

    //   static getUser = BaseController(
    //     async (request: Request) => {
    //       const userID = request.params.ID;
    //       const { message, data } = (await GetUserModule(
    //         { DTO: ['single', { userID }], onSuccess: () => { } }))!;
    //       return { status: httpStatus.OK, message, data };
    //     }
    //   );

    //   static getUserProfile = BaseController(
    //     async (request: Request) => {
    //       const GetUserDTO = request.query as GetUserDTO;
    //       const { message, data } = (await GetUserModule(
    //         { DTO: ['profile', GetUserDTO], onSuccess: () => { } }))!;
    //       return { status: httpStatus.OK, message, data };
    //     }
    //   );
// }
