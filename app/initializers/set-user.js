import Ember from 'ember';

export default {
  name: 'set-user',
  initialize: function(container, application) {
    var User = Ember.Object.extend({
      username: null,
      auth: null,
      appKey: "YOUR APP KEY"
    });
    application.register('session:current', User, {singleton: true});
    application.inject('route', 'session', 'session:current');
    application.inject('controller', 'session', 'session:current');
  }
};