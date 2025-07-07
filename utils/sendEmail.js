const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, companyName, subject, phone, message }) => {
  try {
    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'jobshsa3@gmail.com', 
        pass: 'avasypgwafzshnma', 
      },
    });
    const formattedPhone = phone
      ? phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
      : phone;

    const mailOptions = {
      from: "jobshsa3@gmail.com",
      to: "jobshsa3@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <p><strong>New Contact Form Submission</strong></p>
        <p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company Name:</strong> ${companyName}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Phone:</strong> ${formattedPhone}</p>
<p><strong>Message:</strong> ${message}</p>

      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully!"
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error.message || "Failed to send email"
    };
  }
};

module.exports = sendEmail;
