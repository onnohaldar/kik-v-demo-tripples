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

import { generateKikVMedewerkerData, KikVMedewerkerData } from './generate-kik-v-medewerker-data';

interface Options {
    medewerkersToGenerate: number;
}

interface KikVDemoData {
    medewerkers: KikVMedewerkerData[];
}

console.log(argv[2]);
const options: Options = JSON.parse(argv[2]);

let generatedData: KikVDemoData = {
    medewerkers: generateKikVMedewerkerData({ numberToGenerate: options.medewerkersToGenerate })
}



console.log('======================================================================');
console.log(inspect(generatedData, { depth: 10 }));
console.log('======================================================================');


