var Team = require('../models/equipa')

module.exports.lista_teams = () => {
	return Team
		.aggregate([
			{"$unwind":"$members"},
			{"$group":{
				_id:"$_id",
				"team":{"$first": "$team"},
				"pitch1":{"$first": "$pitch1"},
				"pitch2":{"$first": "$pitch2"},
				"techPitch":{"$first": "$techPitch"},
				"businessReport":{"$first": "$businessReport"},
				"techReport":{"$first": "$techReport"},
				"nmembers":{"$sum":1}
			}}
		])
}

module.exports.consulta_team = id => {
	return Team
		.findOne({_id: id})
		.exec()
}

module.exports.consulta_member = (idTeam, idMember) => {
	return Team
		.aggregate([
			{"$unwind":"$members"},
			{"$match":{"_id":idTeam,"members.id":idMember}},
			{"$group":{
				_id:0,
				"produtos":{"$addToSet":"$produtos.designacao"}
			}},
			{"$project": {
                _id: 0,
                "id": "$members.id",
                "team": "$team",
                "course": "$members.course",
                "name": "$members.name",
                "scores": "$members.scores"}
            }
		])
}

module.exports.insere_team= team => {
	var newTeam = Team.create(team)
	return newTeam.save()
}

module.exports.insere_member= (id,member) => {
	return Team
		.updateOne({_id: id}, {$push: {members: member}})
		.exec()
}


module.exports.remove_team = (id) => {
	return Team
		.remove({_id: id})
		.exec()
}

module.exports.remove_member = (id, idMember) => {
	return Team
		.updateOne(
			{_id:id}, 
			{$pull: {members: {_id: idMember}}}
		)
		.exec()
}
