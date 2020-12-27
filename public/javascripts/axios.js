
function axiosPostRequst(url,data) {
    let result = axios({
        method: 'post',
        url: url,
        data: data,
        transformRequest:[function(data){
            let ret = '';
            for(let i in data){
                ret += encodeURIComponent(i)+'='+encodeURIComponent(data[i])+"&";
            }
            return ret;
        }],
        header:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(resp=> {
        return resp.data;
    }).catch(error=>{
        return "exception="+error;
    });
    return result;
}

//get请求
function axiosGetRequest(url) {
    return axios({
        method: 'get',
        url: url
    }).then(function (resp) {
        return resp.data;
    }).catch(function (error) {
        return "exception=" + error;
    });
}