import { Atom } from './logical'

const atomicNumbers = {
    carbon: 6,
    helium: 2,
    hydrogen: 1,
    oxygen: 8,
    nitrogen: 7
}

const elements = {}
elements[1] = {
    atomicNumber: atomicNumbers.hydrogen,
    name: "Hydrogen",
    symbol: "H",
};
elements[2] = {
    atomicNumber: atomicNumbers.helium,
    name: "Helium",
    symbol: "He",
};
elements[6] = {
    atomicNumber: atomicNumbers.carbon,
    name: "Carbon",
    symbol: "C",
};
elements[7] = {
    atomicNumber: atomicNumbers.nitrogen,
    name: "Nitrogen",
    symbol: "N",
};
elements[8] = {
    atomicNumber: atomicNumbers.oxygen,
    name: "Oxygen",
    symbol: "O",
};

class AtomFactory {
    byAtomicNumber(atomicNumber) {
        const element = elements[atomicNumber];

        if (!element) {
            throw `Element not configured.  {atomicNumber}: ${atomicNumber}`
        }

        return new Atom(element.atomicNumber, element.name, element.symbol);
    }

    carbon() {
        return this.byAtomicNumber(atomicNumbers.carbon);
    }
    helium() {
        return this.byAtomicNumber(atomicNumbers.helium);
    }
    hydrogen() {
        return this.byAtomicNumber(atomicNumbers.hydrogen);
    }
    oxygen() {
        return this.byAtomicNumber(atomicNumbers.oxygen);
    }
    nitrogen() {
        return this.byAtomicNumber(atomicNumbers.nitrogen);
    }
}

export {
    atomicNumbers,
    AtomFactory
}