const Career = require('../model/carrer');
const sendEmail = require('../utils/sendEmail'); // 👈 Make sure this file exists

exports.createCareer = async (req, res) => {
  try {
    const cvPath = req.file ? req.file.filename : null;
    const data = { ...req.body, cv: cvPath };
    const saved = await Career.create(data);

    // Send email after saving
    await sendEmail({
      to: "chetankharat0628@gmail.com", // 🔁 Replace with HR/admin email
      subject: "New Career Application Received",
      text: `
 CV: ${cvPath ? `http://localhost:5000/uploads/${cvPath}` : 'Not uploaded'}
      `
    });

    res.status(201).json({ success: true, data: saved, message: 'Application submitted & email sent' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: careers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
