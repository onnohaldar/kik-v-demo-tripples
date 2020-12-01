/**
 * 
 * File: generate-kik-v-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { inspect } from 'util';

import { generateMedewerkerTripples } from './generate-medewerker-tripples';

const zzpers = generateMedewerkerTripples();

console.log(inspect(zzpers, { depth: 10 }));

