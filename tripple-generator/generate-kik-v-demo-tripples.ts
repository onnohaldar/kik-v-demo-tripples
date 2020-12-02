/**
 * 
 * File: generate-kik-v-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { inspect } from 'util';

import { generateMedewerkerData } from './generate-kik-v-medewerker-data';

const medewerkerData = generateMedewerkerData(10);

console.log(inspect(medewerkerData, { depth: 10 }));
console.log(medewerkerData[0].vph_hasRole);

