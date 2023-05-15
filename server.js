const express=require("express")
const app=express()
var cors=require('cors')
const port= process.env.PORT||5000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/amazon',require('./amazon'))
app.use('/api/flipkart',require("./flipkart"))
app.use('/track',require("./tracker"))
app.get('/',(req,res)=>{
    res.send("This is backend of my price tracker")
})

app.listen(port,()=>{
    console.log('coneected on port',port)
})