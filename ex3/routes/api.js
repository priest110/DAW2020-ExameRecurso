var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var Team = require('../controllers/equipa')

router.get('/token', function(req,res){
  var sub = "Exame"
  var data = "dataDoSistema"
  jwt.sign(
  		{sub,data}, 
  		"DAW-PRI-2020-recurso",
  		{expiresIn: 3600}, // expires in 1h
  		function(e,token){
        	if(e) res.status(500).jsonp({error: "Erro na geração do token " + e})
        	else res.status(201).jsonp({token: token})
      	});
}) 

/* Devolve a lista de equipes, com os campos: _id, team, pitch1, pitch2, techPitch, businessReport, techReport, e nmembers (número de membros da equipe)*/
router.get('/teams', function(req, res) {
  Team.lista_teams()
  	.then(dados => res.status(200).jsonp(dados))
  	.catch(erro => res.status(500).send(erro))
});

/* Devolve toda a informação de uma equipe (JSON) */
router.get('/teams/:id', function(req, res) {
  Team.consulta_team(req.params.id)
  	.then(dados => res.status(200).jsonp(dados))
  	.catch(erro => res.status(500).send(erro))
});

/* ??? Devolve a informação de um membro da equipe (JSON) */
router.get('/teams/:id/members/:idMember', function(req, res) {
  Team.consulta_member(req.params.id, req.params.idMember)
  	.then(dados => res.status(200).jsonp(dados))
  	.catch(erro => res.status(500).send(erro))
});

/* Insere uma equipe na base de dados (JSON no body) */
router.post('/teams', function(req, res) {
	Team.insere_team(req.body)
		.then(dados => res.status(201).jsonp(dados))
  		.catch(erro => res.status(500).send(erro))
})

/*  Insere um novo membro numa determinada equipe(JSON no body) */
router.post('/teams/:id/members', function(req, res)  {
	Team.insere_member(req.params.id,req.body)
		.then(dados => res.status(201).jsonp(dados))
  		.catch(erro => res.status(500).send(erro))
})

/*  Apaga uma equipe, devolve um booleano como resultado; */
router.delete('/teams/:id', function(req, res)  {
	Team.remove_team(req.params.id)
		.then(dados => {
			console.log(dados)
			if(data.n == 0)
				res.status(201).jsonp({message: false})
			else 
				res.status(201).jsonp({message: true})
		})
  		.catch(erro => res.status(500).send(erro))
})

/* Apaga um membro duma equipe, devolve um booleano como resultado */
router.delete('/teams/:id/members/:idMember', function(req, res)  {
	Team.remove_member(req.params.id, req.params.idMember)
		.then(dados => {
			console.log(dados)
			if(data.nModified == 0)
				res.status(201).jsonp({message: false})
			else 
				res.status(201).jsonp({message: true})
		})
  		.catch(erro => res.status(500).send(erro))
})

module.exports = router;
