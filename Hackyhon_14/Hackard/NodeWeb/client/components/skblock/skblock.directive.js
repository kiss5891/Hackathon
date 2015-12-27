'use strict';

angular.module('hackardWebApp')
  .directive('skblock', () => ({
    scope: {
      model: '=',
      active: '='
    },
    templateUrl: 'components/skblock/skblock.html',
    restrict: 'E',
    controller: 'SkillBlockController',
    controllerAs: 'skb',
    link: function(scope, element) {
      
    }
  }));