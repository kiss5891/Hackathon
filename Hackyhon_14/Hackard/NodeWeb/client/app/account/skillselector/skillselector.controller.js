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
    this.getEvent();
  }

  chooseSkill(evt, item) {
    var idx = this.skills.indexOf(item.value);
    if(idx < 0) {
      this.skills.push(item.value);
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
      skills: this.skills
    }).then(() => {
      this.$location.path('/profile');
    });
  }

  getEvent() {
    var uid = this.Auth.getCurrentUser()._id;
    var eventId = this.routeParams.eventId;
    this.$http.get('api/users/'+uid+'/events/'+eventId)
    .then((res) => {
      //iterate skills-arr
      var skills = res.data.skills;
      angular.forEach(skills, (val) => {
        var fItem = this.items.filter(i=>i.value === val);
        var len = fItem.length;
        if(len > 0) {
          fItem[0].active = true;
          this.skills.push(fItem[0].value);
          this.timeout(()=>{this.scope.$apply();});
        }
      });
    });
  }
}

angular.module('hackardWebApp')
  .controller('SkillSelectorController', SkillSelectorController);
