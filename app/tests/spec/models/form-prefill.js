/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var chai = require('chai');
  var FormPrefill = require('models/form-prefill');

  var assert = chai.assert;

  describe('models/form-prefill', function () {
    it('can be instantiated', function () {
      var form = new FormPrefill();
      assert.isDefined(form);
    });
  });
});
