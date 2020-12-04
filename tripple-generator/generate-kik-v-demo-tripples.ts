/**
 * 
 * File: generate-kik-v-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */


import { inspect } from 'util';
import { argv } from 'process';

import { generateKikVMedewerkerData } from './generate-kik-v-medewerker-data';
import { generateKikVOvereenkomstData } from './generate-kik-v-overeenkomst-data';
import { writeKikVTripplesFile } from './write-kik-v-tripples-file';

interface GeneratorOptions {
    medewerkersToGenerate: number;
}

console.log(argv[2]);
const options: GeneratorOptions = JSON.parse(argv[2]);

let medewerkers =  generateKikVMedewerkerData({ numberToGenerate: options.medewerkersToGenerate });

const overeenkomsten = generateKikVOvereenkomstData(medewerkers, { minToGenerate: 1, maxToGenerate: 3, createDatePastInYears: 2 });

writeKikVTripplesFile(medewerkers, overeenkomsten);