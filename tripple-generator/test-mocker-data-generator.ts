/**
 * 
 * File: test-mocker-data-generator.ts
 * 
 * Typescript version of mocker test
 * See <https://www.npmjs.com/package/mocker-data-generator>
 * 
 */

import mocker from 'mocker-data-generator';
import { inspect } from 'util';

const user = {
    firstName: {
        faker: 'name.firstName'
    },
    lastName: {
        faker: 'name.lastName'
    },
    country: {
        faker: 'address.country'
    },
    createdAt: {
        faker: 'date.past'
    },
    username: {
        function: function() {
            return (
                this.object.lastName.substring(0, 5) +
                this.object.firstName.substring(0, 3) +
                Math.floor(Math.random() * 10)
            )
        }
    }
}
const group = {
    description: {
        faker: 'lorem.paragraph'
    },
    users: [
        {
            function: function() {
                return this.faker.random.arrayElement(this.db.user).username
            },
            length: 10,
            fixedLength: false
        }
    ]
}
const conditionalField = {
    type: {
        values: ['HOUSE', 'CAR', 'MOTORBIKE']
    },
    'object.type=="HOUSE",location': {
        faker: 'address.city'
    },
    'object.type=="CAR"||object.type=="MOTORBIKE",speed': {
        faker: 'random.number'
    }
}

const data = mocker()
    .schema('user', user, 2)
    .schema('group', group, 2)
    .schema('conditionalField', conditionalField, 2)
    .buildSync()
 
console.log(inspect(data, { depth: 10 }))