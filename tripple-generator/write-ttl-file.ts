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

/**
 * Export generated KIK-V data as TTL-formated file
 * @param medewerkers
 * @param overeenkomsten 
 */
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
        ttlMedewerkerData += ttlIdent + 'kik:hasAgreement\n';
        let memberCount = 0;

        for (const overeenkomstNodeId of medewerker.overeenkomstNodeIds) {
            ttlMedewerkerData += ttlIdent + ttlIdent + ':' + overeenkomstNodeId
            memberCount ++;

            if (memberCount < medewerker.overeenkomstNodeIds.length) {
                ttlMedewerkerData += ',\n';
            }

        }

        ttlMedewerkerData += ' .\n\n';
    }
 
    ttlFileData += parseSection(ttlFileSectionTemplate, 'KIK-V Demo Medewerkers', ttlMedewerkerData);

    let ttlOvereenkomstData = '';

    for (const overeenkomst of overeenkomsten) {
        ttlOvereenkomstData += ':' + overeenkomst.nodeId + ' a ' + overeenkomst.rdfType + '\n';
        ttlOvereenkomstData += ttlIdent + 'kik:startDatum ' + parseXsdDate(overeenkomst.kikStartDatum);

        if (overeenkomst.kikEindDatum) {
            ttlOvereenkomstData += ';\n' + ttlIdent + 'kik:eindDatum ' + parseXsdDate(overeenkomst.kikStartDatum);
        }

        ttlOvereenkomstData += ' .\n\n';
    }

    ttlFileData += parseSection(ttlFileSectionTemplate, 'KIK-V Demo Overeenkomsten', ttlOvereenkomstData);

    writeFileSync(ttlDestFilePath, ttlFileData);    
}

function parseXsdDate(isoDateString: string) {
    return '"' + isoDateString + '"' + '^^xsd:date';
}

function parseSection(sectionTemplate: string, ttlSectionTitle: string, ttlSectionData: string) {
    return sectionTemplate
    .replace('<%= ttlSectionTitle %>', ttlSectionTitle)
    .replace('<%= ttlSectionData %>', ttlSectionData);
}