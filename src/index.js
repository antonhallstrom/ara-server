const dotenv = require('dotenv')
const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const DEFAULT_PORT = 5000
const db = require('./database/mongodb.js')
const blogPostsRoutes = require('./api/blog-posts/routes.js')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('express-jwt')
const rsaValidation = require('auth0-api-jwt-rsa-validation')
const R = require('ramda')
const validateRequestAccess = require('./util/validate-request-access')

const jwtCheck = jwt({
  secret: rsaValidation(),
  algorithms: ['RS256'],
  issuer: 'https://ara-auth.eu.auth0.com/',
  audience: 'http://localhost:5000',
})

dotenv.config()

db.connect()

const guard = (req, res, next) => {
  if (R.includes(req.path, '/api/v1/posts/')) {
    switch (req.method) {
      case 'GET': {
        const permissions = ['general', 'admin']

        return validateRequestAccess(permissions, req, res, next)
      }

      case 'POST': {
        const permissions = ['admin']

        return validateRequestAccess(permissions, req, res, next)
      }

      case 'DELETE': {
        const permissions = ['admin']

        return validateRequestAccess(permissions, req, res, next)
      }

      case 'PUT': {
        const permissions = ['admin']

        return validateRequestAccess(permissions, req, res, next)
      }

      default: {
        return next()
      }
    }
  } else {
    return next()
  }
}

app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())
app.use(expressValidator())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Scope'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).json({})
  }
  next()
})

app.use(jwtCheck)
app.use(guard)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Missing or invalid token' })
  }
  next()
})

app.use('/api/v1', blogPostsRoutes)

app.listen(process.env.PORT || DEFAULT_PORT, () =>
  console.log(`Listening on ${process.env.PORT || DEFAULT_PORT}`)
)
