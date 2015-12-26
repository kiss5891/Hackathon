'use strict';

class SkillbarController {
  constructor($location) {
    this.$location = $location;
  }
}

angular.module('hackardWebApp')
  .controller('SkillbarController', SkillbarController);
