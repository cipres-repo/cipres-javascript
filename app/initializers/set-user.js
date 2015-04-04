import Ember from 'ember';

export default {
  name: 'set-user',
  initialize: function(container, application) {

    application.deferReadiness();
        
    Ember.$.getJSON("/api.json", function(json) {

    var user = Ember.Object.extend({
      username: null,
      auth: null,
      appKey: json.appKey
    });

    application.register('session:current', user, {singleton: true});
    application.inject('route', 'session', 'session:current');
    application.inject('controller', 'session', 'session:current');

    application.advanceReadiness();
    });
  }
};