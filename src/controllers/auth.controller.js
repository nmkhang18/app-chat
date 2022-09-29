const { loginValitdation, registValitdation } = require('../validations/validate')

module.exports.authencation = (req, res) => {
    res.render('auth/login')
}

const register = (req, res) => {
    delete req.body.type
    const { error } = registValitdation(req.body)

}

const login = (req, res) => {

    delete req.body.type
    const { error } = loginValitdation(req.body)
    console.log(error.details[0].message)
    if (error) return res.render('auth/login', {
        error: error.details[0].message,
        values: req.body
    })

}

module.exports.postAuthencation = (req, res) => {
    console.log(typeof (req.body));
    if (req.body.type === 'regist') register(req, res)
    if (req.body.type === 'login') login(req, res)

}

module.exports.mailer = (req) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'Shop name',
        to: req.body.email,
        subject: 'Sign Up Successfully',
        text: 'Welcome to our shop!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}