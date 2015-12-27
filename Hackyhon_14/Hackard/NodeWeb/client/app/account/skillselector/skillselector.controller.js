'use strict';

var skillItems = ['JavaScript', 'C/C++', 'Python', 'Ruby', 'OpenCV', 'Java', 'SolidWorks'];

class SkillSelectorController {

  constructor(Auth) {
    var inst = this;
    inst.Auth = Auth;
    inst.items = skillItems;
  }

  chooseSkill(item) {
    console.log(item);
  }
}

angular.module('hackardWebApp')
  .controller('SkillSelectorController', SkillSelectorController);
