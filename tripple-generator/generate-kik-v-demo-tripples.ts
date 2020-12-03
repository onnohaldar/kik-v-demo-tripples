/**
 * 
 * File: generate-kik-v-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { inspect } from 'util';
//import { NamespaceManagerInstance, BlankNode, IRI, TypedLiteral, LangLiteral, NTriple, NQuad  } from 'rdflib-ts';

import { generateKikVMedewerkerData, KikVMedewerkerData } from './generate-kik-v-medewerker-data';

interface KikVDemoData {
    medewerkers: KikVMedewerkerData[];
}

let generatedData: KikVDemoData = {
    medewerkers: generateKikVMedewerkerData({ numberToGenerate: 10 })
}

console.log('======================================================================');
console.log(inspect(generatedData, { depth: 10 }));
console.log('======================================================================');


