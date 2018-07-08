import fetch from '@/config/Util/HttpUtil/Fetch'
import auth from '@/config/Util/HttpUtil/Fetch/auth'

export const login = (data) => auth('/auth/login', data, "POST");
export const validate = (data) => fetch('/auth/refresh');
export const logout = (data) => fetch('/auth/logout');