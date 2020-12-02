/**
 * 
 * File: generate-kik-v-demo-tripples.ts
 * 
 * KIK-V demo data generator
 * 
 */

import { inspect } from 'util';
//import { NamespaceManagerInstance, BlankNode, IRI, TypedLiteral, LangLiteral, NTriple, NQuad  } from 'rdflib-ts';

import { generateMedewerkerData } from './generate-kik-v-medewerker-data(dev)';

const medewerkerData = generateMedewerkerData({ numberToGenerate: 10, createDatePastInYears: 2});

console.log(inspect(medewerkerData, { depth: 10 }));
//console.log(medewerkerData[0].vph_hasRole);

//NamespaceManagerInstance.registerNamespace('kik', 'http://www.zinl.nl/ontologies/KIK-V#');
//NamespaceManagerInstance.registerNamespace('vph', 'http://www.zinl.nl/ontologies/VPH-domain-ontology#');
