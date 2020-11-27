import BasicDataModel from "./BasicDataModel";
import Floor from "./Floor";

enum TaskType {
    Move,
    DoorOpen
};
enum ElevatorStatus {
    pending = 'pending',
    moving = 'moving',
    doorOpen = 'doorOpen'
};

interface TaskInterface {
    type: TaskType,
    move: -1 | 0 | 1
};
interface TaskCollectionInterface {
    moveUp: TaskInterface,
    moveDown: TaskInterface,
    doorOpen: TaskInterface
};
const TaskCollection: TaskCollectionInterface = {
    moveUp: { type: TaskType.Move, move: 1 },
    moveDown: { type: TaskType.Move, move: -1 },
    doorOpen: { type: TaskType.DoorOpen, move: 0 }
};

const generateMovingTasks = (move: number): Array<TaskInterface> => {
    const length = Math.abs(move);
    const movingTask = move < 0 ? TaskCollection.moveDown : TaskCollection.moveUp;

    const movingTasks = new Array(length).fill(movingTask);
    const doorOpenTasks = new Array(3).fill(TaskCollection.doorOpen);

    return [...movingTasks, ...doorOpenTasks];
};

class Elevator extends BasicDataModel {
    protected _taskQueue: Array<TaskInterface>;
    protected _status: ElevatorStatus;
    protected _floorPosition: number;
    protected _timer: ReturnType<typeof setTimeout>;
    protected _arrivalUpdate: (elevator: Elevator) => void;

    constructor(index: number, arrivalUpdate: (elevator: Elevator) => void, currentFloorIndex: number = 1) {
        super(index);

        this._taskQueue = [];
        this._status = ElevatorStatus.pending;
        this._floorPosition = currentFloorIndex;
        this._arrivalUpdate = arrivalUpdate;
    }

    get index(): number {
        return this._index;
    }
    get status(): ElevatorStatus {
        return this._status;
    }
    get currentFloorIndex(): number {
        return this._floorPosition;
    }
    get finalDestinationFloorIndex(): number {
        return this.currentFloorIndex + this._taskQueue.reduce((acc: number, cur: TaskInterface) => acc + cur.move, 0);
    }
    get timeToCompleteTask(): number {
        return this._taskQueue.length;
    }

    get isPending(): boolean {
        return this._status === ElevatorStatus.pending;
    }
    get isMoving(): boolean {
        return this._status === ElevatorStatus.moving;
    }
    get isOpened(): boolean {
        return this._status === ElevatorStatus.doorOpen;
    }
    get isStopped(): boolean {
        return this.isPending || this.isOpened;
    }

    set status(newStatus: ElevatorStatus) {
        if(this._status !== newStatus) {
            this._status = newStatus;
            this.updateViewModel();
            this._arrivalUpdate(this);
        }
    }
    set currentFloorIndex(newFloorPosition: number) {
        this._floorPosition = newFloorPosition;
        this.updateViewModel();
    }

    public addDestination(floor: Floor) {
        const needToMove = floor.index - this.finalDestinationFloorIndex;
        const tasks = generateMovingTasks(needToMove);

        this._taskQueue = [...this._taskQueue, ...tasks];
        if(this._timer === undefined) {
            this.doTask();
        }
    }

    protected doTask(): void {
        const task: TaskInterface = this._taskQueue.shift();
        if(task === undefined) {
            this.status = ElevatorStatus.pending;
            this._timer = undefined;
            return;
        }

        if(task.type === TaskType.Move) {
            this.status = ElevatorStatus.moving;
        } else {
            this.status = ElevatorStatus.doorOpen;
        }

        this.currentFloorIndex = this.currentFloorIndex + task.move;
        this._timer = setTimeout(() => this.doTask(), 1000);
    }
}

export default Elevator;
