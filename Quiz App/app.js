const express = require('express');
const path = require('path')
const gameRoutes = require('./routes/game')

const app = express();

const port = 3000

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})

app.use(express.static(
  path.join(__dirname, 'public')
))

gameRoutes(app)
