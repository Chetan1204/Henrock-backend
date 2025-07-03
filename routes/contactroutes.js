const express = require("express");
const router = express.Router();
const { createContact, getContacts } = require("../controllers/contactcontroller");

router.post("/", createContact);
router.get("/", getContacts);

module.exports = router;
