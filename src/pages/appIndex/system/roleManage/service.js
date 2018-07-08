import fetch from '@/config/Util/HttpUtil/Fetch'

//查询 删除
export const queryData = (data) => fetch('/base/role/search', data, "POST");
export const unique = (data) => fetch('/base/role/unique', data, "POST");
export const deleting = (data) => fetch('/base/role/delete', data, "GET", true, true);
export const create = (data) => fetch('/base/role/create', data, "POST", true, true);
export const edit = (data) => fetch('/base/role/update', data, "POST", true, true);
export const getPermission = (data) => fetch('/base/role/getPermission', data, "GET");
export const savePermission = (data) => fetch('/base/role/savePermission', data, "POST", true, true);