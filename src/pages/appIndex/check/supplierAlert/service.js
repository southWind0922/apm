import fetch from '@/config/Util/HttpUtil/Fetch'
import download from '@/config/Util/HttpUtil/Download'

//查询
export const queryData = (data) => fetch('/base/supplier/alert', data, "POST");
export const exportData = (data) => download('/download/supplier/alert', data);