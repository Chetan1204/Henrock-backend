// // index.js

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 5000;
// const cors = require("cors");
// const connectDB = require('./config/dbconn');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
// const contactRoutes = require("./routes/contactroutes");
// const careerRoutes = require('./routes/careerroutes');
// const authRoutes = require('./routes/authroutes');
// // In your db.js file or similar
// const db = mongoose.connection;

// // Middleware
// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//     credentials: true,               
//   })
// );
// app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));

// app.get("/uploads/:filename", (req, res) => {
//   const file = path.join(__dirname, "uploads", req.params.filename);
//   res.download(file, req.params.filename); // <-- forces correct name
// });

// connectDB();

// // routes

// app.use("/api/contact", contactRoutes);
// app.use('/api/career', careerRoutes);
// app.use('/api/auth', authRoutes);
// // Sample route
// app.get('/', (req, res) => {
//   res.send('Hello from Express server!');
// });


// db.once('open', () => {
//   console.log('Mongoose connected successfully!');
//   app.listen(PORT, () => {
//    console.log(`Server is running on http://localhost:${PORT}`);
//  });
// });



// // Start the server


const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require('./config/dbconn');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

const contactRoutes = require("./routes/contactroutes");
const careerRoutes = require('./routes/careerroutes');
const authRoutes = require('./routes/authroutes');

// ✅ Connect MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ Allow frontend to receive cookies
app.use(
  cors({
    origin: "http://localhost:3000", // match React app
    credentials: true,
  })
);

// ✅ Parse cookies
app.use(cookieParser());

// ✅ Serve uploaded files
app.use('/uploads', express.static('uploads'));
app.get("/uploads/:filename", (req, res) => {
  const file = path.join(__dirname, "uploads", req.params.filename);
  res.download(file, req.params.filename);
});

// ✅ API routes
app.use("/api/contact", contactRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/auth', authRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

// ✅ Start server after MongoDB connects
const db = mongoose.connection;
db.once('open', () => {
  console.log('Mongoose connected successfully!');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

