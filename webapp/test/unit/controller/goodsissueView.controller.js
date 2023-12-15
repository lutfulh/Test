/*global QUnit*/

sap.ui.define([
	"fineomoregoodsissue/goodsissue1/controller/goodsissueView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("goodsissueView Controller");

	QUnit.test("I should test the goodsissueView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
