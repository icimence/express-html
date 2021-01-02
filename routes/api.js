const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const argon2 = require("argon2");
const svgCaptcha = require('svg-captcha'); // 引入svg-captcha模块
const session = require("express-session");
const connsql = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'Daijunhaojifang',
    database: 'web'

});
connsql.connect()

router.use(session({
    secret: "daijunhao",
    resave: false,
    saveUninitialized: true,
    cookie: ('name', 'value', {maxAge: 2 * 60 * 1000, secure: false})
}));
/* GET users listing. */
router.get('/captcha', function (req, res, next) {
    // 使用svg-captcha
    const cap = svgCaptcha.create({
        size: 5,
        noise: 4,
        color: true,
        ignoreChars: '0oO1ilLI',
        background: '#ccc',
    }); // 此时创建的图形验证码默认为四个字符和一根干扰线条，背景色默认无
    req.session.captcha = cap.text.toLowerCase();
    console.log(req.session);
    res.cookie('captcha', req.session);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.write(String(cap.data))
    res.end();
});

router.use('/login', async (req, res) => {
    const login = {
        "user": req.body.user,
        "pwd": req.body.pwd,
        "cap": req.body.cap
    };
    if (login.cap.toLowerCase() !== req.session.captcha) {
        console.log("验证码错误");
        console.log(login.cap);
        console.log(req.session.captcha);
        res.json({code: -1, msg: '验证码错误!'});
        return
    }
    const loginsql = "select username,password from userinfo where username='" + login.user + "'";
    console.log(login.pwd)
    connsql.query(loginsql, async (err, result) => {
        if (err) {
            console.log('err message:', err)
            return
        }
        if (result.length === 0){
            res.json({code: -1, msg: '用户名不存在'})
            return
        }
        const flag = await argon2.verify(result[0].password,login.pwd)
        if (!flag) {
            console.log('用户名或密码错误！')
            res.json({code: -1, msg: '用户名或密码错误！'})

        } else {
            console.log('用户名密码匹配成功！')
            req.session.status = true;
            req.session.username = login.user;
            console.log(req.session)
            res.json({code: 1, msg: '登录成功'})

        }
    })
})

router.use('/register', async (req, res) => {
    let register = {
        "user": req.body.user,
        "pwd": req.body.pwd,
        "cap": req.body.cap
    }
    console.log("信息导入成功");
    if (register.cap.toLowerCase() !== req.session.captcha) {
        console.log("验证码错误");
        console.log(register.cap);
        console.log(req.session.captcha);
        res.json({code: -1, msg: '验证码错误!'});
        return
    }
    const hashPwd = await argon2.hash(register.pwd);
    const regssql = "insert into userinfo(username,password) values('" + register.user + "','" + hashPwd + "')";
    const selsql = "select username from userinfo where username='"+register.user+"'";
    console.log("查询完成")
    function registerFunc() {
        connsql.query(regssql, (err, result) => {
            if (err) {
                console.log(err);
                return
            }
            res.json({code: 1, msg: "注册成功"})
            console.log('注册成功')
        })
    }
    connsql.query(selsql, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(result)
        if (result.length===0) {
            registerFunc()
        } else {
            res.json({code: -1, msg: "注册失败，用户名已存在"})
            console.log(register.user + '用户名已存在')
        }

    })
})

router.get("/status",(req, res) => {
    console.log(req.session)
    if (req.session.status === true){
        console.log("用户已登录")
        res.json({status: 1, user: req.session.username })
    }
    else
        res.json({status: 0, user: "nobody" })
})

router.get("/logout",(req, res) => {
    req.session.destroy();
    res.json({code:1,msg:"退出成功"})
})
module.exports = router;