const jwt = require("jsonwebtoken");

exports.verifyAdminToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    console.log('❌ No token found in cookies');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden' });
  }
}