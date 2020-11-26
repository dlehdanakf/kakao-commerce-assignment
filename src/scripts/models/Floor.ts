import Elevator from "./Elevator";

class Floor {
    protected index: number;
    protected elevator?: Elevator;

    public constructor(index: number) {
        this.index = index;
    }
}

export default Floor;
