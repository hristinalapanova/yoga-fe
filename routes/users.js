var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var passport = require('passport')
var multer  =   require('multer');
var capitalize = require('../lib/capitalize');
var db = require('../lib/db_user');
var helper_data = require('../serverlogic/serverlogic');
var states = helper_data.states;
var styles = helper_data.yogaStyles;

function Sequences(){
  return knex('user_sequences');
}

function Users(){
  return knex('users');
}

router.get('/:user_id', function(req, res, next){
  res.redirect('/users/' + req.params.user_id + '/profile');
});

router.get('/:user_id/profile', function(req, res, next) {
  Users().where('id', req.params.user_id).first().then(function(user){
    Sequences().where('user_id', req.params.user_id).then(function(sequences){
      console.log(sequences);
      res.render('user/index', {
        user: user,
        sequences: sequences,
        capitalize: capitalize
      })
    })
  });
});

router.get('/:user_id/profile/edit', function(req, res, next){
  db.getUser(req.params.user_id, function(result){
    res.render('user/edit',{
      user: result,
      states: states,
      styles: styles,
      capitalize: capitalize
    });
  });
});


module.exports = router;
