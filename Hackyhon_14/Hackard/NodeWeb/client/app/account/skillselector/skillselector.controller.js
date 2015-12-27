'use strict';


class SkillSelectorController {

  constructor(Auth, $routeParams, $location, $scope, $timeout, $http) {
    var inst = this;
    var skillItems = [{value: 'JavaScript'},
    {value: 'C/C++'},
    {value: 'Python'},
    {value: 'Ruby'},
    {value: 'OpenCV'},
    {value: 'Java'},
    {value: 'SolidWorks'}];
    inst.Auth = Auth;
    inst.routeParams = $routeParams;
    inst.$location = $location;
    inst.scope = $scope;
    inst.timeout = $timeout;
    inst.$http = $http;
    inst.items = skillItems;
    inst.skills = [];
  }

  chooseSkill(evt, item) {
    var idx = this.skills.indexOf(item);
    if(idx < 0) {
      this.skills.push(item);
      //item.highlight();
      item.active = true;
      this.timeout(()=>{this.scope.$apply();});
    }
    else {
      this.skills.splice(idx, 1);
      item.active = false;
      this.timeout(()=>{this.scope.$apply();});
    }
  }

  selectSkills() {
    this.$http.put('/api/users/'+this.routeParams.eventId+'/events', {
      skills: this.skills.map(skill => skill.value)
    }).then(() => {
      this.$location.path('/profile');
    });
  }
}

angular.module('hackardWebApp')
  .controller('SkillSelectorController', SkillSelectorController);
