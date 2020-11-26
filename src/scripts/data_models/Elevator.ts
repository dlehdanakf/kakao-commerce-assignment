import BasicDataModel from "./BasicDataModel";

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
    move: -1 | 0 | 3
}

class Elevator extends BasicDataModel {
    protected _taskQueue: Array<TaskInterface>;
    protected _status: ElevatorStatus;
    protected _floorPosition: number;

    constructor(index: number) {
        super(index);
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

    set status(newStatus: ElevatorStatus) {
        this._status = newStatus;
        this.updateViewModel();
    }
    set floorPosition(newFloorPosition: number) {
        this._floorPosition = newFloorPosition;
        this.updateViewModel();
    }
}

export default Elevator;
