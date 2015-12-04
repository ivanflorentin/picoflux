/*
@author: Ivan Florentin <ivan@sinergetica.com>
*/

"use strict";

class Flux {

    constructor() {
        this.actions = {};
        this.events = {};
	this.stores = {};
    }

    /*
     Add an action that will be propagated to a listener, 
     often by user interaction
     */
    addAction(actionName) {
	return new Promise((resolve, reject) => {
	    if (actionName in this.actions){
		let msg = 'Action {Action} already exists!'
		    .replace('{Action}', actionName);
		reject(new Error(msg));
	    }else {
		this.actions[actionName] = [];
		resolve(actionName);
	    }
	});
    }

    /*
     Add a listener function to an action, often to manipulate data in the 
     store
     */
    addListener(actionName, func) {
	return new Promise((resolve, reject) => {
            if (actionName in this.actions) {
		this.actions[actionName].push(func);
		resolve(actionName);
            } else {
		let msg = 'No Action with the name {Action} found!'
		    .replace('{Action}', actionName);
		reject(new Error(msg));
	    }
        });
    }

    /*
     Excecute the action, call the listeners with the pyload
     */
    action(actionName, payload) {
	return new Promise((resolve, reject) => {
            if (actionName in this.actions) {
		if (this.actions[actionName].length > 0) {
                    for (let func of this.actions[actionName]) {
			func(payload);
			resolve(actionName);
                    }
		} else {
                    let msg = "No listeners for action: " +  actionName;
		    reject(new Error(msg));
		}
            } else {
		let msg = 'No Action with the name {Action} found!'
		    .replace('{Action}', actionName);
		reject(new Error(msg));
            }
	});
    }

    /*
     Add a flux event
     */
    addEvent(fluxEvent){
	return new Promise((resolve, reject) => {
	    if (fluxEvent in this.events){
		let msg = 'event {FluxEvent} already exists!'
		    .replace("{FluxEvent}", fluxEvent);
		reject(new Error(msg));
	    }else {
		this.events[fluxEvent] = [];
		resolve(fluxEvent);
	    }
	});
    }

    /*
     Susccribe to a flux Event, generally a data change
     */
    suscribe(fluxEvent, func) {
	return new Promise((resolve, reject) => {
	    if (fluxEvent in this.events){
		this.events[fluxEvent].push(func);
		resolve(fluxEvent);
	    }else {
		let msg = 'Unable to attach event. Event {FluxEvent} does not exists.'
			      .replace("{FluxEvent}", fluxEvent);
		reject(new Error(msg));
	    }
	});
    }
    
    /*
     Notify the siscribers of a flux event, generally a dataChange for 
     re render
     */
    notify(fluxEvent) {
	return new Promise((resolve, reject) => {
	    if (fluxEvent in this.events){
		for (var observer of this.events[fluxEvent]) {
		    observer();
		    resolve(fluxEvent);
		}
	    }else{
		let msg = 'Unable to notify unexisting event: {FluxEvent}.'
		    .replace("{FluxEvent}", fluxEvent);
		reject(new Error(msg));

	    }
	});
    }
    
    /*
     Register a datastore with a handler function for data retreival 
     */
    registerStore(rootName, func){
	return new Promise((resolve, reject) => {
	    if (rootName in this.stores){
		let msg = 'Store {Store} already registered'
		    .replace("{Store}", rootName);
		reject(new Error(msg));
	    }
	    else {
		this.stores[rootName] = func;
		resolve(rootName);
	    }
	});
    }
    
    /*
     Get the data from a store.
     param: dataRoute,  a list representing the route of the data required. 
     The first element represents the dataStore name.
     */
    getData(dataRoute){
	return new Promise((resolve, reject) => {
	    var data = '';
	    if(dataRoute[0] in this.stores){
		let p = this.stores[dataRoute[0]](dataRoute);
		resolve(p);
	    }
	    else{
		let msg = 'DataPath {DataRoute} not found'
		    .replace("{DataRoute}", dataRoute);
		reject(new Error(msg));
	    }
	});
    }
}

export default Flux;

