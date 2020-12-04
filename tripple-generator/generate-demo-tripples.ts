/**
 * 
 * File: generate-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */


import { inspect } from 'util';
import { argv } from 'process';

import { generateMedewerkerData } from './generate-medewerker-data';
import { generateOvereenkomstData } from './generate-kik-v-overeenkomst-data';
import { writeKikVTtlFile } from './write-ttl-file';

interface GeneratorOptions {
    medewerkersToGenerate: number;
}

console.log(argv[2]);
const options: GeneratorOptions = JSON.parse(argv[2]);

let medewerkers =  generateKikVMedewerkerData({ numberToGenerate: options.medewerkersToGenerate });

const overeenkomsten = generateKikVOvereenkomstData(medewerkers, { minToGenerate: 1, maxToGenerate: 3, createDatePastInYears: 2 });

writeKikVTtlFile(medewerkers, overeenkomsten);