'use strict';

class EvtblockController {
  constructor($location) {
    this.$location = $location;
  }
}

angular.module('hackardWebApp')
  .controller('EvtblockController', EvtblockController);
