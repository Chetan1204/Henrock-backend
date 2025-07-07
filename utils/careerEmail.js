const nodemailer = require("nodemailer");

const careerEmail = async ({
  fullName,
  email,
  phone,
  education,
  experience,
  jobRole,
  message,
  cvPath // ✅ Correct key name
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'jobshsa3@gmail.com',
        pass: 'avasypgwafzshnma', // ✅ Use your Gmail App Password
      },
    });

    const formattedPhone = phone
      ? phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
      : phone;

    const mailOptions = {
      from: "jobshsa3@gmail.com",
      to: "jobshsa3@gmail.com",
      subject: "New Career Application Received",
      html: `
        <p><strong>New Career Application Received</strong></p>
        <p><strong>Full Name:</strong> ${fullName || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${formattedPhone || 'N/A'}</p>
        <p><strong>Education:</strong> ${education || 'N/A'}</p>
        <p><strong>Experience:</strong> ${experience || 'N/A'}</p>
        <p><strong>Job Role:</strong> ${jobRole || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
        <p><strong>CV:</strong>
          ${
            cvPath
              ? `<a href="${cvPath}" target="_blank">Download CV</a>`
              : 'Not uploaded'
          }
        </p>
      `
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

module.exports = careerEmail;
