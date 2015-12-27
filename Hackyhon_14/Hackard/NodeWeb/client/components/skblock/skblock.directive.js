'use strict';

angular.module('hackardWebApp')
  .directive('skblock', () => ({
    scope: {
      model: '='
    },
    templateUrl: 'components/skblock/skblock.html',
    restrict: 'E',
    controller: 'SkillBlockController',
    controllerAs: 'skb'
  }));