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

    // iterate the node list
    RhythmJS.prototype.each = function(callback) {
        var node,
            nodeList = this.nodeList;

        for (var i = 0; i < nodeList.length; ++i) {
            node = nodeList[i];

            callback(i, node);
        }
    };

    // Nicholas C. Zakas, Maintainable Javascript
    // TODO can't be used for determining the function of DOM elements on IE8
    RhythmJS.isFunction = function(value) {
        return typeof value === 'function';
    };

    // Nicholas C. Zakas, Maintainable Javascript
    RhythmJS.isArray = function(value) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(value);
        } else {
            return Object.prototype.toString.call(value) === "[object Array]";
        }
    };

    RhythmJS.isString = function(value) {
        return typeof value === 'string';
    };

    // John Resig, http://ejohn.org/projects/flexible-javascript-events/
    RhythmJS.prototype.on = function(eventName, eventHandler) {
        this.each(function(index, element) {
            RhythmJS._addEventListener(element, eventName, eventHandler);
        });

        return this;
    };

    RhythmJS.prototype.off = function(eventName, eventHandler) {
        this.each(function(index, element) {
            RhythmJS._removeEventListener(element, eventName, eventHandler);
        });

        return this;
    };

    RhythmJS.prototype.trigger = function(eventName) {
        this.each(function(index, element) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, true, false);
            element.dispatchEvent(event);
        });

        return this;
    };

    RhythmJS.prototype.attr = function(attrName, arg1) {
        var nodeList = this.nodeList;

        if(RhythmJS.isFunction(arg1)) {
            this.each(function(index, element) {
                arg1(element.getAttribute(attrName));
            });
        } else if (RhythmJS.isString(arg1)) {
            this.each(function(index, element) {
                element.setAttribute(attrName, arg1);
            });
        } else {
            return nodeList[0]? nodeList[0].getAttribute(attrName): null;
        }
    };

    RhythmJS.prototype.hasClass = function(className) {


        return this;
    };

    RhythmJS.prototype.addClass = function(className) {
        

        return this;
    };

    RhythmJS.prototype.removeClass = function(className) {
        

        return this;
    };

    RhythmJS.prototype.css = function(properties) {
        

        return this;
    };
}(window));