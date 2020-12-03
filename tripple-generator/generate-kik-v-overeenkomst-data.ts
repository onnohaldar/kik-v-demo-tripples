/**
 * 
 * File: generate-kik-v-overeenkomst-data.ts
 * 
 * Based on <https://www.npmjs.com/package/mocker-data-generator>
 * - faker docs: <https://marak.github.io/faker.js/>
 * - chance doc: <https://chancejs.com/>
 * - casual doc: <https://github.com/boo1ean/casual>
 */

import mocker from 'mocker-data-generator';

import { KikVMedewerkerData } from './generate-kik-v-medewerker-data';

export interface KikVOvereenkomstData {
    nodeId: string;
    rdf_type: string;
}

export function generateKikVOvereenkomstData(
    medewerkers: KikVMedewerkerData[],
    options: {
        minToGenerate: number,
        maxToGenerate: number,
        createDatePastInYears: number
    }
): KikVOvereenkomstData[] {

    const overeenkomst = {
        nodeId: {
            chance: 'guid'
        },
        rdf_type: {
            values: [
                'kik:InhuurOvereenkomst',
                'kik:ArbeidsOvereenkomstBepaaldeTijd',
                'kik:ArbeidsOvereenkomstBBL',
                'kik:ArbeidsOvereenkomstOnbepaaldeTijd',
                'kik:MinMaxContract',
                'kik:NulUrenContract',
                'kik:OproepcontractMetVoorovereenkomst',
                'kik:StageOvereenkomst',
                'kik:Uitzendovereenkomst',
                'kik:PayrollOvereenkomst',
                'kik:VrijwilligersOvereenkomst'
            ]
        },
        kik_startDatum: {
            faker: `date.past(${options.createDatePastInYears})`
        },
        kik_eindDatum: {
            function: function () {
                let eindDatum: Date;

                switch (this.object.rdf_type) {
                    case 'kik:ArbeidsOvereenkomstOnbepaaldeTijd':
                        // Overeenkomsten met onbepaalde tijd zijn al beeindigt of momenteel nog niet beeindigt
                        if (!this.faker.random.boolean) {
                            eindDatum = this.faker.date.between(this.object.kik_hasAgreement_startDatum, new Date().toISOString());
                        }
                        break;
                    default:
                        // Overige overeenkomsten zijn al beeindigt of worden 1 jaar in de toekomst ergens beeindigt
                        eindDatum = this.faker.date.between(this.object.kik_hasAgreement_startDatum, this.faker.date.future(1));
                        break;
                }

                return eindDatum;
            }
        }
    };

    
    let generatedData = mocker()
        .schema('overeenkomsten', overeenkomst, { min: options.minToGenerate, max: options.maxToGenerate  })
        .buildSync();
    

    return generatedData.medewerkers;

}