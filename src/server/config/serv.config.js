require('dotenv').config();

exports.config = {
    "db":process.env.DB_NAME,
    "user_db": process.env.DB_USER,
    "user_password": process.env.DB_PASS,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "service_mail": process.env.SERVICE_MAIL,
    "admin_mail":process.env.ADMIN_MAIL,
    "user_email_password": process.env.USER_EMAIL_PASS,
    "secret": process.env.SECRET,
    "refresh_secret": process.env.REFRESH_SECRET
};