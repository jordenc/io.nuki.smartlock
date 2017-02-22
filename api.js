module.exports = [

    {
        description:			'Webhook',
        method: 				'POST',
        path:					'/webhook/',
        requires_authorization:	false,
        fn: function( callback, args ){
	        
	        Homey.log('received webhook call in api.js');
	        
	        Homey.log (JSON.stringify (args));
	        
	        /*
		        
		        {"params":{},"body":{"nukiId":93786865,"state":1,"stateName":"locked","batteryCritical":false},"query":{},"files":{},"req":{"remoteAddress":"::ffff:192.168.1.170"}}
		        
		    */
            //var result = Homey.app.getSomething();

			var tokens = { 'lockstate': args.body.stateName };
			var state = {};

			Homey.manager('flow').triggerDevice( 'lockstate', tokens, state, device_data, function(err, result){
			    if( err ) return Homey.error(err);
			});

            // callback follows ( err, result )
            //callback( null, result );
            callback (null, true);

            // access /?foo=bar as args.query.foo
        }
    },
    
    {
        description:			'Webhook',
        method: 				'GET',
        path:					'/test/',
        requires_authorization:	false,
        fn: function( callback, args ){
	        
	        Homey.log('received test call in api.js');
            //var result = Homey.app.getSomething();

            // callback follows ( err, result )
            //callback( null, result );
            callback (null, true);

            // access /?foo=bar as args.query.foo
        }
    }
]