/**
 * 
 * File: generate-kik-v-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { inspect } from 'util';
import { argv } from 'process';
//import { NamespaceManagerInstance, BlankNode, IRI, TypedLiteral, LangLiteral, NTriple, NQuad  } from 'rdflib-ts';

import { generateKikVMedewerkerData } from './generate-kik-v-medewerker-data';
import { generateKikVOvereenkomstData, KikVOvereenkomstData } from './generate-kik-v-overeenkomst-data';

interface Options {
    medewerkersToGenerate: number;
}

console.log(argv[2]);
const options: Options = JSON.parse(argv[2]);

let medewerkers =  generateKikVMedewerkerData({ numberToGenerate: options.medewerkersToGenerate });
console.log('======================================================================');
console.log(inspect(medewerkers, { depth: 10 }));
console.log('======================================================================');

const overeenkomsten = generateKikVOvereenkomstData(medewerkers, { minToGenerate: 1, maxToGenerate: 3, createDatePastInYears: 2 });
console.log('======================================================================');
console.log(inspect(overeenkomsten, { depth: 10 }));
console.log('======================================================================');
