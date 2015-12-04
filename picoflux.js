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
			var _this = this;

			return new Promise(function (resolve, reject) {
				if (actionName in _this.actions) {
					var msg = 'Action {Action} already exists!'.replace('{Action}', actionName);
					reject(new Error(msg));
				} else {
					_this.actions[actionName] = [];
					resolve(actionName);
				}
			});
		}

		/*
   Add a listener function to an action, often to manipulate data in the 
   store
   */

	}, {
		key: 'addListener',
		value: function addListener(actionName, func) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				if (actionName in _this2.actions) {
					_this2.actions[actionName].push(func);
					resolve(actionName);
				} else {
					var msg = 'No Action with the name {Action} found!'.replace('{Action}', actionName);
					reject(new Error(msg));
				}
			});
		}

		/*
   Excecute the action, call the listeners with the pyload
   */

	}, {
		key: 'action',
		value: function action(actionName, payload) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				if (actionName in _this3.actions) {
					if (_this3.actions[actionName].length > 0) {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = _this3.actions[actionName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var func = _step.value;

								func(payload);
								resolve(actionName);
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
						var msg = "No listeners for action: " + actionName;
						reject(new Error(msg));
					}
				} else {
					var msg = 'No Action with the name {Action} found!'.replace('{Action}', actionName);
					reject(new Error(msg));
				}
			});
		}

		/*
   Add a flux event
   */

	}, {
		key: 'addEvent',
		value: function addEvent(fluxEvent) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				if (fluxEvent in _this4.events) {
					var msg = 'event {FluxEvent} already exists!'.replace("{FluxEvent}", fluxEvent);
					reject(new Error(msg));
				} else {
					_this4.events[fluxEvent] = [];
					resolve(fluxEvent);
				}
			});
		}

		/*
   Susccribe to a flux Event, generally a data change
   */

	}, {
		key: 'suscribe',
		value: function suscribe(fluxEvent, func) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				if (fluxEvent in _this5.events) {
					_this5.events[fluxEvent].push(func);
					resolve(fluxEvent);
				} else {
					var msg = 'Unable to attach event. Event {FluxEvent} does not exists.'.replace("{FluxEvent}", fluxEvent);
					reject(new Error(msg));
				}
			});
		}

		/*
   Notify the siscribers of a flux event, generally a dataChange for 
   re render
   */

	}, {
		key: 'notify',
		value: function notify(fluxEvent) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				if (fluxEvent in _this6.events) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = _this6.events[fluxEvent][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var observer = _step2.value;

							observer();
							resolve(fluxEvent);
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
					var msg = 'Unable to notify unexisting event: {FluxEvent}.'.replace("{FluxEvent}", fluxEvent);
					reject(new Error(msg));
				}
			});
		}

		/*
   Register a datastore with a handler function for data retreival 
   */

	}, {
		key: 'registerStore',
		value: function registerStore(rootName, func) {
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				if (rootName in _this7.stores) {
					var msg = 'Store {Store} already registered'.replace("{Store}", rootName);
					reject(new Error(msg));
				} else {
					_this7.stores[rootName] = func;
					resolve(rootName);
				}
			});
		}

		/*
   Get the data from a store.
   param: dataRoute,  a list representing the route of the data required. 
   The first element represents the dataStore name.
   */

	}, {
		key: 'getData',
		value: function getData(dataRoute) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				var data = '';
				if (dataRoute[0] in _this8.stores) {
					var p = _this8.stores[dataRoute[0]](dataRoute);
					resolve(p);
				} else {
					var msg = 'DataPath {DataRoute} not found'.replace("{DataRoute}", dataRoute);
					reject(new Error(msg));
				}
			});
		}
	}]);

	return Flux;
})();

exports.default = Flux;

},{}]},{},[1]);
