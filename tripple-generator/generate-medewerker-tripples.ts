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
import { inspect } from 'util';

export function generateMedewerkerTripples(): any {
    const medewerker = {
        nodeId: {
            faker: 'random.uuid'
        },
        groep: {
            values: [
                'kik:PersoneelInLoondienst',
                'kik:PersoneelNietInLoondienst',
                '-'
            ]
        },
        'object.groep=="kik:PersoneelInLoondienst",werkovereenkomst': {
            values: ['']
        },
        'object.groep=="kik:PersoneelNietInLoondienst",speed': {
            faker: 'random.number'
        }
    };

    return mocker()
        .schema('kikPersoneel', kikPersoneel, 4)
        .buildSync();
}