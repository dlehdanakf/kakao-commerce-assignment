import Elevator from "./Elevator";

class Floor {
    protected _index: number;
    protected _elevator?: Elevator;

    public constructor(index: number) {
        this._index = index;
        this._elevator = undefined;
    }

    get index(): number {
        return this._index;
    }
    get isActive(): boolean {
        return this._elevator === undefined;
    }
}

export default Floor;
