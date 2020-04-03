let jwt = require("jsonwebtoken");
const log4js = require("log4js");
const nodemailer = require("nodemailer");

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

};