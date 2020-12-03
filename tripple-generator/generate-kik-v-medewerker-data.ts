/**
 * 
 * File: generate-kik-v-persoon-data.ts
 * 
 * Based on <https://www.npmjs.com/package/mocker-data-generator>
 * - faker docs: <https://marak.github.io/faker.js/>
 * - chance doc: <https://chancejs.com/>
 * - casual doc: <https://github.com/boo1ean/casual>
 */

import mocker from 'mocker-data-generator';

export interface KikVMedewerkerData {
    nodeId: string;
    rdf_type: string;
}

export function generateKikVMedewerkerData(
    options: {
        numberToGenerate: number
    }
    ): KikVMedewerkerData[] {

    const medewerker = {
        nodeId: {
            chance: 'guid'
        },
        rdf_type: {
            static: 'vph:Human'
        }
    };

    const generatedData = mocker()
    .schema('medewerkers', medewerker, options.numberToGenerate)
    .buildSync();

return generatedData.medewerkers;

}