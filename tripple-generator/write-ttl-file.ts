/**
 * 
 * File: write-kik-v-tripples-file.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
//import { NamespaceManagerInstance, BlankNode, IRI, TypedLiteral, LangLiteral, NTriple, NQuad  } from 'rdflib-ts';

import { KikVMedewerkerData } from './medewerker-data';
import { KikVOvereenkomstData } from './overeenkomst-data';

export function writeKikVTtlFile(
    medewerkers: KikVMedewerkerData[],
    overeenkomsten: KikVOvereenkomstData[]
) {
    const tripplesTemplateFile = join(__dirname, 'tripples-file.template.ttl');
    const tripplesTemplate = readFileSync(tripplesTemplateFile, 'utf-8');
    
    const destPath = resolve(__dirname, '..', 'generated-tripples');
    const turtleFile = join(destPath, 'kik-v-demo-tripples-v01.ttl');
    
    let turtleData = tripplesTemplate;

    console.log(turtleData);
    
}