'use strict';


exports.plugin = {
    register: async (server, options) => {
        options.cors = {
            origin: ['*'],
        }


    },
    pkg: require('./package.json'),
    once: true,
    options: {}
}

