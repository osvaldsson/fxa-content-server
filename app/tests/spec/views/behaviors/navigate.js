/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'chai',
  'sinon',
  'views/behaviors/navigate'
],
function (chai, sinon, NavigateBehavior) {
  'use strict';

  var assert = chai.assert;

  describe('views/behaviors/navigate', function () {
    it('navigates to the indicated screen, passing in success/error options', function () {
      var options = {
        error: 'error',
        success: 'success'
      };

      var navigateBehavior = new NavigateBehavior('settings', options);
      var viewMock = {
        navigate: sinon.spy()
      };

      navigateBehavior(viewMock);

      var endpoint = viewMock.navigate.args[0][0];
      var navigateOptions = viewMock.navigate.args[0][1];

      assert.equal(endpoint, 'settings');
      assert.equal(navigateOptions.success, 'success');
      assert.equal(navigateOptions.error, 'error');
    });
  });
});