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

?? subMenu展开列表问题

axios interpreter拦截器