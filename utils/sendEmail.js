const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 465, 
      secure: true,             
      auth: {
        user: 'chetankharat0628@gmail.com', // your Gmail
        pass: 'ggvdwskcxexirvol', // 16-digit app password
      },
    });

    const mailOptions = {
    from: "chetankharat@immersiveinfotech.com",
      to: `chetankharat@immersiveinfotech.com`,
      subject: "New Career Application Received",
      text: `You have received a new career application.`,
    };

    const ttt=  await transporter.sendMail(mailOptions);
    console.log("Email sent: " , ttt);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
