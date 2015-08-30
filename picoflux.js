/*
@author: Ivan Florentin <ivan@sinergetica.com>
*/

export default class Flux {

    constructor() {
        this.actions = {};
        this.observers = [];
    }
    addAction(name) {
        this.actions[name] = [];
    }
    addListener(name, func) {
        if (name in this.actions) {
            this.actions[name].push(func);
        } else {
            console.log('No action with that name:', name);
        }
    }
    action(name, payload) {
        if (name in this.actions) {
            if (this.actions[name].length > 0) {
                for (var func of this.actions[name]) {
                    func(payload);
                }
            } else {
                console.log('No listeners for action: ', name);
            }
        } else {
            console.log('Action not found: ', name, 'Payload: ', payload);
        }
    }

    attach(func) {
        this.observers.push(func);
    }
    notify() {
        for (var observer of this.observers) {
            observer();
        }
    }
}
