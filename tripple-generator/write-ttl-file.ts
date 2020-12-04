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

const ttlFileTemplateName = 'file.template.ttl';
const ttlFileSectionTemplateName = 'file-section.template.ttl';
const ttFile = 'kik-v-demo-tripples-v01.ttl';
const destFolder = 'generated-tripples';
const ttlIdent = '  ';

export function writeTtlFile(
    medewerkers: MedewerkerData[],
    overeenkomsten: OvereenkomstData[]
) {
    const ttlFileTemplatePath = join(__dirname, ttlFileTemplateName);
    const ttlFileTemplate = readFileSync(ttlFileTemplatePath, 'utf-8');
    const ttlFileSectionTemplatePath = join(__dirname, ttlFileSectionTemplateName);
    const ttlFileSectionTemplate = readFileSync(ttlFileSectionTemplatePath, 'utf-8');
    
    const destPath = resolve(__dirname, '..', destFolder);
    const ttlDestFilePath = join(destPath, ttFile);
    
    let ttlFileData = ttlFileTemplate
        .replace('<%= ttlFile %>', ttFile)
        .replace('<%= author %>', '<https://github.com/onnohaldar/kik-v-demo-tripples>')
        .replace('<%= creationDate %>', new Date().toUTCString())
        .replace('<%= status %>', 'initiele versie ter evaluatie Marc Nieuwland');

    let ttlMedewerkerData = '';
    for (const medewerker of medewerkers) {
        ttlMedewerkerData += ':' + medewerker.nodeId + ' a ' + medewerker.rdfType + '\n';

        let kikHasAgreement = '';
        for (const overeenkomstNodeId of medewerker.overeenkomstNodeIds) {
            kikHasAgreement +=  ttlIdent + ttlIdent + ':' + overeenkomstNodeId + ',\n';
        }


        ttlMedewerkerData += '.\n\n';
    }
    ttlFileData += ttlFileSectionTemplate
        .replace('<%= ttlFileSection %>', 'KIK-V Demo Medewerkers')
        .replace('<%= ttlSectionData %>', ttlMedewerkerData);


    writeFileSync(ttlDestFilePath, ttlFileData);    
}