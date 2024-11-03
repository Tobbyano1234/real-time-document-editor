// import userValidation from '../validations';
// import { UserController } from '../controllers';
// import { AuthMiddleware } from '../../../../entrova-auth/services';
// import { baseRouter, baseValidation } from '../../../../entrova-shared/api';
// import { singleFileUploadMiddleware } from '../../../../entrova-shared/fileUpload';


// const { PUT, GET, router } = baseRouter();

// PUT('/profile', [ singleFileUploadMiddleware.single('avatar'), baseValidation(userValidation.updateProfile), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, UserController.updateProfile ]);

// PUT('/username', [ baseValidation(userValidation.updateUsername), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, UserController.updateUsername ]);

// PUT('/email', [ baseValidation(userValidation.updateEmail), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, UserController.updateEmail ]);

// GET('/:ID', [baseValidation(userValidation.get), UserController.getUser]);
// GET('/profile/public', [baseValidation(userValidation.getUserProfile), UserController.getUserProfile]);

// GET('/check/email', [ baseValidation(userValidation.checkEmail), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, UserController.checkEmail ]);

// GET('/check/username', [ baseValidation(userValidation.checkUsername), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, UserController.checkUsername ]);

// export default router;
