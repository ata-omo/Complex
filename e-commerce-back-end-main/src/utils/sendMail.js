const nodeMailer = require('nodemailer');


const sendMail = async(details) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.PASS_RECOVERY_MAIL,
            pass: process.env.PASS_RECOVERY_MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.PASS_RECOVERY_MAIL,
        to: details.to,
        subject: details.subject,
        text: details.message,
    }

    await transporter.sendMail(mailOptions)
};

module.exports = sendMail;