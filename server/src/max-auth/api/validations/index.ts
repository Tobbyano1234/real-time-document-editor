import { Joi } from "celebrate";
import { toObjectId } from "../../../max-shared/validateToObjectID";

export default {
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
  signinUser: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }};
