const Career = require('../model/carrer');
const sendEmail = require('../utils/careerEmail');

exports.createCareer = async (req, res) => {
  try {
    // 1️⃣ Get uploaded CV filename
    const cvFile = req.file ? req.file.filename : null;

    // 2️⃣ Save to DB
    const data = { ...req.body, cv: cvFile };
    const saved = await Career.create(data);

    // 3️⃣ Generate full URL for CV
    const fullCvPath = cvFile
      ? `${process.env.FILEPATH}${cvFile}`
      : null;

      console.log("Full CV Path:", fullCvPath);

    // 4️⃣ Send email
    const emailResult = await sendEmail({
      fullName: saved.fullName,
      email: saved.email,
      phone: saved.phone,
      education: saved.education,
      experience: saved.experience,
      jobRole: saved.jobRole,
      message: saved.message,
      cvPath: fullCvPath // ✅ Correct key passed here
    });

    // 5️⃣ Response
    res.status(201).json({
      success: true,
      data: saved,
      emailStatus: emailResult
    });
  } catch (err) {
    console.error(err);
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
