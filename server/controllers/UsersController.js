const {Op, fn, col} = require("sequelize");
const {Customer} = require("../models/db");
let {config: {service_mail,admin_mail,user_email_password}} = require("../config/serv.config");
let md5 = require("js-md5");
let jwt = require("jsonwebtoken");
const fun = require("../lib/function");

const log4js = require("log4js");
log4js.configure({
    appenders: { cheese: { type: "file", filename: "error.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } },
},);

const log = log4js.getLogger("customer");

// eslint-disable-next-line no-unused-vars
let result = null;
exports.customer_login = async (req, res) => {

};
exports.sendMessage = async (req, res) =>{

    result = await fun.sendMail(
        res,
        service_mail,
        req.body.email,
        user_email_password,
        admin_mail,
        req.body.subject,
        `<h1>Имя: ${req.body.name}</h1>
            <p>Сообщение: ${req.body.text}</p>
        `,
    );
    // res.json({answer: result});

};
exports.token = (req, res) => {

    const refreshToken = req.body.token;

    if (refreshToken == null) {
        log.error("refreshToken is null status code 401");
        return res.sendStatus(401);
    }

    jwt.verify(refreshToken, "refresh_secretkey", (err, user) => {
        if (err) return res.sendStatus(403);
        let { result } = user;
        const accessToken = fun.generateAccessToken(result,"secretkey", "1800s");

        res.json({accessToken: accessToken});
    },);

};