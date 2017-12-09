'use strict';
const Index = require('./specs')

exports.plugin = {
    register: async (server, options) => {
        options.baseUrl = options.baseUrl || '/oas'

        let path = `${options.baseUrl}`
        let method = 'GET'
        let handler = (request, h) => {
            return Index.map(function (spec) {
                return {
                    "title": spec.title,
                    "specs": spec.specs.map(function (oas) {
                        return {
                            "title": oas.title,
                            "path": `${options.baseUrl}/${oas.key}`
                        }
                    })
                }
            })
        }
        console.log(`Creating ${path} route.`);
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



        Index.forEach(function (group) {
            group.specs.forEach(function (spec) {
                let path = `${options.baseUrl}/${spec.key}`
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
            })
        });
    },
    pkg: require('./package.json'),
    once: true,
    options: {}
}

