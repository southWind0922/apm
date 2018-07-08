import fetch from '@/config/Util/HttpUtil/Fetch'
import download from '@/config/Util/HttpUtil/Download'

//查询  下载
export const queryData = (data) => fetch('/base/specialCase/search', data, "POST");
export const exportData = (data) => download('/download/specialCase/search', data);
