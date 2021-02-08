var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MemberSchema = new Schema({
	id:String,
	name:String,
	course:String,
	scores: [Number]
})

var TeamSchema = new Schema({
	_id: String,
	guid: String,
	team: String,
	pitch1: Boolean,
	pitch2:Boolean,
	techPitch:Boolean,
	businessReport:Boolean,
	techReport: Boolean,
	members: [MemberSchema]
})

module.exports = mongoose.model('Team', TeamSchema, 'teams')