import BasicDataModel from "./BasicDataModel";
import Elevator from "./Elevator";

class Floor extends BasicDataModel {
    protected _elevator?: Elevator;

    public constructor(index: number) {
        super(index);
        this._elevator = undefined;
    }

    get elevator(): Elevator {
        return this.elevator;
    }
    get isElevatorComing(): boolean {
        return this._elevator !== undefined;
    }
    get assignedElevatorIndex(): string {
        if(this.isElevatorComing) {
            return `${this._elevator.index} 호기`;
        }

        return `없음`;
    }

    set elevator(newElevator: Elevator) {
        this._elevator = newElevator;
        this.updateViewModel();
    }
}

export default Floor;
