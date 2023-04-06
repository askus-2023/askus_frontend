import { api } from "../config";

export const signUp = async (data) => {
  const response = await api.post('/v1/signup', data)
  return response
}

export const duplicationCheck = async (data) => {
  const response = await api.post ('/v1/signup/email/duplicated', data)
  return response
}

export const signIn = async (data) => {
  const response = await api.post('v1/signin', data)
  return response
}