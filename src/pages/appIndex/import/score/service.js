import fetch from '@/config/Util/HttpUtil/Fetch'
import {baseUrl} from '@/config/env'

//查询 删除
export const queryData = (data) => fetch('/base/performanceScore/search', data, "POST");
export const deleting = (data) => fetch('/base/performanceScore/delete', data, "GET", true, true);

//导入
export const uploadUrl = baseUrl+'/upload/performanceScoreTable';