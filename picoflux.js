(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
@author: Ivan Florentin <ivan@sinergetica.com>
*/

"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Flux = (function () {
    function Flux() {
        _classCallCheck(this, Flux);

        this.actions = {};
        this.events = {};
        this.stores = {};
    }

    /*
     Add an action that will be propagated to a listener, 
     often by user interaction
     */

    _createClass(Flux, [{
        key: 'addAction',
        value: function addAction(actionName) {
            if (actionName in this.actions) {
                console.error('action already exists!', actionName);
            } else {
                this.actions[actionName] = [];
            }
        }

        /*
         Add a listener function to an action, often to manipulate data in the 
         store
         */

    }, {
        key: 'addListener',
        value: function addListener(actionName, func) {
            if (actionName in this.actions) {
                this.actions[actionName].push(func);
            } else {
                console.error('No action with that name:', actionName);
            }
        }

        /*
         Excecute the action, call the listeners with the pyload
         */

    }, {
        key: 'action',
        value: function action(actionName, payload) {
            if (actionName in this.actions) {
                if (this.actions[actionName].length > 0) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.actions[actionName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var func = _step.value;

                            func(payload);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                } else {
                    console.error('No listeners for action: ', actionName);
                }
            } else {
                console.error('Action not found: ', actionName, 'Payload: ', payload);
            }
        }

        /*
         Add a flux event
         */

    }, {
        key: 'addEvent',
        value: function addEvent(fluxEvent) {
            if (fluxEvent in this.events) {
                console.error('event already exists!', fluxEvent);
            } else {
                this.events[fluxEvent] = [];
            }
        }

        /*
         Susccribe to a flux Event, generally a data change
         */

    }, {
        key: 'suscribe',
        value: function suscribe(fluxEvent, func) {
            if (fluxEvent in this.events) {
                this.events[fluxEvent].push(func);
            } else {
                console.error('Unable to attach event. Event does not exists: ', fluxEvent);
            }
        }

        /*
         Notify the siscribers of a flux event, generally a dataChange for 
         re render
         */

    }, {
        key: 'notify',
        value: function notify(fluxEvent) {
            if (fluxEvent in this.events) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.events[fluxEvent][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var observer = _step2.value;

                        observer();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            } else {
                console.log('Unable to notify unexisting event: ', fluxEvent);
            }
        }

        /*
         Register a datastore with a handler function for data retreival 
         */

    }, {
        key: 'registerStore',
        value: function registerStore(rootName, func) {
            if (rootName in this.stores) {
                console.log('Store already registered');
            } else {
                this.stores[rootName] = func;
            }
        }

        /*
         Get the data from a store.
         param: dataRoute,  a list representing the route of the data required. 
         The first element represents the dataStore name.
         */

    }, {
        key: 'getData',
        value: function getData(dataRoute) {
            var data = '';
            if (dataRoute[0] in this.stores) {
                var p = this.stores[dataRoute[0]](dataRoute);
                return p;
            } else {
                return new Promise.reject('DataPath not found:', dataRoute);
            }
        }
    }]);

    return Flux;
})();

exports.default = Flux;

},{}]},{},[1]);
