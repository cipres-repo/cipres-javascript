import Ember from 'ember';

export default {
  name: 'session-config',
  initialize: function(container, application) {

    application.deferReadiness();
        
    Ember.$.getJSON("/api.json", function(json) {

    var session = Ember.Object.extend({
      username: null,
      auth: null,
      appKey: json.appKey,
      baseURL: json.url
    });

    application.register('session:current', session, {singleton: true});
    application.inject('route', 'session', 'session:current');
    application.inject('controller', 'session', 'session:current');

    application.advanceReadiness();
    });
  }
};