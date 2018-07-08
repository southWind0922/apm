import fetch from '@/config/Util/HttpUtil/Fetch'
import download from '@/config/Util/HttpUtil/Download'

//查询 下载
export const getHeader = (data) => fetch('/base/performanceScore/alertHeader', data,"POST");
export const queryData = (data) => fetch('/base/performanceScore/alert',data,"POST");
export const exportData = (data) => download('/download/performanceScore/alert', data);

//发送邮件
export const sendEmail = (data) => fetch('/base/performanceScore/sendEmail',data,"POST");

//历史图表
export const queryChart = (data) => fetch('/base/performanceScore/history',data,"POST");

