enum TaskType {
    MoveUP,
    MoveDown,
    DoorOpen
};

interface TaskInterface {
    type: TaskType,
    move: -1 | 0 | 3
}

class Elevator {
    protected index: number;
    protected taskQueue: Array<TaskInterface>;
}

export default Elevator;
