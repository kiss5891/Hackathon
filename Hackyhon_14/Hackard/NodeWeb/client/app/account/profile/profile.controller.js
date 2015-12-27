'use strict';

var skillItems = ['JavaScript', 'C/C++', 'Python', 'Ruby', 'OpenCV', 'Java', 'SolidWorks'];

class ProfileController {

  constructor(Auth, $scope, $location, $http, socket) {
    var inst = this;
    inst.Auth = Auth;
    inst.$location = $location;
    inst.$http = $http;
    inst.max = Number.NEGATIVE_INFINITY;

    inst.user = Auth.getCurrentUser();
    inst.user.skills = [{name: 'python', count: 2}, {name: 'js', count: 5}];
    inst.user.events = [];
    angular.forEach(inst.user.skills, (value) => {
      inst.max = Math.max(value.count, inst.max);
    });
    var uid = inst.user._id;
    $http.get('/api/users/'+uid+'/events').then(response => {
      //this.events = response.data;
      inst.user.events = response.data;
      socket.syncUpdates('event', inst.user.events);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });
  }

  addEvent() {
    this.$http.post('/api/users/'+this.Auth.getCurrentUser()._id+'/events', {
      title: 'abcde',
      skills: _.sample(skillItems, _.random(0, 7))
    });
  }
}

angular.module('hackardWebApp')
  .controller('ProfileController', ProfileController);
