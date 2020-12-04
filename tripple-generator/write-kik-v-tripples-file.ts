/**
 * 
 * File: write-kik-v-tripples-file.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

import { KikVMedewerkerData } from './kik-v-medewerker-data';
import { KikVOvereenkomstData } from './kik-v-overeenkomst-data';

export function writeKikVTripplesFile(
    medewerkers: KikVMedewerkerData[],
    overeenkomsten: KikVOvereenkomstData[]
) {
    const turtleTemplateFile = join(__dirname, 'kik-v-demo-tripples.template.ttl');
    const turtleTemplate = readFileSync(turtleTemplateFile, 'utf-8');
    
    const destPath = resolve(__dirname, '..', 'generated-tripples');
    const turtleFile = join(destPath, 'kik-v-demo-tripples-v01.ttl');
    
        
}