/**
 * Based on <https://www.npmjs.com/package/mocker-data-generator>
 * See faker doc <https://marak.github.io/faker.js/>
 */
import { inspect } from 'util';
import mocker from 'mocker-data-generator';

const numberToGenerate = 10;

const medewerker = {
    id: {
        chance: 'guid'
    },
    rdf_type: {
        static: 'vph:Human'
    }
};

const overeenkomst = {
    id: {
        chance: 'guid'
    },
    medewerkerId: {
        hasOne: 'medewerkers',
        get: 'id'
    }

};

const generatedData = mocker()
        .schema('medewerkers', medewerker, numberToGenerate)
        .schema('overeenkomsten', overeenkomst, numberToGenerate)
        .buildSync();

console.log(inspect(generatedData, { depth: 10 }));