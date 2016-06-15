"use strict";

var net = require('net');
var devices = {};

module.exports.settings = function( device_data, newSettingsObj, oldSettingsObj, changedKeysArr, callback ) {

    Homey.log ('Changed settings: ' + JSON.stringify(device_data) + ' / ' + JSON.stringify(newSettingsObj) + ' / old = ' + JSON.stringify(oldSettingsObj));
    
    try {
      changedKeysArr.forEach(function (key) {
        devices[device_data.id].settings[key] = newSettingsObj[key]
      })
      callback(null, true)
    } catch (error) {
      callback(error)
    }

};


module.exports.init = function(devices_data, callback) {
    
    devices_data.forEach(function initdevice(device) {
	    
	    Homey.log('add device: ' + JSON.stringify(device));
	    
	    devices[device.id] = device;
	    
	    
	    module.exports.getSettings(device, function(err, settings){
		    devices[device.id].settings = settings;
		    
		    startsocket (settings, device.id);	
			callbacklog[settings.ipaddress] = {};
	
		});
		
	});
	
	Homey.log("Nuki app - init done");
	
	callback (null, true);
};

module.exports.deleted = function( device_data ) {
    
    Homey.log('deleted: ' + JSON.stringify(device_data));
    
    /*cmdclient[devices[device_data.id].settings.ipaddress].close();*/
    
    devices[device_data.id] = [];
	
};

module.exports.pair = function (socket) {
	
	
	
}





Homey.manager('flow').on('action.lockAction', function (callback, args) {
	
	//devices[args.device.id].settings.ipaddress
	//args.
	
}


Homey.manager('flow').on('action.lockAction.action.autocomplete', function (callback, value) {
	var actions = searchForActions(value.query);
	callback(null, items);
});


function searchForActions (value) {
	
	var possibleInputs = [
		{
			inputName: "1",
			friendlyName: "Unlock"
		},
		{
			inputName: "2",
			friendlyName: "Lock"
		},
		{
			inputName: "3",
			friendlyName: "Unlatch"
		},
		{
			inputName: "4",
			friendlyName: "Lock 'n' go"
		},
		{
			inputName: "5",
			friendlyName: "Lock 'n' go with unlatch"
		}
	];
	
	var tempItems = [];
	for (var i = 0; i < possibleInputs.length; i++) {
		var tempInput = possibleInputs[i];
		if ( tempInput.friendlyName.toLowerCase().indexOf(value.toLowerCase()) >= 0 ) {
			tempItems.push({ icon: "", name: tempInput.friendlyName, inputName: tempInput.inputName });
		}
	}
	return tempItems;
}