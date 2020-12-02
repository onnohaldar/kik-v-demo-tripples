
import { inspect } from 'util';
import mocker from 'mocker-data-generator';

const medewerker = {
    nodeId: {
            faker: 'random.uuid'
    },
    rdf_type: {
        static: 'vph:Human'
    }
};

const overeenkomst = {

}

const generatedData = mocker()
        .schema('medewerkers', medewerker, 10)
        .schema('overeenkomsten', overeenkomst, 2)
        .buildSync();

console.log(inspect(generatedData, { depth: 10 }));