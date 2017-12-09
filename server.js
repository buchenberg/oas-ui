'use strict';

const Glue = require('glue');
const Path = require('path');

const manifest = {
    server: {
        port: 8000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'lib')
            }
        }
    },
    register: {
        plugins: [
            'inert',
            'vision',
            {
                plugin: require('./lib/ui'),
                routes: {
                    prefix: '/ui'
                }
            },
            {
                plugin: require('./lib/api'),
                routes: {
                    prefix: '/api'
                }
            }
        ]
    }
};

const options = {
    relativeTo: __dirname
};

const greetings = (server) => {
    console.log('**********************************************************************\n')
    console.log(`Up and running on ${server.info.uri} with the following routes.\n`);
    var routes = [], table = server.table(), settings, route;
    table.forEach(function (route) {
        console.log(`${route.method.toUpperCase()} ${route.path}`)
    });
    console.log('\n**********************************************************************')
}

const startServer = async function () {
    try {
        const server = await Glue.compose(manifest, options);
        await server.start();
        greetings(server);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();