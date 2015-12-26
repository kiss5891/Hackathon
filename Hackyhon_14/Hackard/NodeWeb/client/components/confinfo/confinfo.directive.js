'use strict';

angular.module('hackardWebApp')
  .directive('confinfo', () => ({
    scope: {
      model: '='
    },
    templateUrl: 'components/confinfo/confinfo.html',
    restrict: 'E',
    controller: 'ConfInfoController',
    controllerAs: 'conif',
    link: function(scope) {
      function accumulateUsers(users) {
        var uData = {};
        //[{key: 'a', y: 5}]
        angular.forEach(users, (u) => {
          if(!uData[u.class]) {
            uData[u.class] = 1;
          }
          else {
            uData[u.class] += 1;
          }
        });
        var r = [];
        for(var i in uData) {
          r.push({key: i, y: uData[i]});
        }
        return r;
      }

      scope.item = {
        title: scope.model.title,
        prices: scope.model.prices,
        users: accumulateUsers(scope.model.users)
      };
      scope.xFunc = function() {
        return function(d) {
          return d.key;
        };
      };
      scope.yFunc = function() {
        return function(d) {
          return d.y;
        };
      };
    }
  }));