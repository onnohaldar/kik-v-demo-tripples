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
        medewerkerId: {
            faker: 'random.uuid'
        },
        kik_hasAgreement: {
            values: [
                'InhuurOvereenkomst',
                'ArbeidsOvereenkomstBepaaldeTijd',
                'ArbeidsOvereenkomstBBL',
                'ArbeidsOvereenkomstOnbepaaldeTijd',
                'MinMaxContract',
                'NulUrenContract',
                'OproepcontractMetVoorovereenkomst',
                'Uitzendovereenkomst',
                'PayrollOvereenkomst'
                
            ]
        },
        'object.kik_hasAgreement=="InhuurOvereenkomst",hasRole': {
            static: 'ZZPer'
        },
        'object.kik_hasAgreement=="ArbeidsOvereenkomstBepaaldeTijd",hasRole': {
            static: 'Werknemer'
        },
        'object.kik_hasAgreement=="ArbeidsOvereenkomstOnbepaaldeTijd",hasRole': {
            static: 'Werknemer'
        }

    };

    return mocker()
        .schema('medewerker', medewerker, 4)
        .buildSync();
}