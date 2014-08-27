(function(window) {
    'use strict';

    window.rhythmJS = window.rhythmJS || {};

    // Nicholas C. Zakas, Maintainable Javascript
    // TODO can't be used for determining the function of DOM elements on IE8
    rhythmJS.isFunction = function(func) {
        return typeof func === 'function';
    }

    // Nicholas C. Zakas, Maintainable Javascript
    rhythmJS.isArray = function(value) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(value);
        } else {
            return Object.prototype.toString.call(value) === "[object Array]";
        }
    }

    // John Resig, http://ejohn.org/projects/flexible-javascript-events/
    rhythmJS.addEvent = function(obj, type, fn) {
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function() {
                obj['e' + type + fn](window.event);
            }
            obj.attachEvent('on' + type, obj[type + fn]);
        } else {
            obj.addEventListener(type, fn, false);
        }
    }

    rhythmJS.removeEvent = function(obj, type, fn) {
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else {
            obj.removeEventListener(type, fn, false);
        }
    }
}(window));