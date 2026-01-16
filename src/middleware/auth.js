function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "You must be signed in to add captions" });
  }
}

module.exports = { requireAuth };
