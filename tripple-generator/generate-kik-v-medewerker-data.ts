/**
 * 
 * File: generate-kik-v-persoon-data.ts
 * 
 * Based on <https://www.npmjs.com/package/mocker-data-generator>
 * - faker docs: <https://marak.github.io/faker.js/>
 * - chance doc: <https://chancejs.com/>
 * - casual doc: <https://github.com/boo1ean/casual>
 */
import { inspect } from 'util';
import mocker from 'mocker-data-generator';

export function generateKikVMedewerkerData(
    options: {
        numberToGenerate: number
    }
    ): {
        nodeId: string;
        rdf_type: string;
}[] {

    const medewerker = {
        nodeId: {
            function: function() {
                return 'mwd' + this.chance.integer;
            }
        },
        rdf_type: {
            static: 'vph:Human'
        }
    };

    const generatedData = mocker()
    .schema('medewerkers', medewerker, options.numberToGenerate)
    .buildSync();

    console.log('======================================================================');
    console.log('generateKikVMedewerkerData');
    console.log('----------------------------------------------------------------------');
    console.log(inspect(generatedData, { depth: 10 }));
    console.log('======================================================================');

return generatedData.medewerkers;

}