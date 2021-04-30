import  axios from "axios";
import { message } from "ant-design-vue";

const BaseApi = axios.create({
    baseURL : "http://localhost:5000",
    timeout : 10000
})
BaseApi.interceptors.response.use(function({data}) {
    // 对响应数据做点什么
    if(data.errorCode) {
        message.error(data.errMsg);
        return Promise.reject({
            code: data.errorCode,
            message: data.errMsg
        });
    }
    return data.result;
}, function (error) {
    // 对响应错误做点什么
    let errorMsg = error.message || error;
    message.error(errorMsg);
    return Promise.reject(error);
});
export default BaseApi;