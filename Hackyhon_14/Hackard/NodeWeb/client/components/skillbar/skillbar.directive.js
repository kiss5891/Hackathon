'use strict';

angular.module('hackardWebApp')
  .directive('skillbar', ['$timeout', ($timeout) => ({
    scope: {
      models: '=',
      model: '=',
      max: '='
    },
    templateUrl: 'components/skillbar/skillbar.html',
    restrict: 'E',
    controller: 'SkillbarController',
    controllerAs: 'sk',
    link: function(scope, element) {
      var clrs = ['#5cb85c', '#5bc0de', '#f0ad4e', '#d9534f'];
      scope.item = {
        value: scope.model.count/scope.max*100,
        text: scope.model.name+'('+scope.model.count+')'
      };
      $(element).find('.progress-bar').attr('style', 'width:'+scope.item.value+'%;background-color:'+clrs[scope.models.indexOf(scope.model)%clrs.length]);
      $timeout(function() {
        scope.$apply();
      });
    }
  })]);