'use client';

import { useEffect, useState } from 'react';
import { Visualization } from './visualizations/spokeAndBall';
import { Atom, Bond, Molecule } from './logical';
import { AtomFactory } from './atomFactory';


function MoleculeVisualizations() {
    const [ammonia, setAmmonia] = useState();
    const [diatomicHydrogen, setDiatomicHydrogen] = useState();
    const [methane, setMethane] = useState();
    const [ozone, setOzone] = useState();
    const [water, setWater] = useState();

    useEffect(() => {
        const atomFactory = new AtomFactory();
        function buildAmmonia() {
            const molecule = new Molecule();
            const nitrogen = atomFactory.nitrogen();
            const hydrogenA = atomFactory.hydrogen();
            const hydrogenB = atomFactory.hydrogen();
            const hydrogenC = atomFactory.hydrogen();

            const nToHaBond = new Bond({ anchor: nitrogen, bondAngle: { z: -45, y: 0 }, bondType: 'single', leaf: hydrogenA });
            const nToHbBond = new Bond({ anchor: nitrogen, bondAngle: { z: -45, y: 107 }, bondType: 'single', leaf: hydrogenB });
            const nToHcBond = new Bond({ anchor: nitrogen, bondAngle: { z: -45, y: 233.5 }, bondType: 'single', leaf: hydrogenC });

            molecule.addBond(nToHaBond);
            molecule.addBond(nToHbBond);
            molecule.addBond(nToHcBond);

            setAmmonia(molecule);
        }
        function buildDiatomicHydrogen() {
            const molecule = new Molecule();
            const hydrogenA = atomFactory.hydrogen();
            const hydrogenB = atomFactory.hydrogen();
            const hToHBond = new Bond({ anchor: hydrogenA, bondAngle: { z: 180 }, bondType: 'single', leaf: hydrogenB });
            molecule.addBond(hToHBond);
            setDiatomicHydrogen(molecule);
        }
        function buildMethane() {
            const molecule = new Molecule();
            const carbon = atomFactory.carbon();
            const hydrogenA = atomFactory.hydrogen();
            const hydrogenB = atomFactory.hydrogen();
            const hydrogenC = atomFactory.hydrogen();
            const hydrogenD = atomFactory.hydrogen();

            const nToHaBond = new Bond({ anchor: carbon, bondAngle: {}, bondType: 'single', leaf: hydrogenA });
            const nToHbBond = new Bond({ anchor: carbon, bondAngle: { z: 109 }, bondType: 'single', leaf: hydrogenB });
            const nToHcBond = new Bond({ anchor: carbon, bondAngle: { x: -109, z: 109 }, bondType: 'single', leaf: hydrogenC });
            const nToHdBond = new Bond({ anchor: carbon, bondAngle: { x: 109, z: 109 }, bondType: 'single', leaf: hydrogenD });

            molecule.addBond(nToHaBond);
            molecule.addBond(nToHbBond);
            molecule.addBond(nToHcBond);
            molecule.addBond(nToHdBond);

            setMethane(molecule);
        }
        function buildOzone() {

            const molecule = new Molecule();
            const oxygenAnchor = atomFactory.oxygen();
            const oxygenLeafA = atomFactory.oxygen();
            const oxygenLeafB = atomFactory.oxygen();

            const anchorToABond = new Bond({ anchor: oxygenAnchor, bondAngle: {}, bondType: 'single', leaf: oxygenLeafA });
            const anchorToBBond = new Bond({ anchor: oxygenAnchor, bondAngle: { z: 116.8 }, bondType: 'single', leaf: oxygenLeafB });

            molecule.addBond(anchorToABond);
            molecule.addBond(anchorToBBond);

            setOzone(molecule);
        }
        function buildWater() {

            const molecule = new Molecule();
            const oxygen = atomFactory.oxygen();
            const hydrogenA = atomFactory.hydrogen();
            const hydrogenB = atomFactory.hydrogen();

            const oToHaBond = new Bond({ anchor: oxygen, bondAngle: { z: 217.5 }, bondType: 'single', leaf: hydrogenA });
            const oToHbBond = new Bond({ anchor: oxygen, bondAngle: { z: 322.5 }, bondType: 'single', leaf: hydrogenB });

            molecule.addBond(oToHaBond);
            molecule.addBond(oToHbBond);

            setWater(molecule);
        }
        buildAmmonia();
        buildDiatomicHydrogen();
        buildMethane();
        buildOzone();
        buildWater();
    }, []);

    return <div className="md:p-4 sm:p2 flex flex-col w-full items-center">
        <div className="visualizations-container flex flex-wrap flex-row w-full items-center justify-center gap-8">
            <div className="molecule-visualization-container flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold mb-4">H<sub>2</sub> - Diatomic Hydrogen</h2>
                <Visualization id="diatomic-hydrogen" molecule={diatomicHydrogen} />
            </div>
            <div className="molecule-visualization-container flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold mb-4">H<sub>2</sub>O - Water</h2>
                <Visualization id="water" molecule={water} />
            </div>
            <div className="molecule-visualization-container flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold mb-4">O<sub>3</sub> - Ozone</h2>
                <Visualization id="ozone" molecule={ozone} />
            </div>
            <div className="molecule-visualization-container flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold mb-4">NH<sub>3</sub> - Ammonia</h2>
                <Visualization id="ammonia" molecule={ammonia} />
            </div>
            <div className="molecule-visualization-container flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold mb-4">CH<sub>4</sub> - Methane</h2>
                <Visualization id="methane" molecule={methane} />
            </div>
        </div>
    </div>;
}

export { MoleculeVisualizations };