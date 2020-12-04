# kik-v-demo-tripples
KIK-V demo tripple generatie tooling ten behoeve van het pre-testen van SparQL-scripts voor indicatoeren. Initiele versie om te onderzoeken welke mogelijkhden er zijn om mock-data te genereren voor de verdere ontwikkeling.

## Installatie

Clone de repo lokaal
```
git clone https://github.com/onnohaldar/kik-v-demo-tripples.git
```

Ga naar directorie
````
cd kik-v-demo-tripples
````

Installeer NPM packages
````
npm install
````

## Genereren tripples

Momenteel is er een initieel script dat Medewerkers en Overeenkomsten genereerd. Overige en meer configuratie-opties volgen.

Het huidige script voor de generatie van 20 medewerkers kan eenvoudig worden gestart via NPM
````
npm start
````

Voor generatie van meer dan 20 Medewerkers kan als volgt via NPX worden gestart
````
npx ts-node -P ./tsconfig.json tripple-generator/generate-demo-tripples.ts '{ "medewerkersToGenerate": 50 }'
````

De uitvoer staat in de "generated tripples" directorie onder de naam "kik-v-demo-tripples-v01.ttl".

Zie ook voorbeeld <https://github.com/onnohaldar/kik-v-demo-tripples/blob/main/generated-tripples/kik-v-demo-tripples-v01.ttl>

