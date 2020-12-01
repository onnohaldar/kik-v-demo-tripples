/**
 * 
 * File: generate-kik-v-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { inspect } from 'util';

import { generateMedewerkerTripples } from './generate-medewerker-tripples';

const medewerkers = generateMedewerkerTripples(10);

console.log(inspect(medewerkers, { depth: 10 }));

