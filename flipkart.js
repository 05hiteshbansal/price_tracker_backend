const express=require('express')
const router=express.Router()
const axios =require ("axios")



router.get('/:val',
async (query,res)=>{
  const value=query.params.val
  const options = {
    method: "GET",
      url: `https://flipkart.dvishal485.workers.dev/search/${value}`,
    };
    try {
      const result = await axios.request(options);
      //console.log(res.data);
      res.send(result.data)
    } catch (e) {
      if (e instanceof Error) {
        res.send(e.message);
        return;
      }
      console.log(e);
    }
})

module.exports = router