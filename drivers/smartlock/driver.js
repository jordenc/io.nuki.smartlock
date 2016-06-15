"use strict";

var net = require('net');
var devices = {};
var tempIP, tempPort, tempToken;

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
		});
		
	});
	
	Homey.log("Nuki app - init done");
	
	callback (null, true);
};

module.exports.deleted = function( device_data ) {
    
    Homey.log('deleted: ' + JSON.stringify(device_data));
    
    devices[device_data.id] = [];
	
};

module.exports.pair = function (socket) {
	// socket is a direct channel to the front-end

	// this method is run when Homey.emit('list_devices') is run on the front-end
	// which happens when you use the template `list_devices`
	socket.on('list_devices', function (data, callback) {

		Homey.log("Nuki app - list_devices tempIP is " + tempIP);
		
		
		//get devices by calling /list
		//OUTPUT: [{"nukiId": 1, "name": "Home"}, {"nukiId": 2, "name": "Grandma"}]
		/*
		var devices = [{
			name				: tempIP,
			data: {
				id				: tempIP
			},
			settings: {
				"ipaddress" 	: tempIP,
				"port"			: tempPort,
				"token"			: tempToken
			},
			capabilities: ['locked']
		}];
		*/

		callback (null, devices);

	});

	// this is called when the user presses save settings button in start.html
	socket.on('get_devices', function (data, callback) {

		// Set passed pair settings in variables
		tempIP = data.ipaddress;
		tempPort = data.port;
		tempToken = data.token;
		
		Homey.log ( "Nuki app - got get_devices from front-end, tempIP =" + tempIP + " / token = " + tempToken + " / port = " + tempPort );

		// assume IP is OK and continue
		socket.emit ('continue', null);

	});

	socket.on('disconnect', function(){
		Homey.log("Nuki app - User aborted pairing, or pairing is finished");
	})
}


module.exports.capabilities = {
    locked: {

        get: function( device_data, callback ){

			callback (null, false);
	        
        },

        set: function( device_data, turnon, callback ) {
	        
	        Homey.log('Setting device_status of ' + devices[device_data.id].settings.ipaddress + ' to ' + turnon);

			if (turnon) {
				
			} else {
				
			}

        }
    }
}





Homey.manager('flow').on('action.lockAction', function (callback, args) {
	
	sendcommand (args.device.id, 'lockAction', callback);
	
});


Homey.manager('flow').on('action.lockAction.action.autocomplete', function (callback, value) {
	var actions = searchForActions(value.query);
	callback(null, items);
});


function sendcommand(device_id) {
	
	//if response status is 404 => callback ('Invalid lock ID', false);
	//if response status is 401 => callback ('Invalid token', false);
	if (response.batteryCritical) Homey.manager('flow').triggerDevice('batteryCritical', {}, {device: device_id});
	if (response.success) callback (null, true); else callback (null, false);
	
}

function searchForActions (value) {
	
	var possibleInputs = [
		{
			inputName: "1",
			friendlyName: __("unlock")
		},
		{
			inputName: "2",
			friendlyName: __("lock")
		},
		{
			inputName: "3",
			friendlyName: __("unlatch")
		},
		{
			inputName: "4",
			friendlyName: __("lockngo")
		},
		{
			inputName: "5",
			friendlyName: __("lockngowithunlatch")
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