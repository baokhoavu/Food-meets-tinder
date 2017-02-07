const Yelp = require('yelp');
const express = require('express');
const request = require('request');
const router = express.Router();

var yelp = new Yelp({
  consumer_key: process.env.YELP_CLIENT_ID,
  consumer_secret: process.env.YELP_CLIENT_SECRET,
  token: process.env.YELP_CLIENT_TOKEN,
  token_secret: process.env.YELP_CLIENT_TOKEN_SECRET
})

// router.get('/', function(req, res){
//   res.send('hello')
// })

router.post('/', function(req, res){
  yelp.search({
    term: "food",
    location: req.body.location
  })
  .then((data)=>{
    console.log(data.businesses)
  res.send(data)
  })
})

module.exports = router
