const express=require("express")
const app=express()
var cors=require('cors')
const port= process.env.PORT||5000;
app.use(cors())
app.use('/api/amazon',require('./amazon'))
app.use('/api/flipkart',require("./flipkart"))

app.listen(port,()=>{
    console.log('coneected on port',port)
})