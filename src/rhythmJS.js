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

    // extend target object with object1
    RhythmJS.extend = function(target, object1) {
        for (var property in object1) {
            if (object1.hasOwnProperty(property)) {
                target[property] = object1[property];
            }
        }
    };

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

        if (RhythmJS.isFunction(arg1)) {
            this.each(function(index, element) {
                arg1(element.getAttribute(attrName));
            });
        } else if (RhythmJS.isString(arg1)) {
            this.each(function(index, element) {
                element.setAttribute(attrName, arg1);
            });
        } else {
            return nodeList[0] ? nodeList[0].getAttribute(attrName) : null;
        }
    };

    // check if an DOM element has the class
    function isClassExist(className, element) {
        var classValue = element.getAttribute('class'),
            classArr,
            i;

        if (classValue) {
            classArr = classValue.split(' ');
            for (i = classArr.length - 1; i >= 0; i--) {
                if (classArr[i] === className) {
                    return true;
                }
            }
        }

        return false;
    }

    RhythmJS.prototype.hasClass = function(className) {
        var nodeList = this.nodeList,
            i;

        for (i = 0; i < nodeList.length; i++) {
            if (isClassExist(className, nodeList[0])) {
                return true;
            }
        }

        return false;
    };

    RhythmJS.prototype.addClass = function(className) {
        this.each(function(index, element) {
            if (!isClassExist(className, element)) {
                element.setAttribute('class', element.getAttribute('class') + ' ' + className);
            }
        });

        return this;
    };

    RhythmJS.prototype.removeClass = function(className) {
        this.each(function(index, element) {
            var classValue = element.getAttribute('class'),
                classArr,
                i;

            if (classValue) {
                classArr = classValue.split(' ');
                while (i = classArr.indexOf(className) !== -1) {
                    classArr.splice(i, 1);
                }

                element.setAttribute('class', classArr.join(' '));
            }
        });

        return this;
    };

    // change camel-style name to hyphen-style
    function camelToHyphen(name) {
        return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    // change hyphen-style name to camel-style
    function hyphenToCamel(name) {
        return name.replace(/-([a-z])/g, function(g) {
            return g[1].toUpperCase();
        });
    }

    // change the value of attribute "style" to an Javascript object
    function stylesToObject(styles) {
        var result = {},
            styleArr,
            stylePair,
            i;

        if(styles) {
            styleArr = styles.split(';');
            for (i = styleArr.length - 1; i >= 0; i--) {
                stylePair = styleArr.split(':');
                result[hyphenToCamel(stylePair[0].trim())] = stylePair[1].trim();
            }
        }

        return result;
    }

    // change an Javascript object to the value of attribute "style"
    function objectToStyles(object) {
        var result = '';

        for(var property in object) {
            if(object.hasOwnProperty(property)) {
                result += camelToHyphen(property) + ": " + object[property] + '; ';
            }
        }

        return result;
    }

    RhythmJS.prototype.css = function(properties) {
        this.each(function(index, element) {
            var styles = element.getAttribute('style'),
                stylesObject = stylesToObject(styles);

            RhythmJS.extend(stylesObject, properties);

            element.setAttribute('style', objectToStyles(stylesObject));
        });

        return this;
    };
}(window));