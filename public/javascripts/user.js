function checkStatus(){
    $.ajax({
        type: 'get',
        url:'/api/status',
        success:function (data){
            if (data.status === 1){
                document.querySelector("#username").textContent = data.user;
                document.querySelector("#logout").style.display = "block";
            }
            else{
                document.querySelector("#username").textContent = "登录";
                document.querySelector("#logout").style.display = "none";
            }
        },
        error:function (error){
            console.log(error)
        }
    })
}
function logOut(){
    $.ajax({
        type:'get',
        url:'/api/logout',
        success:function (data){
            if (data.status === 1){
                document.querySelector("#username").textContent = "登录";
                document.querySelector("#logout").style.display = "none";
            }

        },
        error:function(error){
            console.log(error)
        }
    })
}