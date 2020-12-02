/**
 * 
 * File: generate-kik-v-medewerker-data.ts
 * 
 * KIK-V demo data generator to create employees with initial agreement
 * 
 * Based on <https://www.npmjs.com/package/mocker-data-generator>
 * 
 * 
 * Soort overeenkomst                                  Bijbehorende rol            Groep
 * ------------------------------------------------------------------------------------------------------------
 * 
 * kik_WerkOvereenkomst                                vph_hasRole                  -
 * │                                                   │
 * ├── kik:InhuurOvereenkomst                          ├── vph:Freelancer          Personeel niet in loondienst
 * │                                                   │
 * ├── kik:ArbeidsOvereenkomstBepaaldeTijd             ├── vph:Employee               Personeel in loondienst                        
 * │   ├── kik:ArbeidsOvereenkomstBepaaldeTijd         │   │
 * │   │   └── kik:ArbeidsOvereenkomstBBL              │   └── Leerling-Werknemer
 * │   └── kik:ArbeidsOvereenkomstOnbepaaldeTijd       │
 * │                                                   │
 * ├── kik:OproepOvereenkomst                          ├── vph:Employee               Personeel in loondienst
 * │   ├── kik:MinMaxContract                          │
 * │   ├── kik:NulUrenContract                         │
 * │   └── kik:OproepcontractMetVoorovereenkomst       │
 * │                                                   │
 * ├── Stageovereenkomst                               ├── Stagiair                -
 * │                                                   │
 * ├── Uitzendovereenkomst                             Medewerker                  Personeel niet in loondienst
 * │   └── Payrollovereenkomst                         │
 * │                                                   │
 * └── Vrijwilligersovereenkomst                       └── Vrijwilliger            -
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
        kik_WerkOvereenkomst: string;
        vph_hasRole: string;
        kik_WerkOvereenkomst_startDatum: string;
        kikkik_WerkOvereenkomst_eindDatum?: string;
}[] {
    const medewerkerGenerateSchema = {
        nodeId: {
            faker: 'random.uuid'
        },
        rdf_type: {
            static: 'vph:Human'
        },
        kik_WerkOvereenkomst: {
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
        'object.kik_WerkOvereenkomst=="kik:InhuurOvereenkomst",vph_hasRole': {
            static: 'vph:Freelancer'
        },
        'object.kik_WerkOvereenkomst=="kik:ArbeidsOvereenkomstBepaaldeTijd",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_WerkOvereenkomst=="kik:ArbeidsOvereenkomstBBL",vph_hasRole': {
            static: 'vph:Apprentice'
        },
        'object.kik_WerkOvereenkomst=="kik:ArbeidsOvereenkomstOnbepaaldeTijd",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_WerkOvereenkomst=="kik:MinMaxContract",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_WerkOvereenkomst=="kik:NulUrenContract",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_WerkOvereenkomst=="kik:OproepcontractMetVoorovereenkomst",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_WerkOvereenkomst=="kik:StageOvereenkomst",vph_hasRole': {
            static: 'vph:Trainee'
        },
        'object.kik_WerkOvereenkomst=="kik:Uitzendovereenkomst",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_WerkOvereenkomst=="kik:PayrollOvereenkomst",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_WerkOvereenkomst=="kik:VrijwilligersOvereenkomst",vph_hasRole': {
            static: 'vph:Volunteer'
        },
        kik_WerkOvereenkomst_startDatum: {
            faker: `date.past(${options.createDatePastInYears})`
        },
        'object.vph_hasRole=="vph:Freelancer",kik_WerkOvereenkomst_eindDatum': {
            faker: 'date.future(1)'
        }
    };

    const generatedData = mocker()
        .schema('medewerkerData', medewerkerGenerateSchema, options.numberToGenerate)
        .buildSync();

    return generatedData.medewerkerData;
}