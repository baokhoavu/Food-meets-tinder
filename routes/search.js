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
  console.log(req.body)
  yelp.search({
    term: "food",
    location: req.body.location
  })
  .then((data)=>{
    req.session.businesses = data.businesses
    console.log('req session businesses ====', req.session.businesses);
    //data
        //businesses [] use forEach or similar to loop all results
    console.log('yelp bizzzzzz', data.businesses[0].name)
  res.send(data)
  })
})

router.get('/results', function(req, res) {
  res.render('results')
})

module.exports = router
