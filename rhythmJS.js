(function(window) {
	'use strict';

	window.rhythmJS = window.rhythmJS || {};

	// TODO can't be used for determining the function of DOM elements on IE8
	rhythmJS.isFunction = function(func) {
		return typeof func === 'function';
	}

	rhythmJS.isArray = function(value) {
		if(typeof Array.isArray === 'function') {
			return Array.isArray(value);
		} else {
			return Object.prototype.toString.call(value) === "[object Array]";
		}
	}
}(window));