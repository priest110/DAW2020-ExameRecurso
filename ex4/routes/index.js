var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET listas */
router.get('/', function(req, res) {
  axios.get('http://localhost:8001/api/teams?token=' + req.cookies.token)
  	.then(dados => {
  		//console.log(dados)
  		res.render('index', {title: "DAW-PRI-2020 Recurso",teams: dados.data})
  	})
    .catch(e => res.render('error', {error: e}));
});

/* GET lista */
router.get('/teams/:id', function(req, res) {
  axios.get('http://localhost:8001/api/teams/'+ req.params.id + '?token=' + req.cookies.token)
  	.then(dados => res.render('team', {title: "DAW-PRI-2020 Recurso",team: dados.data}))
    .catch(e => res.render('error', {error: e}));
});

/* POST lista */
router.post('/teams', function(req, res) {
  axios.post('http://localhost:8001/api/teams?token=' + req.cookies.token, req.body)
  	.then(dados => res.render('index', {title: "DAW-PRI-2020 Recurso", teams: dados.data}))
    .catch(e => res.render('error', {error: e}));
});

/* POST member */
router.post('/teams/:id/members', function(req, res) {
  axios.post('http://localhost:8001/api/teams/'+req.params.id + '/members?token=' + req.cookies.token, req.body)
  	.then(dados => res.render('team', {title: "DAW-PRI-2020 Recurso", teams: dados.data}))
    .catch(e => res.render('error', {error: e}));
});

/* DELETE lista */
router.delete('/teams/:id', function(req, res) {
  axios.delete('http://localhost:8001/api/teams/' + req.params.id + '?token=' + req.cookies.token)
  	.then(dados => res.render('index', {title: "DAW-PRI-2020 Recurso", teams: dados.data}))
    .catch(e => res.render('error', {error: e}));
});

/* DELETE member */
router.delete('/teams/:id/members/:idMember', function(req, res) {
  axios.delete('http://localhost:8001/api/teams/' + req.params.id + '/members' + req.params.idMember)
  	.then(dados => res.render('team', {title: "DAW-PRI-2020 Recurso", teams: dados.data}))
    .catch(e => res.render('error', {error: e}));
});

module.exports = router;
