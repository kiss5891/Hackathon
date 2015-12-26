'use strict';

class ProfileController {

  constructor(Auth, $location, $http) {
    var inst = this;
    inst.Auth = Auth;
    inst.$location = $location;
    inst.$http = $http;
    //mock user
    inst.user = {
      name: 'orz',
      skills: [{name: 'python', count: 2}, {name: 'js', count: 5}],
      events: [{title: 'sample1', type: 'present', date: Date.now()}, {title: 'sample2', type: 'present', date: Date.now()}, {title: 'abcde', type: 'price', date: Date.now()}]
    };
    inst.max = Number.NEGATIVE_INFINITY;
    angular.forEach(inst.user.skills, (value) => {
      inst.max = Math.max(value.count, inst.max);
    });
    console.log(this.Auth.getCurrentUser())
  }

  addEvent() {
    this.$http.post('/api/users/'+this.Auth.getCurrentUser()._id+'/events', {title: 'abcde'});
  }
}

angular.module('hackardWebApp')
  .controller('ProfileController', ProfileController);
