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
    inst.user.events = [];
    function parseToSkills(evts) {
      var skillStats = {};
      angular.forEach(evts, val => {
        angular.forEach(val.skills, sval => {
          skillStats[sval] = skillStats[sval]?skillStats[sval]+1:1;
        });
      });
      var skills = [];
      var max = Number.NEGATIVE_INFINITY;
      angular.forEach(skillStats, (val,key) => {
        skills.push({name: key, count: val});
        max = Math.max(val, max);
      });
      return {
        skills: skills,
        max: max
      };
    }
    var skInfo = parseToSkills(inst.user.events);
    inst.skills = skInfo.skills;
    inst.max = skInfo.max;
    var uid = inst.user._id;
    $http.get('/api/users/'+uid+'/events').then(response => {
      inst.user.events = response.data;
      var skInfo = parseToSkills(inst.user.events);
      inst.skills = skInfo.skills;
      inst.max = skInfo.max;
      socket.syncUpdates('event', inst.user.events, function() {
        var skInfo = parseToSkills(inst.user.events);
        inst.skills = skInfo.skills;
        inst.max = skInfo.max;
      });
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
