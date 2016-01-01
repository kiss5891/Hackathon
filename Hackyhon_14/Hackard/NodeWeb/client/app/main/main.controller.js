'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.conference = {
      title: '14th',
      prices: [{title: 'ABCDE'}, {title: 'bcdea'}, {title: 'EDCBA'}],
      users: [{name: 'SoftMan', class: 'Software'}, {name: 'Alan', class: 'Hardware'}, {name: 'Allen', class: 'Hardware'}]
    };
  }
}

angular.module('hackardWebApp')
  .controller('MainController', MainController);

})();
