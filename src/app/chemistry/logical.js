class Atom {
    #atomicNumber;
    #name;

    constructor(atomicNumber, name) {
        this.#atomicNumber = atomicNumber;
        this.#name = name;
    }

    getAtomicNumber() {
        return this.#atomicNumber;
    }

    getName() {
        return this.#name;
    }
}

class Bond {
    #anchor;
    #bondAngle;
    #bondType;
    #leaf;

    constructor({ anchor, bondAngle, bondType, leaf }) {
        this.#anchor = anchor;
        this.#bondAngle = bondAngle;
        this.#bondType = bondType;
        this.#leaf = leaf;
    }

    getAnchor() {
        return this.#anchor;
    }

    getBondAngle() {
        return this.#bondAngle;
    }

    getBondType() {
        return this.#bondType;
    }

    getLeaf() {
        return this.#leaf;
    }
}

class Molecule {
    #bonds = [];

    addBond(bond) {
        this.#bonds.push(bond);
    }

    getBonds() {
        return this.#bonds;
    }
}

export { Atom, Bond, Molecule };