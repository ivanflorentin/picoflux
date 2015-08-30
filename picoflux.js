/*
@author: Ivan Florentin <ivan@sinergetica.com>
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Flux = (function () {
    function Flux() {
        _classCallCheck(this, Flux);

        this.actions = {};
        this.observers = [];
    }

    _createClass(Flux, [{
        key: 'addAction',
        value: function addAction(name) {
            this.actions[name] = [];
        }
    }, {
        key: 'addListener',
        value: function addListener(name, func) {
            if (name in this.actions) {
                this.actions[name].push(func);
            } else {
                console.log('No action with that name:', name);
            }
        }
    }, {
        key: 'action',
        value: function action(name, payload) {
            if (name in this.actions) {
                if (this.actions[name].length > 0) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.actions[name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var func = _step.value;

                            func(payload);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator['return']) {
                                _iterator['return']();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                } else {
                    console.log('No listeners for action: ', name);
                }
            } else {
                console.log('Action not found: ', name, 'Payload: ', payload);
            }
        }
    }, {
        key: 'attach',
        value: function attach(func) {
            this.observers.push(func);
        }
    }, {
        key: 'notify',
        value: function notify() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.observers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var observer = _step2.value;

                    observer();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return Flux;
})();

exports['default'] = Flux;
module.exports = exports['default'];
