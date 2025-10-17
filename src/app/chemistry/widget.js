'use client';

import { MoleculeVisualizations } from "./moleculeVisualizations";

function Widget() {
    return <div className="w-full md:p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Molecule Visualizations</h2>
        <MoleculeVisualizations />
    </div>
}

export { Widget };