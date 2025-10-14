'use client';

import { MoleculeVisualizations } from "./moleculeVisualizations";

function Widget() {
    return <div className="w-full p-4 border border-gray-300 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Molecule Visualizations</h2>
        <MoleculeVisualizations />
    </div>
}

export { Widget };