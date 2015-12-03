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
	if (actionName in this.actions){
	    console.error('action already exists!', actionName);
	}
	else {
            this.actions[actionName] = [];
	}
    }

    /*
     Add a listener function to an action, often to manipulate data in the 
     store
     */
    addListener(actionName, func) {
        if (actionName in this.actions) {
            this.actions[actionName].push(func);
        } else {
            console.error('No action with that name:', actionName);
        }
    }

    /*
     Excecute the action, call the listeners with the pyload
     */
    action(actionName, payload) {
        if (actionName in this.actions) {
            if (this.actions[actionName].length > 0) {
                for (var func of this.actions[actionName]) {
                    func(payload);
                }
            } else {
                console.error('No listeners for action: ', actionName);
            }
        } else {
            console.error('Action not found: ', actionName, 'Payload: ',
			  payload);
        }
    }

    /*
     Add a flux event
     */
    addEvent(fluxEvent){
	if (fluxEvent in this.events){
	    console.error('event already exists!', fluxEvent);
	}
	else {
	    this.events[fluxEvent] = [];
	}
    }

    /*
     Susccribe to a flux Event, generally a data change
     */
    suscribe(fluxEvent, func) {
	if (fluxEvent in this.events){
            this.events[fluxEvent].push(func);	    
	}
	else {
	    console.error('Unable to attach event. Event does not exists: ',
			fluxEvent);
	}
    }
    
    /*
     Notify the siscribers of a flux event, generally a dataChange for 
     re render
     */
    notify(fluxEvent) {
	if (fluxEvent in this.events){
            for (var observer of this.events[fluxEvent]) {
		observer();
            }
	}
	else{
	    console.log('Unable to notify unexisting event: ', fluxEvent);
	}
    }
    
    /*
     Register a datastore with a handler function for data retreival 
     */
    registerStore(rootName, func){
	if (rootName in this.stores){
	    console.log('Store already registered');
	}
	else {
	    this.stores[rootName] = func;
	}
    }
    
    /*
     Get the data from a store.
     param: dataRoute,  a list representing the route of the data required. 
     The first element represents the dataStore name.
     */
    getData(dataRoute){
	var data = '';
	if(dataRoute[0] in this.stores){
	    let p = this.stores[dataRoute[0]](dataRoute);
	    return p;
	}
	else{
	    return new Promise.reject('DataPath not found:', dataRoute);
	}
    }
}

export default Flux;

