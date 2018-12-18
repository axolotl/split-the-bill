const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

function verifySession(req, res, next) {
  const token = req.get('Authorization')

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json(err)

      req.decoded = decoded

      next()
    })
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    })
  }
}

module.exports = verifySession
