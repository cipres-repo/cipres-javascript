import Ember from "ember";
 
export default Ember.Route.extend({
	beforeModel: function() {
		if (!this.get('session.username')) {
			this.transitionTo('/');
		}
	},
	model: function() {
		var url = 'https://bumper.sdsc.edu/cipresrest/v1/job/' +
							this.get('session.username') + '?expand=true';
		var auth = this.get('session.auth');
		var appKey = this.get('session.appKey');
		return Ember.$.ajax({
			url: url,
			type: 'GET',
	    beforeSend: function(xhr) { 
	      xhr.setRequestHeader('cipres-appkey', appKey);
	      xhr.setRequestHeader("Authorization", "Basic " + auth);
	    },
	    dataType: 'xml',
	    xhrFields: {
	    	withCredentials: true
	    }
		}).then(function(data) {
			data = xml2json.parser(Ember.$(data).find('jobs').html());
			var objArr = [];
			if (data.jobstatus) {
				Ember.$.each(data.jobstatus, function(index, job) {
					var obj = {id: null, properties: [], metadata: [], messages: [], files: []};
					var terminal = false;
					var submitted = false;
					for (var property in job) {
				    if (job.hasOwnProperty(property)) {
				    	switch (property) {
				    		case "metadata":
				    			Ember.$.each(job.metadata.entry, function(index, value) {
				    				obj.metadata.push(value);
				    			});
				    			break;
				    		case "selfuri":
				    			obj.selfuri = job.selfuri;
				    			obj.id = job.selfuri.title;
				    			break;
				    		case "resultsuri":
				    			obj.resultsuri = job.resultsuri.url;
				    			break;
				    		case "workingdiruri":
				    			obj.workingdiruri = job.workingdiruri.url;				    			 
				    		 	break;
				    		case "messages":
				    			Ember.$.each(job.messages.message, function(index, value) {
				    				if (value.stage === 'SUBMITTED') {
				    					submitted = true;
				    				}
				    				obj.messages.unshift(value);
				    			});
				    			break;
				    		default:
				    			var temp = {};
				    			temp.name = property;
				    			temp.value = job[property];
				    			if (property === "terminalstage" && temp.value === 'true') {
				    				terminal = true;
				    			}
				    			obj.properties.push(temp);
				    	}
				    }
					}
					if (terminal) {
						obj.workingdiruri = null;
					}
					else if (submitted) {
						obj.resultsuri = null;
					}
					else {
						obj.workingdiruri = null;
						obj.resultsuri = null;
					}
					objArr.push(obj);
				});
			}
			return objArr;
		})
		.then(function(objArr) {
			Ember.$.each(objArr, function(index, obj) {
				if (obj.workingdiruri || obj.resultsuri) {
					url = null;
					if (obj.workingdiruri) {
						url = obj.workingdiruri;
					}
					else {
						url = obj.resultsuri;
					}
					Ember.$.ajax({
						url: url,
						type: 'GET',
				    beforeSend: function(xhr) { 
				      xhr.setRequestHeader('cipres-appkey', appKey);
				      xhr.setRequestHeader("Authorization", "Basic " + auth);
				    },
				    dataType: 'xml',
				    xhrFields: {
				    	withCredentials: true
				    }
				  }).then(function(data) {
						data = xml2json.parser(Ember.$(data).find('jobfiles').html());
						Ember.$.each(data.jobfile, function(index, jobfile) {
							obj.files.push({
								filename: jobfile.filename,
								download: jobfile.downloaduri.url
							});
						});
				  });
				}
			});
			return objArr;
		});
	}
});