import { Joi } from "celebrate";
import { toObjectId } from "../../../max-shared/validateToObjectID";

export default {
  signUpCreateCompany: {
    body: {
      firstName: Joi.string().min(3).max(25).required(),
      lastName: Joi.string().min(3).max(25).required(),
      email: Joi.string().email().required(),
      hearAboutUs: Joi.string().min(5).max(200).required(),
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. It should be a minimum of 6 characters long.",
        }),
      confirmPassword: Joi.ref("password"),
    },
  },
  signUpCompanyInfo: {
    body: {
      companyName: Joi.string().min(2).max(50).required(),
      companySize: Joi.string().max(10).required(),
      jobRole: Joi.string().min(3).max(25).required(),
    },
  },
  signUpCompanyPersonalInfo: {
    body: {
      nationality: Joi.string().min(4).max(50).required(),
      DOB: Joi.date().required(),
      phoneNumber: Joi.string().min(8).max(10).required(),
      countryCode: Joi.string().min(1).max(4).required(),
    },
  },
  signUpCompanyInvitation: {
    body: {
      inviteeEmails: Joi.array().items(Joi.string().email()),
      role: Joi.string(),
    },
  },
  signupUser: {
    body: {
      name: Joi.string().min(2).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. It should be a minimum of 6 characters long.",
        }),
      confirmPassword: Joi.ref("password"),
    },
  },
  signupUserBusinessType: {
    body: {
      businessType: Joi.string().min(2).max(25).required(),
      nationality: Joi.string().min(2).max(50).required(),
    },
  },
  signupCompanyEmployee: {
    body: {
      // firstName: Joi.string().min(2).max(25).required(),
      // lastName: Joi.string().min(2).max(25).required(),
      personalEmail: Joi.string().email().required(),
      inviteCode: Joi.string().required(),
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. It should be a minimum of 6 characters long.",
        }),
      confirmPassword: Joi.ref("password"),
    },
  },
  googleAuthCode: {
    body: {
      code: Joi.string().required(),
      context: Joi.string(),
    },
  },
  signinUser: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  signinStatusUser: {
    body: {
      userID: Joi.string().min(24).max(24).required(),
      token: Joi.string().required(),
    },
  },
  signinCompany: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  signinStatusCompany: {
    body: {
      companyID: Joi.string().min(24).max(24).required(),
      token: Joi.string().required(),
    },
  },
  signinCompanyEmployee: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  signinStatusCompanyEmployee: {
    body: {
      companyEmployeeID: Joi.string().min(24).max(24).required(),
      token: Joi.string().required(),
    },
  },
  signupAdmin: {
    body: {
      firstName: Joi.string().min(2).max(25).required(),
      lastName: Joi.string().min(2).max(25).required(),
      email: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().min(8).required(),
    },
  },
  signinAdmin: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  signinStatusAdmin: {
    body: {
      adminID: Joi.string().min(24).max(24).required(),
      token: Joi.string().required(),
    },
  },
  sendOtpUser: {
    body: {
      email: Joi.string().email().required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  sendOtpCompany: {
    body: {
      email: Joi.string().email().required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  sendOtpCompanyEmployee: {
    body: {
      email: Joi.string().email().required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  sendOtpAdmin: {
    body: {
      email: Joi.string().email().required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  sendOtpAllUser: {
    body: {
      email: Joi.string().email().required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  verifyOtpUser: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).allow(""),
      otp: Joi.required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  verifyOtpCompany: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).allow(""),
      otp: Joi.required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  verifyOtpCompanyEmployee: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).allow(""),
      otp: Joi.required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  verifyOtpAdmin: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8),
      otp: Joi.required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  verifyOtpAllUser: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8),
      otp: Joi.required(),
      type: Joi.string().allow("reset", "verify").lowercase(),
    },
  },
  verifyPasswordUser: {
    body: {
      oldPassword: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
    },
  },
  verifyPasswordCompany: {
    body: {
      oldPassword: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
    },
  },
  verifyPasswordCompanyEmployee: {
    body: {
      oldPassword: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
    },
  },
  verifyPasswordAdmin: {
    body: {
      oldPassword: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
    },
  },
  verifyEmailUser: {
    body: {
      userID: Joi.string().min(24).max(24).required(),
      email: Joi.string().email().required(),
    },
  },
  verifyEmailCompany: {
    body: {
      companyID: Joi.string().min(24).max(24).required(),
      email: Joi.string().email().required(),
    },
  },
  verifyEmailCompanyEmployee: {
    body: {
      companyEmployeeID: Joi.string().min(24).max(24).required(),
      email: Joi.string().email().required(),
    },
  },
  verifyEmailAdmin: {
    body: {
      adminID: Joi.string().min(24).max(24).required(),
      email: Joi.string().email().required(),
    },
  },
  changePasswordUser: {
    body: {
      oldPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().min(8).required(),
      confirmPassword: Joi.string().min(8).required(),
      otp: Joi.string().required(),
    },
  },
  changePasswordCompany: {
    body: {
      oldPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().min(8).required(),
      confirmPassword: Joi.string().min(8).required(),
      otp: Joi.string().required(),
    },
  },
  changePasswordCompanyEmployee: {
    body: {
      oldPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().min(8).required(),
      confirmPassword: Joi.string().min(8).required(),
      otp: Joi.string().required(),
    },
  },
  changePasswordAdmin: {
    body: {
      newPassword: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. It should be a minimum of 6 characters long.",
        }),
      confirmPassword: Joi.ref("password"),
    },
  },
  resetPasswordUser: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).required(),
    },
  },
  resetPasswordCompany: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).required(),
    },
  },
  resetPasswordCompanyEmployee: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).required(),
    },
  },
  resetPasswordAdmin: {
    body: {
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).required(),
    },
  },
  deactivateAccount: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
  },
  verifyTwoFactorToken: {
    body: {
      token: Joi.string().length(6).required(),
    },
  },
  inviteAdmin: {
    body: Joi.object({
      employeeID: Joi.string().min(24).max(24).custom(toObjectId).required(),
      role: Joi.string()
        .allow("finance", "people_manager", "admin", "super_admin")
        .required(),
    }),
  },
  getInviteInfo: {
    body: Joi.object({
      token: Joi.string().required(),
      inviteCode: Joi.string().required(),
    }),
  },
  acceptAdminInvite: {
    params: {
      token: Joi.string().required(),
      code: Joi.string().required(),
    },
  },
  rejectAdminInvite: {
    params: {
      token: Joi.string().required(),
      code: Joi.string().required(),
    },
  },
  removeCompanyAdmin: {
    params: {
      employeeID: Joi.string().custom(toObjectId).required(),
    },
  },
};
