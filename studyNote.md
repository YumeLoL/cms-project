# Login process
* encrypt password & toString()
    password = AES.encrypt(password, "cms").toString();
* 请求成功后，会返回一个token. (每次发出数据请求时，请求头需要带有token才能访问)
    --> 本地保存用户登录信息 
        localStorage.setItem("cms", JSON.stringify(data)); 需要转换
    --> 登录成功 页面跳转 
        router.push

# Logout process
* JSON.parse token 
* logout request (headers带有token)
* 请求成功后，remove token & router.push登录页面

# Axios
* axios instance - create an instance of axios with a custom config
* add a request interceptor


***questions need to be figued out***
export interface AddEditStudents {
    id?: number;
    name: string;
    country: string;
    email: string;
    type?: number;
    refresh?: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>; // 
} // source comes addEditStudents.jsx
在interface里怎么定义函数类型？

?? subMenu展开列表问题

axios interpreter拦截器


***learning material ***
TypeScript: 
https://www.youtube.com/watch?v=ixCxoFAoOps&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=4