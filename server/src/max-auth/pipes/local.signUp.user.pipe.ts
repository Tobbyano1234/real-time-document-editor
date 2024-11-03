import bcrypt from "bcrypt";

import { User, UserModel } from "../../max-entities";
import { LocalSignUpUserDTO } from "../DTOs";
import { config } from "../../max-web-api/config";

export const LocalSignUpUserPipe = async (DTO: LocalSignUpUserDTO) => {
  const { name, email, password } = DTO;
  const userExists = (await UserModel.findOne({ email })) as User;
  if (userExists)
    return {
      success: false,
      message: "Email already exists",
      data: null,
      hookData: null,
    };

  const hashedPassword = await bcrypt.hash(
    password,
    +config.defaults.saltWorker
  );

  const data = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    success: true,
    message: `Signup successful`,
    data,
    hookData: data,
  };
};
