/**
 * 
 * File: generate-overeenkomst-data.ts
 * 
 * Based on <https://www.npmjs.com/package/mocker-data-generator>
 * - faker docs: <https://marak.github.io/faker.js/>
 * - chance doc: <https://chancejs.com/>
 * - casual doc: <https://github.com/boo1ean/casual>
 */

import mocker from 'mocker-data-generator';

import { MedewerkerData } from './medewerker-data';
import {  OvereenkomstData } from './overeenkomst-data';

/**
 * 
 * Genereren van aan de medewerkers gekoppelde overeenkomsten
 * 
 * @param medewerkers referentie naar medewerkers waar overeenkomsten aan moeten worden gekoppeld
 * 
 * @param options generatie opties
 * 
 * @returns gekoppeldeOvereenkomsten
 */
export function generateOvereenkomstData(
    medewerkers: MedewerkerData[],
    options: {
        minToGenerate: number,
        maxToGenerate: number,
        createDatePastInYears: number
    }
): OvereenkomstData[] {

    const overeenkomst = {
        nodeId: {
            chance: 'guid'
        },
        // generatie op basis van onderstaande overeenkomst-klassen
        rdfType: {
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
        kikStartDatum: {
            faker: `date.past(${options.createDatePastInYears})`
        },
        kikEindDatum: {
            function: function () {
                let eindDatum: Date;

                switch (this.object.rdfType) {
                    case 'kik:ArbeidsOvereenkomstOnbepaaldeTijd':
                        // Overeenkomsten met onbepaalde tijd zijn al beeindigt of momenteel nog niet beeindigt
                        if (!this.faker.random.boolean) {
                            eindDatum = this.faker.date.between(this.object.kikStartDatum, new Date().toISOString());
                        }
                        break;
                    default:
                        // Overige overeenkomsten zijn al beeindigt of worden 1 jaar in de toekomst ergens beeindigt
                        eindDatum = this.faker.date.between(this.object.kikStartDatum, this.faker.date.future(1));
                        break;
                }

                return eindDatum;
            }
        }
    };
    
    /**
     * Genereer:
     * - minimaal het minimaal aantal overeenkomsten per medewerker
     * - maximaal het maximaal aantal overeenkomsten per medewerker
     */
    const generatedData = mocker()
        .schema('overeenkomsten', overeenkomst, {
            min: options.minToGenerate * medewerkers.length, 
            max: options.maxToGenerate * medewerkers.length
        })
        .buildSync();

    /**
     * Koppel aan elke medewerker 1 of meerdere overeenkomsten
     */
    const overeenkomsten: OvereenkomstData[] = generatedData.overeenkomsten;
    let overeenkomstIndex = 0;
    let gekoppeldeOvereenkomsten: OvereenkomstData[] = [];

    /**
     * Koppel aan elke medewerker een initiele overeenkomst
     */
    for (let medewerker of medewerkers) {

        if (!medewerker.overeenkomstNodeIds) {
            medewerker.overeenkomstNodeIds = [];
        }
        
        medewerker.overeenkomstNodeIds.push(overeenkomsten[overeenkomstIndex].nodeId);
        gekoppeldeOvereenkomsten.push(overeenkomsten[overeenkomstIndex]);
        overeenkomstIndex ++;
    }

    /**
     * Koppel overige overeenkomsten aan een medewerker (waar mogelijk) 
     */
    const overigeOvereenkomsten = overeenkomsten.slice(overeenkomstIndex);

    for (const overeenkomst of overigeOvereenkomsten) {
        /**
         * Koppel alleen nieuwe overkomsten aan medewerkers waaraan nog niet het maximaal 
         * aantal overeenkomsten zijn gekoppeld
         */
        let medewerkersLtMaxOvk = medewerkers.filter(medewerker => medewerker.overeenkomstNodeIds.length < options.maxToGenerate);
        let statusGekoppeld = false;

        for (let medewerker of medewerkersLtMaxOvk) {
            if (!statusGekoppeld) {
                /**
                 * TO-DO: 
                 * - flow voor overgangen tussen overeenkomsten met transitie-tabel etc....
                 * - aansluiting van datums tussen meerdere overeenkomsten per medewerker
                 */
                medewerker.overeenkomstNodeIds.push(overeenkomst.nodeId);
                gekoppeldeOvereenkomsten.push(overeenkomst);
            }
        }
    }

    return gekoppeldeOvereenkomsten;
}