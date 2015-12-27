'use strict';

class SettingsController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth) {
    this.Auth = Auth;
  }

  updateSetting(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.updateSetting(this.user)
        .then(() => {
          this.message = 'Setting successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('hackardWebApp')
  .controller('SettingsController', SettingsController);
