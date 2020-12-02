/**
 * 
 * File: generate-kik-v-medewerker-data.ts
 * 
 * KIK-V demo data generator to create employees (with initial agreement)
 * 
 * Based on <https://www.npmjs.com/package/mocker-data-generator>
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
    const medewerkerGenerateSchema = {
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
                'kik:StageOvereenkomst',
                'kik:Uitzendovereenkomst',
                'kik:PayrollOvereenkomst',
                'kik:VrijwilligersOvereenkomst'            
            ]
        },
        /*
        'object.kik_hasAgreement=="kik:InhuurOvereenkomst",vph_hasRole': {
            static: 'vph:Freelancer'
        },
        'object.kik_hasAgreement=="kik:ArbeidsOvereenkomstBepaaldeTijd",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_hasAgreement=="kik:ArbeidsOvereenkomstBBL",vph_hasRole': {
            static: 'vph:Apprentice'
        },
        'object.kik_hasAgreement=="kik:ArbeidsOvereenkomstOnbepaaldeTijd",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_hasAgreement=="kik:MinMaxContract",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_hasAgreement=="kik:NulUrenContract",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_hasAgreement=="kik:OproepcontractMetVoorovereenkomst",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_hasAgreement=="kik:StageOvereenkomst",vph_hasRole': {
            static: 'vph:Trainee'
        },
        'object.kik_hasAgreement=="kik:Uitzendovereenkomst",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_hasAgreement=="kik:PayrollOvereenkomst",vph_hasRole': {
            static: 'vph:Employee'
        },
        'object.kik_hasAgreement=="kik:VrijwilligersOvereenkomst",vph_hasRole': {
            static: 'vph:Volunteer'
        },
        */
        vph_hasRole: {
            function: function() {
                let hasRole = undefined;

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
        kik_hasAgreement_startDatum: {
            faker: `date.past(${options.createDatePastInYears})`
        },
        kik_hasAgreement_eindDatum: {
            function: function() {
                return new Date().toISOString();
            } 
        },

    };

    const generatedData = mocker()
        .schema('medewerkerData', medewerkerGenerateSchema, options.numberToGenerate)
        .buildSync();

    return generatedData.medewerkerData;
}
