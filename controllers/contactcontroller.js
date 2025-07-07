const Contact = require("../model/contact");
const sendEmail = require('../utils/sendEmail'); 
// POST /api/contact
// exports.createContact = async (req, res) => {
//   try {
//     const contact = new Contact(req.body);
//     const saved = await contact.save();
//     res.status(201).json({ success: true, data: saved });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };



exports.createContact = async (req, res) => {
  try {
    // 1️⃣ Save the contact to DB
    const contact = new Contact(req.body);
    const saved = await contact.save();

    // 2️⃣ Send email
    const emailResult = await sendEmail({
      name: saved.name,
      email: saved.email,
      companyName: saved.companyName,
      subject: saved.subject,
      phone: saved.phone,
      message: saved.message
    });

    // 3️⃣ Respond with result
    res.status(201).json({
      success: true,
      data: saved,
      emailStatus: emailResult
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// GET /api/contact
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
