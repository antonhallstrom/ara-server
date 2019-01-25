const dotenv = require('dotenv')
const express = require('express')
const app = express()
const DEFAULT_PORT = 5000
const db = require('./database/mongodb.js')
const blogPostsRoutes = require('./api/blog-posts/routes.js')
const bodyParser = require('body-parser')
const morgan = require('morgan')

dotenv.config()

db.connect()

app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
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

app.use('/api/v1/posts', blogPostsRoutes)

app.listen(process.env.PORT || DEFAULT_PORT, () =>
  console.log(`Listening on ${process.env.PORT || DEFAULT_PORT}`)
)
