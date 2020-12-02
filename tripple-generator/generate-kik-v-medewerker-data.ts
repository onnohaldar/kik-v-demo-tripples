/**
 * 
 * File: generate-kik-v-medewerker-data.ts
 * 
 * KIK-V demo data generator for demo tripels
 * 
 * 
 * Soort overeenkomst                                  Bijbehorende rol            Groep
 * ------------------------------------------------------------------------------------------------------------
 * 
 * Werkovereenkomst                                    Medewerker                  -
 * │                                                   │
 * ├── Inhuurovereenkomst                              ├── ZZPer                   Personeel niet in loondienst
 * │                                                   │
 * ├── Arbeidsovereenkomst                             ├── Werknemer               Personeel in loondienst                        
 * │   ├── Arbeidsovereenkomst bepaalde tijd           │   │
 * │   │   └── Arbeidsovereenkomst BBL                 │   └── Leerling-Werknemer
 * │   └── Arbeidsovereenkomst onbepaalde tijd         │
 * │                                                   │
 * ├── Oproepovereenkomst                              ├── Werknemer               Personeel in loondienst
 * │   ├── Min-max contract                            │
 * │   ├── Nuluren contract                            │
 * │   └── Oproepovereenkomst met voorovereenkomst     │
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

export function generateMedewerkerData(numberToGenerate: number): {
    nodeId: string;
    rdf_type: string;
    kik_WerkOvereenkomst: string;
    vph_hasRole: string;
    kik_WerkOvereenkomst_startDatum: string;
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
            faker: 'date.past(' + 2 + ')'
        }
    };

    const generatedData = mocker()
        .schema('medewerkerData', medewerkerGenerateSchema, numberToGenerate)
        .buildSync();

    return generatedData.medewerkerData;
}