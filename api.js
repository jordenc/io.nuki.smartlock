module.exports = [

    {
        description:			'Webhook',
        method: 				'POST',
        path:					'/webhook/',
        requires_authorization:	false,
        fn: function( callback, args ){
	        
	        Homey.log('received webhook call in api.js');
            //var result = Homey.app.getSomething();

            // callback follows ( err, result )
            callback( null, result );

            // access /?foo=bar as args.query.foo
        }
    }
]