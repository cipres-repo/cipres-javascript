import Ember from "ember";
 
export default Ember.Route.extend({
	beforeModel: function() {
		if (!this.get('session.username')) {
			this.transitionTo('/');
		}
	},
	model: function() {
		return Ember.$.get(this.get('session.baseURL') + '/tool').then(function(data) {
			data = xml2json.parser(Ember.$(data).find('tools').html());
			var arr = [];
			Ember.$.each(data.tool, function(index, tool) {
				arr.push(tool.toolid);
			});

			return Ember.Object.create({tools: arr});
		}, 'xml');
	}
});