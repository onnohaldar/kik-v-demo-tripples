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

import { MedewerkerData } from './medewerker-data';
import { OvereenkomstData } from './overeenkomst-data';

const ttlTemplateFile = 'file.template.ttl';
const ttFile = 'kik-v-demo-tripples-v01.ttl';

export function writeKikVTtlFile(
    medewerkers: MedewerkerData[],
    overeenkomsten: OvereenkomstData[]
) {
    const ttlTemplateFilePath = join(__dirname, ttlTemplateFile);
    const ttlTemplate = readFileSync(ttlTemplateFilePath, 'utf-8');
    
    const destPath = resolve(__dirname, '..', 'generated-tripples');
    const ttlDestFilePath = join(destPath, ttFile);
    
    let ttlFileData = ttlTemplate.replace('<%= ttlFile %>', ttFile);

    console.log(ttlFileData);
    
}