'use client';

import { useEffect, useState } from 'react';
import { Visualization } from './visualizations/spokeAndBall';
import { Atom, Bond, Molecule } from './logical';

function MoleculeVisualizations() {
    const [diatomicHydrogen, setDiatomicHydrogen] = useState();
    const [water, setWater] = useState();

    useEffect(() => {
        function buildDiatomicHydrogen() {
            const molecule = new Molecule();
            const hydrogenA = new Atom(1, 'Hydrogen');
            const hydrogenB = new Atom(1, 'Hydrogen');
            const hToHBond = new Bond({ anchor: hydrogenA, bondAngle: 180, bondType: 'single', leaf: hydrogenB });
            molecule.addBond(hToHBond);
            setDiatomicHydrogen(molecule);
        }
        function buildWater() {

            const molecule = new Molecule();
            const oxygen = new Atom(8, 'Oxygen');
            const hydrogenA = new Atom(1, 'Hydrogen');
            const hydrogenB = new Atom(1, 'Hydrogen');

            const oToHaBond = new Bond({ anchor: oxygen, bondAngle: 217.5, bondType: 'single', leaf: hydrogenA });
            const oToHbBond = new Bond({ anchor: oxygen, bondAngle: 322.5, bondType: 'single', leaf: hydrogenB });

            molecule.addBond(oToHaBond);
            molecule.addBond(oToHbBond);

            setWater(molecule);
        }
        buildDiatomicHydrogen();
        buildWater();
    }, []);

    return <div className="p-4 border border-blue-300 rounded shadow-md flex flex-col w-full items-center">
        <div className="visualizations-container flex flex-wrap flex-row w-full items-center justify-center gap-8">
            <div className="molecule-visualization-container flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold mb-4">H<sub>2</sub>O - Water</h2>
                <Visualization id="water" molecule={water} />
            </div>
            <div className="molecule-visualization-container flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold mb-4">H<sub>2</sub> - Diatomic Hydrogen</h2>
                <Visualization id="diatomic-hydrogen" molecule={diatomicHydrogen} />
            </div>
        </div>
    </div>;
}

export { MoleculeVisualizations };