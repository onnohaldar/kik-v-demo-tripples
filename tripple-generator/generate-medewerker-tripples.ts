/**
 * 
 * File: generate-zzper-tripples.ts
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

export function generateMedewerkerTripples(): any {
    const medewerker = {
        nodeId: {
            faker: 'random.uuid'
        },
        rdf_type: {
            static: 'vph:Human'
        },
        kik_hasAgreement: {
            values: [
                'kik:InhuurOvereenkomst',
                'kik:ArbeidsOvereenkomstBepaaldeTijd',
                'kik:ArbeidsOvereenkomstBBL',
                'kik:ArbeidsOvereenkomstOnbepaaldeTijd',
                'kik:MinMaxContract',
                'kik:NulUrenContract',
                'kik:OproepcontractMetVoorovereenkomst',
                'kik:Uitzendovereenkomst',
                'kik:PayrollOvereenkomst'
                
            ]
        },
        'object.kik_hasAgreement=="kik:InhuurOvereenkomst",vph_hasRole': {
            static: 'vph:Freelancer'
        },
        'object.kik_hasAgreement=="kik:ArbeidsOvereenkomstBepaaldeTijd",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_hasAgreement=="kik:ArbeidsOvereenkomstOnbepaaldeTijd",vph_hasRole': {
            static: 'vph:Employee'
        }

    };

    return mocker()
        .schema('medewerker', medewerker, 4)
        .buildSync();
}