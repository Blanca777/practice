const express = require('express')
const app = express()
app.use(express.static(__dirname))
app.listen(3000,()=>{
    console.log('a start in 3000')
})
