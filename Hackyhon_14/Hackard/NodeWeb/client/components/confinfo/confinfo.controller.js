'use strict';

class ConfInfoController {
  constructor($location) {
    this.$location = $location;
  }
}

angular.module('hackardWebApp')
  .controller('ConfInfoController', ConfInfoController);
