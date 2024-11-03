import { AxiosError } from 'axios';
import axios from '../service/axiosConfig';
import {
  changePasswordWithoutEmailReqTypes,
  sendVerifyOtpReqTypes,
  ISignupPayload,
  verifyOtpReqTypes,
  ILoginPayload
} from './requestTypes';

export const signupUserReq = async (body: ISignupPayload) => {
  try {
    const res = await axios.post(`/auth/signup-user`, body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};

export const loginReq = async (body: ILoginPayload) => {
  try {
    const res = await axios.post(`/auth/signin-user`, body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};


export const sendVerifyOtpReq = async (body: sendVerifyOtpReqTypes) => {
  try {
    const res = await axios.post('/auth/send-otp-all-user', body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};


export const verifyOtpReq = async (body: verifyOtpReqTypes) => {
  try {
    const res = await axios.post(`/auth/verify-otp-all-user`, body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};

export const signInReq = async (body: any) => {
  try {
    const res = await axios.post('/auth/signin-user', body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};

export const resetPasswordReq = async (body: any) => {
  try {
    const res = await axios.post('/auth/reset-password-company', body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};

export const verifyEmailReq = async (body: any) => {
  try {
    const res = await axios.post('/auth/verify-email-company', body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};

export const verifyPasswordReq = async (body: any) => {
  try {
    const res = await axios.post('/auth/verify-password-company', body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};

export const changePasswordReq = async (body: changePasswordWithoutEmailReqTypes) => {
  try {
    const res = await axios.post('/auth/change-password-company', body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};
