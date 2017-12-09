'use strict';

module.exports = [
    {
        "title": "Pets",
        "specs": [
            {
                "title": "Petstore API",
                "key": "petstore",
                "oas": require('./petstore.json')
            }
        ]
    },
    {
        "title": "Ubers",
        "specs": [
            {
                "title": "Uber API",
                "key": "uber",
                "oas": require('./uber.json')
            }
        ]
    }

]