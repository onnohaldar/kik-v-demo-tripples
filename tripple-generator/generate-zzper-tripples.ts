/**
 * 
 * File: generate-zzper-tripples.ts
 * 
 * KIK-V demo data generator for demo tripels
 * 
 * Inhuurovereenkomst -> ZZPer -> Personeel niet in dienst
 * 
 */
import mocker from 'mocker-data-generator';
import { inspect } from 'util';

export function generateZZPerTripples(): any {
    const kikPersoneel = {
        nodeId: {
            faker: 'random.uuid'
        },
        nodeValues: [ 
            {
                static: {
                    predicate: 'a',
                    object: 'vph:Human'
                }
            }
        ]
    };

    return mocker()
        .schema('kikPersoneel', kikPersoneel, 4)
        .buildSync();
}