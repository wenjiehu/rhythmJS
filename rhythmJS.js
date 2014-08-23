(function(window) {
	'use strict';

	window.rhythmJS = window.rhythmJS || {};

	// can't be used for determining the function of DOM elements on IE8
	rhythmJS.isFunction = function(func) {
		return typeof func === 'function';
	}
}(window));