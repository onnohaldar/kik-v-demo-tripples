/**
 * 
 * File: generate-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { argv } from 'process';

import { generateMedewerkerData } from './generate-medewerker-data';
import { generateOvereenkomstData } from './generate-overeenkomst-data';
import { writeTtlFile } from './write-ttl-file';

interface GeneratorOptions {
    medewerkersToGenerate: number;
}

console.log(argv[2]);
const options: GeneratorOptions = JSON.parse(argv[2]);

let medewerkers =  generateMedewerkerData({ numberToGenerate: options.medewerkersToGenerate });

const overeenkomsten = generateOvereenkomstData(medewerkers, { minToGenerate: 1, maxToGenerate: 3, createDatePastInYears: 2 });

writeTtlFile(medewerkers, overeenkomsten);