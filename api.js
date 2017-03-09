module.exports = [

    {
        description:			'Webhook',
        method: 				'POST',
        path:					'/webhook/',
        requires_authorization:	false,
        fn: function( callback, args ){
	        
	        Homey.log('received webhook call in api.js');
	        
	        Homey.log (JSON.stringify (args));

			var tokens = { 'lockstate': args.body.stateName };
			var state = {};
			
			var devices = Homey.manager("drivers").getDriver("smartlock").getDevices();
			
			Homey.log('---devices---' + JSON.stringify (devices));

			//Check if device still exists:
			if (typeof devices[args.body.nukiId] !== 'undefined') {
				
				Homey.manager('flow').triggerDevice( 'lockstate', tokens, state, devices[args.body.nukiId].device_data, function(err, result){
				    if( err ) return Homey.error(err);
				});
				
			}

            callback (null, true);

        }
    },
    
    {
        description:			'Webhook',
        method: 				'GET',
        path:					'/test/',
        requires_authorization:	false,
        fn: function( callback, args ){
	        
	        Homey.log('received test call in api.js');
            callback (null, true);

        }
    }
]