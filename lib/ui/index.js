'use strict';


exports.plugin = {
    register: async (server, options) => {

        server.route({
            method: 'GET',
            path: '/{param*}',
            config: {
                handler: {
                    directory: {
                        path: '.',
                        redirectToSlash: true,
                        index: true,
                    }
                },
                cors: {
                    origin: ['*'],
                }
            }
        });


    },
    pkg: require('./package.json'),
    once: true,
    options: {}
}

