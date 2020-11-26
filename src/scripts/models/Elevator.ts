enum TaskType {
    MoveUP,
    MoveDown,
    DoorOpen
};

interface TaskInterface {
    type: TaskType,
    time: 1 | 3
}

class Elevator {
    protected index: number;
    protected taskQueue: Array<TaskInterface>;
}

export default Elevator;
