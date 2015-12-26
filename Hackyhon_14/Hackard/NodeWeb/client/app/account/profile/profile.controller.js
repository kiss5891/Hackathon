'use strict';

class ProfileController {

  constructor(Auth, $location) {
    var inst = this;
    inst.Auth = Auth;
    inst.$location = $location;
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
  }
}

angular.module('hackardWebApp')
  .controller('ProfileController', ProfileController);
