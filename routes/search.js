const express = require('express');
const request = require('request');
const router = express.Router();
const Yelp = require('yelp');
const User = require('../models/User.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('../db/config')

// Require models
// var User = require('../models/user')

// mongoose.connect('mongodb://localhost/food');


const yelp = new Yelp({
  consumer_key: process.env.YELP_CLIENT_ID,
  consumer_secret: process.env.YELP_CLIENT_SECRET,
  token: process.env.YELP_CLIENT_TOKEN,
  token_secret: process.env.YELP_CLIENT_TOKEN_SECRET
});


router.post('/', function(req, res, next){
  console.log(req.body)
  console.log('this is the radius===', req.body.radius_filter, typeof req.body.radius_filter)
  yelp.search({
    location: req.body.location,
    term: req.body.term,
    // term: req.body.term,
    // location: req.body.location,
    price: req.body.price,
    // TODO implement input fields to allow radius
    radius_filter: Number.parseInt(req.body.radius_filter),
    // open_now: true,
    // deals_filter: true,
    limit: 5
    // CHANGE BACK LIMIT WHEN DONE TESTING ********************
    // limit: 20
  })
  .then((data)=>{
  // TODO add food back to default searches
  // yelp.search.term += ', food';
    req.session.businesses = data.businesses;

    console.log('yelp bizzzzzz', data);

    var fb_name = req.session.user.name;

    var fb_name = new User( {
      fb_id: req.session.user.id
    });

    let obj = undefined;

    res.send(data);

    for(var i=0; i<req.session.businesses.length;i++) {
      obj = {
        date: new Date(),
        name: req.session.businesses[i].name,
        rating: req.session.businesses[i].rating,
        mobile_url: req.session.businesses[i].mobile_url,
        rating_img_url: req.session.businesses[i].rating_img_url,
        url: req.session.businesses[i].url,
        snippet_text: req.session.businesses[i].snipper_text,
        yelp_id: req.session.businesses[i].id,
        location: req.session.businesses[i].location // ,
        // likes: 0
        // dislikes: 0
      }
      fb_name.liked_businesses.push(obj);
    };

    fb_name.save();
  })
  .catch(next)
})

router.get('/', function(req, res) {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.render('search', {user: user})
})





module.exports = router

