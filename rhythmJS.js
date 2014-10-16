(function(window) {
    'use strict';

    var RhythmJS;

    window.$ = RhythmJS = function(selector) {
        if (!(this instanceof RhythmJS)) {
            return new RhythmJS(selector);
        }

        this.nodeList = document.querySelectorAll(selector);
    }

    // Nicholas C. Zakas, Maintainable Javascript
    // TODO can't be used for determining the function of DOM elements on IE8
    RhythmJS.isFunction = function(func) {
        return typeof func === 'function';
    }

    // Nicholas C. Zakas, Maintainable Javascript
    RhythmJS.isArray = function(value) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(value);
        } else {
            return Object.prototype.toString.call(value) === "[object Array]";
        }
    }

    // John Resig, http://ejohn.org/projects/flexible-javascript-events/
    RhythmJS.prototype.on = function(eventName, eventHandler) {
        var node,
            nodeList = this.nodeList;

        for (var i = 0; i < nodeList.length; ++i) {
            node = nodeList[i];

            // TODO change to determine the event attach method when the page load, do not determine it in the loop
            if (node.attachEvent) {
                node['e' + eventName + eventHandler] = eventHandler;
                node[eventName + eventHandler] = function() {
                    node['e' + eventName + eventHandler](window.event);
                }
                node.attachEvent('on' + eventName, node[eventName + eventHandler]);
            } else {
                node.addEventListener(eventName, eventHandler);
            }
        }

        return this;
    }

    RhythmJS.prototype.off = function(eventName, eventHandler) {
        var node,
            nodeList = this.nodeList;

        for (var i = 0; i < nodeList.length; ++i) {
            node = nodeList[i];

            if (node.detachEvent) {
                node.detachEvent('on' + eventName, node[eventName + eventHandler]);
                node[eventName + eventHandler] = null;
            } else {
                node.removeEventListener(eventName, eventHandler);
            }
        }

        return this;
    }
}(window));