function verifyAdmin(req, res, next) {
  if (req.get('x-role') !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });}
  next()}
module.exports = verifyAdmin;
