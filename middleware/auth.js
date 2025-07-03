
// /**
//  * Protect middleware
//  * Verifies access token from either cookie or Authorization header
//  */

const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token;

  console.log("req===>>> ",req.headers.authorization)
  
 if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }

  try {
    // 4. ✅ Verify token
    const decoded = jwt.verify(token, '5fc42b7c3d1cfa9704efeee8180ee7e005dea156849fef88a97f5fd91428ccd96e98045d09f5c359b7f5248d9001b3c34b8e5bec4b48d440afe236711e2905c');

    // 5. ✅ Attach decoded user info to request
    req.user = decoded; // Will contain at least `id`

    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Access token expired or invalid' });
  }
};


// const jwt = require('jsonwebtoken');

// exports.protect = (req, res, next) => {
//   const token = req.cookies?.accessToken;

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ success: false, message: 'Access token expired or invalid' });
//   }
// };

