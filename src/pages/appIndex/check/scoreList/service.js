import fetch from '@/config/Util/HttpUtil/Fetch'
import download from '@/config/Util/HttpUtil/Download'

//查询 下载
export const queryData = (data) => fetch('/base/performanceScore/searchScore', data, "POST");
export const queryAllData = (data) => fetch('/base/performanceScore/searchDiagram', data, "POST");
export const exportData = (data) => download('/download/performanceScore/search', data);