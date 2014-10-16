(function(window) {
    'use strict';

    var RhythmJS;

    window.$ = RhythmJS = function(selector) {
        if (!(this instanceof RhythmJS)) {
            return new RhythmJS(selector);
        }

        this.nodeList = document.querySelectorAll(selector);
    };

    RhythmJS._addEventListener = (function() {
        if (window.attachEvent) {
            return function(node, eventName, eventHandler) {
                node['e' + eventName + eventHandler] = eventHandler;
                node[eventName + eventHandler] = function() {
                    node['e' + eventName + eventHandler](window.event);
                };
                node.attachEvent('on' + eventName, node[eventName + eventHandler]);
            };
        } else {
            return function(node, eventName, eventHandler) {
                node.addEventListener(eventName, eventHandler, false);
            };
        }

    }());

    RhythmJS._removeEventListener = (function() {
        if (window.attachEvent) {
            return function(node, eventName, eventHandler) {
                node.detachEvent('on' + eventName, node[eventName + eventHandler]);
                node[eventName + eventHandler] = null;
            };
        } else {
            return function(node, eventName, eventHandler) {
                node.removeEventListener(eventName, eventHandler, false);
            };
        }

    }());

    // Nicholas C. Zakas, Maintainable Javascript
    // TODO can't be used for determining the function of DOM elements on IE8
    RhythmJS.isFunction = function(func) {
        return typeof func === 'function';
    };

    // Nicholas C. Zakas, Maintainable Javascript
    RhythmJS.isArray = function(value) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(value);
        } else {
            return Object.prototype.toString.call(value) === "[object Array]";
        }
    };

    // John Resig, http://ejohn.org/projects/flexible-javascript-events/
    RhythmJS.prototype.on = function(eventName, eventHandler) {
        var node,
            nodeList = this.nodeList;

        for (var i = 0; i < nodeList.length; ++i) {
            node = nodeList[i];

            RhythmJS._addEventListener(node, eventName, eventHandler);
        }

        return this;
    };

    RhythmJS.prototype.off = function(eventName, eventHandler) {
        var node,
            nodeList = this.nodeList;

        for (var i = 0; i < nodeList.length; ++i) {
            node = nodeList[i];

            RhythmJS._removeEventListener(node, eventName, eventHandler);
        }

        return this;
    };

    RhythmJS.prototype.trigger = function(eventName) {
        var nodeList = this.nodeList,
            node, 
            event;

        for (var i = 0; i < nodeList.length; ++i) {
            node = nodeList[i];

            event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, true, false);
            node.dispatchEvent(event);
        }

        return this;
    };
}(window));