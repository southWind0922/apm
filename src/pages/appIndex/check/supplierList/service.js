import fetch from '@/config/Util/HttpUtil/Fetch'
import download from '@/config/Util/HttpUtil/Download'

//查询 下载
export const queryData = (data) => fetch('/base/supplier/search', data, "POST");
export const exportData = (data) => download('/download/supplier/search', data);

//详情
export const queryBiddingData = (data) => fetch('/base/biddingContract/find', data, "POST");
export const querySpecialData = (data) => fetch('/base/specialCase/find', data, "POST");
export const update = (data) => fetch('/base/supplier/update', data, "POST", true);