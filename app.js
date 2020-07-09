const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const host = process.env.HOST || "127.0.0.1";

app.get('/', (req, res) => res.send('myList Project Backend, by Paulo Belo'))

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

