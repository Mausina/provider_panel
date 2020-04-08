let jwt = require("jsonwebtoken");
const log4js = require("log4js");
const nodemailer = require("nodemailer");
const {config} = require('../config/serv.config');

log4js.configure({
    appenders: { cheese: { type: "file", filename: "error.log"}},
    categories: { default: { appenders: ["cheese",], level: "error"}},
},);

const log = log4js.getLogger("validation",);

module.exports = {
    generateAccessToken(user,token,expire,) {
        return jwt.sign(user, token, {expiresIn: expire});
    },
    async sendMail(res,service,user,pass,to,subject,html){

        let transporter = nodemailer.createTransport({
            service,
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user,
                pass,
            },
        },);
        let mailOptions = {
            from: user,
            to,
            subject,
            html,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                log.error("Error from send mail" + error);
                res.json({code:404,data:error});
            } else {
                // console.log(info);
                res.json({code:200,data:info});
            }
        },);
    },
    isEmptyObject(obj,) {
        for (let i in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    },
    token_controller(user) {

        let now = new Date();
        const accessToken = this.generateAccessToken({
            id: user.dataValues.id,
            role: user.dataValues.role
        }, config.secret, "60s");

        const refreshToken = this.generateAccessToken({
            id: user.dataValues.id,
            role: user.dataValues.role
        }, config.refresh_secret, "7d");

        return {
            'msg': 'Success',
            access: {token: accessToken, expiredIn: now.setTime(now.getTime() + 60 * 1000)},
            refresh: {token: refreshToken, expiredIn: now.setTime(now.getTime() + (7 * 24 * 60 * 60 * 1000))}

        };

    }

}

;