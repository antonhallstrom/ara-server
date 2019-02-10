const dotenv = require('dotenv')
const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const DEFAULT_PORT = 5000
const db = require('./database/mongodb.js')
const blogPostsRoutes = require('./api/blog-posts/routes.js')
const usersRoutes = require('./api/users/routes.js')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const R = require('ramda')

dotenv.config()

db.connect()

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
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).json({})
  }
  next()
})

const jwtCheck = (req, res, next) => {
  const header = req.headers['authorization']
  const bearer = header.split(' ')
  const token = bearer[1]

  if (req.path === '/api/v1/authenticate') {
    return next()
  }

  return jwt.verify(token, process.env.ARA_API_SECRET, (err, decoded) => {
    if (R.pathEq(['name'], 'JsonWebTokenError', err)) {
      res.status(401).json({ message: 'Missing or invalid token' })
    } else if (R.pathEq(['name'], 'TokenExpiredError', err)) {
      return res.status(401).json({ message: 'Session expired' })
    } else {
      return next()
    }
  })
}

app.use(jwtCheck)

app.use('/api/v1', usersRoutes)
app.use('/api/v1', blogPostsRoutes)

app.listen(process.env.PORT || DEFAULT_PORT, () =>
  console.log(`Listening on ${process.env.PORT || DEFAULT_PORT}`)
)
