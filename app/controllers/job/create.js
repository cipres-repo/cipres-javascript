import Ember from "ember";

export default Ember.ObjectController.extend({
	alert: null,
	formAttr: {
		tool: null,
		metadata: {
			clientJobName: null,
			clientToolName: null,
			statusEmail: false,
			emailAddress: null
		},
		vparam: {
			runtime_: null
		}
	},
	actions: {
		submitJob: function() {
			var self = this;
			var form = new FormData(document.getElementById("job-submission"));
			var formAttr = this.get('formAttr');
			if (!formAttr.tool) {
				alert("Please select a tool type!");
				return;
			}
			else {
				form.append('tool', formAttr.tool);
				for (var property in formAttr.metadata) {
			    if (formAttr.metadata.hasOwnProperty(property)) {
			    	if (formAttr.metadata[property]) {
			    		switch (property) {
			    			case 'emailAddress':
			    				if (formAttr.metadata['statusEmail']) {
			    					form.append('metadata.emailAddress', formAttr.metadata[property]);
			    				}
			    				break;
			    			default: 
			    				form.append('metadata.' + property, formAttr.metadata[property]);
			    		}
			    	}
			    }
				}
			  for (property in formAttr.vparam) {
			    if (formAttr.vparam.hasOwnProperty(property)) {
			    	if (formAttr.vparam[property]) {
			    		if (Ember.$.isNumeric(formAttr.vparam[property]))
			    			form.append('vparam.' + property, parseFloat(formAttr.vparam[property]).toFixed(1));
			    	}
			    }
			  }
			}
			var url = this.get('session.baseURL') + '/job/' +
								this.get('session.username');
			var auth = this.get('session.auth');
			var appKey = this.get('session.appKey');
			Ember.$.ajax({
				url:  url,
				type: 'POST',
		    beforeSend: function(xhr) { 
		      xhr.setRequestHeader('cipres-appkey', appKey);
		      xhr.setRequestHeader("Authorization", "Basic " + auth);
		    },
		    contentType: false,
		    processData: false,
		    data: form,
		    dataType: 'xml',
		    xhrFields: {
		    	withCredentials: true
		    },
		    success: function(data) {
		    	data = xml2json.parser(Ember.$(data).find('jobstatus').html());
		    	self.set('alert', 'Successfully submitted a job! ' + data.selfuri.title);
		    }
			});
		}
	}
});