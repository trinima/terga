'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function toCoordinates(angleInDegrees, radius) {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians);
    return { x, y };
}

class Drawable {
    addToScene(scene) { }
    update() { }
}

class BondRenderer extends Drawable {
    #color;
    #cylinder;
    #endAtom;
    #startAtom;

    constructor({ startAtom, endAtom, color }) {
        super();
        this.#startAtom = startAtom;
        this.#endAtom = endAtom;
        this.#color = color;
        this.#constructCylinder();
    }

    #constructCylinder() {
        const points = [];
        points.push(this.#startAtom.getPosition()); // Start point
        points.push(this.#endAtom.getPosition()); // End point
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: this.#color || 0xff0000 });
        this.#cylinder = new THREE.Line(geometry, material);
    }

    addToMesh(mesh) {
        mesh.add(this.#cylinder);
    }

    addToScene(scene) {
        scene.add(this.#cylinder);
    }

    update() {

    }
}

class AtomRenderer extends Drawable {
    #sphereOfInfluence;

    constructor() {
        super();

        this.#constructSphereOfInfluence();
    }

    #constructSphereOfInfluence() {
        const geometry = new THREE.SphereGeometry(0.2, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        this.#sphereOfInfluence = new THREE.Mesh(geometry, material);
    }

    addToMesh(mesh) {
        mesh.add(this.#sphereOfInfluence);
    }

    addToScene(scene) {
        scene.add(this.#sphereOfInfluence);
    }

    getPosition() {
        return this.#sphereOfInfluence.position;
    }

    setPosition({ x, y, z }) {
        this.#sphereOfInfluence.position.x = x || this.#sphereOfInfluence.position.x;
        this.#sphereOfInfluence.position.y = y || this.#sphereOfInfluence.position.y;
        this.#sphereOfInfluence.position.z = z || this.#sphereOfInfluence.position.z;
    }

    update() {
        this.#sphereOfInfluence.rotation.x += 0.01;
        this.#sphereOfInfluence.rotation.y += 0.01;
    }
}

class MoleculeRenderer extends Drawable {
    #atoms = [];
    #mesh;

    constructor({ molecule }) {
        super();
        this.#renderMolecule(molecule);
    }

    #renderMolecule(molecule) {
        this.#mesh = new THREE.Object3D();

        const bonds = molecule.getBonds();
        const renderedAtoms = new Map();
        bonds.forEach(bond => {
            this.#renderBond(bond, renderedAtoms);
        });

        this.#atoms = Array.from(renderedAtoms.values());

        this.#atoms.forEach(atom => {
            atom.addToMesh(this.#mesh);
        });
    }

    #renderBond(bond, renderedAtoms) {
        const anchor = bond.getAnchor();
        const leaf = bond.getLeaf();
        const bondAngle = bond.getBondAngle();

        let anchorRenderer;
        let leafRenderer;

        if (renderedAtoms.has(anchor)) {
            anchorRenderer = renderedAtoms.get(anchor);
        } else {
            anchorRenderer = new AtomRenderer({ atom: anchor });
            renderedAtoms.set(anchor, anchorRenderer);
        }

        if (renderedAtoms.has(leaf)) {
            leafRenderer = renderedAtoms.get(leaf);
        } else {
            leafRenderer = new AtomRenderer({ atom: leaf });
            renderedAtoms.set(leaf, leafRenderer);
        }

        leafRenderer.setPosition(toCoordinates(bondAngle, 1));

        const bondRenderer = new BondRenderer({ startAtom: anchorRenderer, endAtom: leafRenderer });
        bondRenderer.addToMesh(this.#mesh);
    }

    addToScene(scene) {
        scene.add(this.#mesh);
    }

    update() {
        this.#atoms.forEach(atom => {
            atom.update();
        });
    }
}

function Visualization({ id, molecule }) {
    const scene = useRef();
    const camera = useRef();
    const renderer = useRef();
    const moleculeRenderer = useRef();

    function animate() {
        moleculeRenderer.current.update();
        renderer.current.render(scene.current, camera.current);
    }

    useEffect(() => {
        if (!molecule) {
            return;
        }

        moleculeRenderer.current = new MoleculeRenderer({ molecule });
        scene.current = new THREE.Scene();
        camera.current = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        renderer.current = new THREE.WebGLRenderer();

        renderer.current.setSize(300, 300);
        renderer.current.setAnimationLoop(animate);
        const container = document.getElementById(`threejs-container-${id}`);
        container.innerHTML = '';
        container.appendChild(renderer.current.domElement);
        moleculeRenderer.current.addToScene(scene.current);

        camera.current.position.z = 5;
    }, [molecule]);

    return <div id={`threejs-container-${id}`}
        className="threejs-container">
    </div>
}

export { Visualization };