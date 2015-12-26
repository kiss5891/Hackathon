'use strict';

angular.module('hackardWebApp')
  .directive('evtblock', ['$timeout', ($timeout) => ({
    scope: {
      model: '='
    },
    templateUrl: 'components/evtblock/evtblock.html',
    restrict: 'E',
    controller: 'EvtblockController',
    controllerAs: 'eb',
    link: function(scope) {
      var dateStr = '';
      try {
        dateStr = new Date(scope.model.date).toISOString();
      }
      catch(err) {
        dateStr = scope.model.date || '';
      }
      scope.item = {
        title: scope.model.title,
        date: dateStr.substring(0, dateStr.indexOf('T')),
        isPrice: scope.model.type === 'price'
      };
      $timeout(function() {
        scope.$apply();
      });
    }
  })]);