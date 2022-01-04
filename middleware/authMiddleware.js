const authMiddleware = (req, res, next) => {

  if (req.isAuthenticated()) return next()
  
  res.redirect('/signIn')
}

module.exports = authMiddleware