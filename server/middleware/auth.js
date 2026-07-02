// Simple password-based admin validation middleware
module.exports = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const requestPassword = req.headers['x-admin-password'] || req.query.adminPassword;

  if (!requestPassword || requestPassword !== adminPassword) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Invalid or missing admin credentials.' 
    });
  }
  next();
};
