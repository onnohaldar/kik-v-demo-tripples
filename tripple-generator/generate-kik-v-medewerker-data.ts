/**
 * 
 * File: generate-kik-v-medewerker-data.ts
 * 
 * KIK-V demo data generator to create employees (with initial agreement)
 * 
 * Based on <https://www.npmjs.com/package/mocker-data-generator>
 * See faker doc <https://marak.github.io/faker.js/>
 * 
 * 
 * Soort overeenkomst                                  Bijbehorende rol         Groep
 * ------------------------------------------------------------------------------------------------------------
 * 
 * kik_hasAgreement                                    vph_hasRole              kik_hasMember   
 * │                                                   │                        |
 * ├── kik:InhuurOvereenkomst                          ├── vph:Freelancer       ├─ kik:PersoneelNietInLoondienst
 * │                                                   │                        |
 * ├── kik:ArbeidsOvereenkomstBepaaldeTijd             ├── vph:Employee         ├─ kik:PersoneelInLoondienst                        
 * │   ├── kik:ArbeidsOvereenkomstBepaaldeTijd         │   │                    |
 * │   │   └── kik:ArbeidsOvereenkomstBBL              │   └── vph:Apprentice   |
 * │   └── kik:ArbeidsOvereenkomstOnbepaaldeTijd       │                        |
 * │                                                   │                        |
 * ├── kik:OproepOvereenkomst                          ├── vph:Employee         ├─ kik:PersoneelInLoondienst
 * │   ├── kik:MinMaxContract                          │                        |
 * │   ├── kik:NulUrenContract                         │                        |
 * │   └── kik:OproepcontractMetVoorovereenkomst       │                        |
 * │                                                   │                        |
 * ├── kik:StageOvereenkomst                           ├── vph:Trainee          ├─ (membership is undefined)
 * │                                                   │                        |
 * ├── kik:Uitzendovereenkomst                         ├── vph:Employee         ├─ kik:PersoneelNietInLoondienst
 * │   └── kik:PayrollOvereenkomst                     │                        |
 * │                                                   │                        |
 * └── kik:VrijwilligersOvereenkomst                   └── vph:Volunteer        └- (membership is undefined)
 * 
 */
 
import mocker from 'mocker-data-generator';

export function generateMedewerkerData(
    options: {
        numberToGenerate: number,
        createDatePastInYears: number
    }
    ): {
        nodeId: string;
        rdf_type: string;
        kik_hasAgreement: string;
        vph_hasRole: string;
        kik_hasAgreement_startDatum: string;
        kik_hasAgreement_eindDatum?: string;
}[] {

    const medewerker = {
        nodeId: {
            faker: 'random.uuid'
        },
        rdf_type: {
            static: 'vph:Human'
        }
    };

    const overeenkomst = {
        kik_hasAgreement: {
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
        kik_hasAgreement_startDatum: {
            faker: `date.past(${options.createDatePastInYears})`
        },
        kik_hasAgreement_eindDatum: {
            function: function() {
                let eindDatum: Date;

                switch (this.object.kik_hasAgreement) {
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

    const bijbeorendeRol = {
        vph_hasRole: {
            function: function() {
                let hasRole: string;

                switch (this.object.kik_hasAgreement) {
                    case 'kik:InhuurOvereenkomst':
                        hasRole = 'vph:Freelancer';
                        break;
                    case 'kik:ArbeidsOvereenkomstBBL':
                        hasRole = 'vph:Apprentice';
                        break;
                    case 'kik:StageOvereenkomst':
                        hasRole = 'vph:Trainee';
                        break;
                    case 'kik:VrijwilligersOvereenkomst':
                        hasRole = 'vph:Volunteer';
                        break;
                    default:
                        hasRole = 'vph:Employee'
                        break;
                }

                return hasRole;
            }
        },

    };

    const generatedData = mocker()
        .schema('medewerkers', medewerker, options.numberToGenerate)
        .schema('overeenkomsten', overeenkomst, options.numberToGenerate)
        .buildSync();

    return generatedData.medewerkerData;
}
