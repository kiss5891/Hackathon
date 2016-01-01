'use strict';

class SkillBlockController {
  constructor($location) {
    this.$location = $location;
  }
}

angular.module('hackardWebApp')
  .controller('SkillBlockController', SkillBlockController);
