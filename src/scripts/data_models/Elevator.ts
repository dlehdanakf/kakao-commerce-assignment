import BasicDataModel from "./BasicDataModel";
import Floor from "./Floor";

enum TaskType {
    MoveUP,
    MoveDown,
    DoorOpen
};
enum ElevatorStatus {
    pending = 'pending',
    moving = 'moving',
    opened = 'opened'
};

interface TaskInterface {
    type: TaskType,
    move: -1 | 0 | 1
}

class Elevator extends BasicDataModel {
    protected _taskQueue: Array<TaskInterface>;
    protected _status: ElevatorStatus;
    protected _floorPosition: number;

    constructor(index: number, floorPosition: number = 1) {
        super(index);

        this._floorPosition = floorPosition;
    }

    get index(): number {
        return this._index;
    }
    get status(): ElevatorStatus {
        return this._status;
    }
    get floorPosition(): number {
        return this._floorPosition;
    }

    get isPending(): boolean {
        return this._status === ElevatorStatus.pending;
    }
    get isMoving(): boolean {
        return this._status === ElevatorStatus.moving;
    }
    get isOpened(): boolean {
        return this._status === ElevatorStatus.opened;
    }
    get isStopped(): boolean {
        return this.isPending || this.isOpened;
    }

    set status(newStatus: ElevatorStatus) {
        this._status = newStatus;
        this.updateViewModel();
    }
    set floorPosition(newFloorPosition: number) {
        this._floorPosition = newFloorPosition;
        this.updateViewModel();
    }

    public addDestination(floor: Floor) {

    }
}

export default Elevator;
