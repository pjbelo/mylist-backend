const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('myList Project Backend, by Paulo Belo'))

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

