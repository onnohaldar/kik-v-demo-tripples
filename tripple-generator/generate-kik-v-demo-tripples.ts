/**
 * 
 * File: generate-kik-v-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { inspect } from 'util';
import { argv } from 'process';
//import { NamespaceManagerInstance, BlankNode, IRI, TypedLiteral, LangLiteral, NTriple, NQuad  } from 'rdflib-ts';

import { generateKikVMedewerkerData } from './generate-kik-v-medewerker-data';
import { generateKikVOvereenkomstData, KikVOvereenkomstData } from './generate-kik-v-overeenkomst-data';

interface GeneratorOptions {
    medewerkersToGenerate: number;
}

console.log(argv[2]);
const options: GeneratorOptions = JSON.parse(argv[2]);

let medewerkers =  generateKikVMedewerkerData({ numberToGenerate: options.medewerkersToGenerate });

const overeenkomsten = generateKikVOvereenkomstData(medewerkers, { minToGenerate: 1, maxToGenerate: 3, createDatePastInYears: 2 });


const turtleTemplateFile = join(__dirname, 'kik-v-demo-tripples.template.ttl');
const turtleTemplate = readFileSync(turtleTemplateFile, 'utf-8');

const destPath = resolve(__dirname, '..', 'generated-tripples');
const turtleFile = join(destPath, 'kik-v-demo-tripples-v01.ttl');

