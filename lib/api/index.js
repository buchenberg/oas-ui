'use strict';
const specs = require('./specs')

exports.plugin = {
    register: async (server, options) => {
        options.baseUrl = options.baseUrl || 'oas'

        specs.forEach(function (spec) {
            let path = `/${options.baseUrl}/${spec.key}`
            let method = 'GET'
            let handler = (request, h) => {
                return spec.oas
            }
            console.log(`Creating ${spec.key} oas route.`);
            server.route({
                method,
                path,
                handler,
                config: {
                    cors: {
                        origin: ['*'],
                    },
                },
            });
        });
    },
    pkg: require('./package.json'),
    once: true,
    options: {}
}

