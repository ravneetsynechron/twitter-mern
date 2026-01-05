const nodemailer = require("nodemailer");
require("dotenv").config(); // Load MAIL_USER and MAIL_PASS from .env

// Create nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// Send an email using Gmail
const sendEmail = async(to, subject, text) => {
    const mailOptions = {
        from: `"Chatter" <${process.env.MAIL_USER}>`,
        to,
        subject,
        text,
    };

    console.log(`Preparing to send email to: ${to}`);
    console.log(`Email subject: ${subject}`);
    console.log(`Email text: ${text}`);

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to: ${to}`);
    } catch (err) {
        console.error("Error occurred while sending email:", err.message);
        console.error("Full error object:", err);
        throw err; // Rethrow after logging
    }
};

module.exports = { sendEmail };