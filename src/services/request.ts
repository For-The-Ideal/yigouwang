import axios, { AxiosError, AxiosResponse,AxiosRequestConfig } from "axios";
import qs from 'qs'
import loginParams from "../store/index"

let responseCodeList:Array<Number> = [ //http 状态码
  200,
  400,
  401,
  429,
  500
]

const baseUrl:ImportMetaEnv = import.meta.env;

axios.interceptors.request.use(
  (config:AxiosRequestConfig) => {
   const token = ""
    if (token) {
      (config as any).headers.Authorization = "x"
    }
    return config
  },
  (error:AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  (res:AxiosResponse) => {
    if (!res || !res.data) {
        throw new Error("服务器连接错误！");
    }
    if (res.status === 200 && responseCodeList.includes(res.data.code)) {

    }
    return Promise.resolve(res.data)
  },
  (error:AxiosError)=>{
    return Promise.reject(error)
  }
)

interface ResType<T> {
  code: number
  data?: T
  msg: string
}

interface Http {
  get<T>(url: string): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  put<T>(url: string, params?: unknown): Promise<ResType<T>>
  deletes<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
}

export const http: Http = {
  get(url) {
    return new Promise((resolve, reject) => {
      let path: string = baseUrl + '/api' + url;
      axios.get(path,{
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      }).then((res:AxiosResponse) => {
          resolve(res.data)
        }).catch((err:AxiosResponse) => {
          reject(err.data)
        })
    })
  },

  post(url, params) {
    return new Promise((resolve, reject) => {
      let path: string = baseUrl + '/api' + url;
      axios.post(path, 
        {headers: {'Content-Type': 'application/json;charset=UTF-8'},
        data:qs.stringify(params)
      }).then((res:AxiosResponse) => {
          resolve(res.data)
        }).catch((err:AxiosResponse) => {
          reject(err.data)
        })
    })
  },

  put(url, params) {
    return new Promise((resolve, reject) => {
      let path: string = baseUrl + '/api' + url;
      axios.put(path, 
        {headers: {'Content-Type': 'application/json;charset=UTF-8'},
        data:qs.stringify(params)
      }).then((res:AxiosResponse) => {
          resolve(res.data)
        }).catch((err:AxiosResponse) => {
          reject(err.data)
        })
    })
  },

  deletes(url, params) {
    return new Promise((resolve, reject) => {
      let path: string = baseUrl + '/api' + url;
      axios.delete(path,
        {headers: {'Content-Type': 'application/json;charset=UTF-8'},
        data:qs.stringify(params)
      }).then((res:AxiosResponse) => {
          resolve(res.data)
        }).catch((err:AxiosResponse) => {
          reject(err.data)
        })
    })
  },

  upload(url, params) {
    return new Promise((resolve, reject) => {
      let path: string = baseUrl + '/api' + url;
      axios.post(path,{
          headers: {'Content-Type': 'multipart/form-data'},
          data:qs.stringify(params)
        }).then((res:AxiosResponse) => {
          resolve(res.data)
        }).catch((err:AxiosResponse) => {
          reject(err.data)
        })
    })
  },
}
