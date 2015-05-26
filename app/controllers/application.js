import Ember from "ember";

export default Ember.ObjectController.extend({
	sessionControl: {
		username: null,
		password: null
	},
	actions: {
		login: function() {
			var url = this.get('session.baseURL') + '/job/' +
								this.get('sessionControl.username');
			var auth = btoa(this.get('sessionControl.username') + ":" + this.get('sessionControl.password'));
			var appKey = this.get('session.appKey');
			var controller = this;
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
		    },
		    success: function() {
		    	controller.set('session.username', controller.get('sessionControl.username'));
					controller.set('session.auth', btoa(controller.get('sessionControl.username') + ":" + controller.get('sessionControl.password')));
					controller.set('sessionControl.username', null);
					controller.set('sessionControl.password', null);
					alert('You are now logged in.');
		    },
		    error: function() {
		    	alert('invalid credentials');
		    }
			});
		},
		logout: function() {
			this.set('session.username', null);
			this.set('session.auth', null);
			this.transitionToRoute('index');
			alert('You have logged out.');
		}

	}
});