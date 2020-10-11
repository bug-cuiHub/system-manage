import axios from 'axios'

//解决后台无法获取session的问题
axios.defaults.withCredentials=true;

var instance = axios.create({
    baseURL: 'http://localhost:8088/',
    timeout: 1000,
})
export default instance;