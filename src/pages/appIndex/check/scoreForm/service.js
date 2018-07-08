import fetch from '@/config/Util/HttpUtil/Fetch'
import download from '@/config/Util/HttpUtil/Download'

//查询 删除
export const queryData = (data) => fetch('/base/performanceScore/form', data, "POST");
export const exportData = (data) => download('/download/performanceScore/alert', data);