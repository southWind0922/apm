import fetch from '@/config/Util/HttpUtil/Fetch'

//查询 删除
export const queryData = (data) => fetch('/auth/search', data, "POST");
export const unique = (data) => fetch('/auth/unique', data, "POST");
export const deleting = (data) => fetch('/auth/delete', data, "GET", true, true);

export const getRoleList = () => fetch('/base/role/getAll');
export const create = (data) => fetch('/auth/register', data, "POST", true, true);
export const edit = (data) => fetch('/auth/update', data, "POST", true, true);