import { AxiosError } from 'axios';
import axios from './axiosConfig';
import { ISignupPayload, ILoginPayload, CreateDocumentPayload } from './requestTypes';

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

export const createDocumentReq = async (body: CreateDocumentPayload) => {
  try {
    const res = await axios.post('/documents', body);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};
