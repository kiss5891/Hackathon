'use strict';

var skillItems = [{value: 'JavaScript'},
{value: 'C/C++'},
{value: 'Python'},
{value: 'Ruby'},
{value: 'OpenCV'},
{value: 'Java'},
{value: 'SolidWorks'}];

class SkillSelectorController {

  constructor(Auth, $routeParams, $scope, $timeout) {
    var inst = this;
    inst.Auth = Auth;
    inst.routeParams = $routeParams;
    inst.scope = $scope;
    inst.timeout = $timeout;
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
    //TODO call api
    console.log(this.routeParams.eventId);
    console.log(this.skills);
  }
}

angular.module('hackardWebApp')
  .controller('SkillSelectorController', SkillSelectorController);
