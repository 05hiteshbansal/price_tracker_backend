const mongoose = require('mongoose');
 require('dotenv').config()
 const User=require('./schema')
 const sendmail = require('sendmail')();
const nightmare = require('nightmare')()
const express = require("express");
const router = express.Router();
router.post('/',(req,res)=>{
  console.log(req.body)
 var url=req.body.data.url
 var price=req.body.data.price
 var Email=req.body.data.email
 var minPrice = price

//var u=false; 
 //checkPrice()
 
//  async function checkPrice() {
//    try {
//      const priceString = await nightmare.goto(url)
//                                         .wait("corePriceDisplay_desktop_feature_div")
//                                         .evaluate(() => document.getElement("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole").innerText)
//                                         .end()
//      if (priceNumber < minPrice) {
//        u=true;
//      }
//    } catch (e) {
//      console.log(e.message)
//      throw e;
//    }
//  }
//  if(u){
//  sendmail({
//   from: "b.hiteshbansal@gmail,com",
//   to: Email,
//   subject: 'Price Is Low',
//   html: `The price on ${url} has dropped below ${minPrice}`
// }, function(err, reply) {
//   console.log(err && err.stack);
//   console.dir(reply);
mongoose.connect('mongodb+srv://hitesh:process.env.KEY@cluster0.rtpkvtx.mongodb.net/Tracker?retryWrites=true&w=majority');
const user = new User({ email: Email,
                          price: minPrice,
                          url:url
                       });
                       console.log(user)
user.save().then(() => console.log('saved'));
console.log(url,Email,minPrice);
res.send("connected");
})
mongoose.connection.close()
module.exports = router;