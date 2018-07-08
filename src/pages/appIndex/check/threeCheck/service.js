import fetch from '@/config/Util/HttpUtil/Fetch'
import download from '@/config/Util/HttpUtil/Download'

//查询  下载
export const queryData = (data) => fetch('/base/thirdpartStats/search', data, "POST");
export const exportData = (data) => download('/download/thirdPartStats/search', data);
