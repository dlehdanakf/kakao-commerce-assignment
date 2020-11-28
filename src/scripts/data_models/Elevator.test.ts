import Elevator, { ElevatorStatus, TaskInterface, TaskCollection, generateMovingTasks } from "./Elevator";
import Floor from "./Floor";

export class ElevatorTest extends Elevator {
    constructor(index: number = 1, floorIndex: number = 1) {
        super(index, ()=>{}, floorIndex);
    }

    set status(newStatus: ElevatorStatus) {
        this._status = newStatus;
    }
    set floorIndex(floorIndex: number) {
        this._floorIndex = floorIndex;
    }
    set taskQueue(tasks: Array<TaskInterface>) {
        this._taskQueue = [...tasks];
    }
}

describe("generateMovingTasks 함수 동작 테스트", () => {
    test("위로 3층 올라가는 task 생성", () => {
        expect(generateMovingTasks(3)).toEqual([
            TaskCollection.moveUp,
            TaskCollection.moveUp,
            TaskCollection.moveUp,
            TaskCollection.doorOpen,
            TaskCollection.doorOpen,
            TaskCollection.doorOpen
        ]);
    });
    test("아래로 2층 올라가는 task 생성", () => {
        expect(generateMovingTasks(-2)).toEqual([
            TaskCollection.moveDown,
            TaskCollection.moveDown,
            TaskCollection.doorOpen,
            TaskCollection.doorOpen,
            TaskCollection.doorOpen
        ]);
    });
    test("움직이지 않을 때", () => {
        expect(generateMovingTasks(0)).toEqual([ ]);
    });
});

describe("Elevator.finalDestinationFloorIndex getter 필드 테스트", () => {
    const elevator = new ElevatorTest;

    test("2층에서 위로 5개 층, 아래로 1개 층 이동", () => {
        elevator.floorIndex = 2;
        elevator.taskQueue = [ ...generateMovingTasks(5), ...generateMovingTasks(-1) ];

        expect(elevator.finalDestinationFloorIndex).toBe(6);
    });
    test("2층 문열림 상태에서 위로 5개 층, 아래로 1개 층 이동", () => {
        elevator.floorIndex = 2;
        elevator.taskQueue = [ ...[ TaskCollection.doorOpen, TaskCollection.doorOpen ], ...generateMovingTasks(5), ...generateMovingTasks(-1) ];

        expect(elevator.finalDestinationFloorIndex).toBe(6);
    });
    test("1층에서 아래로 3개 층, 위로 5개 층 이동", () => {
        elevator.floorIndex = 1;
        elevator.taskQueue = [ ...generateMovingTasks(-3), ...generateMovingTasks(5) ];

        expect(elevator.finalDestinationFloorIndex).toBe(3);
    });
});

describe("Elevator.addDestination 메소드 테스트", () => {
    const elevator = new ElevatorTest;

    test("1층에서 대기중일 때 1층 목적지 추가", () => {
        const index = 1;
        const floor = new Floor(index);

        elevator.floorIndex = 1;
        elevator.addDestination(floor);

        expect(elevator.finalDestinationFloorIndex).toBe(index);
    });
    test("1층에서 대기중일 때 5층 목적지 추가", () => {
        const index = 5;
        const floor = new Floor(index);

        elevator.floorIndex = 1;
        elevator.addDestination(floor);

        expect(elevator.finalDestinationFloorIndex).toBe(index);
    });
    test("1층에서 문열림 상태일 때 5층 목적지 추가", () => {
        const index = 5;
        const floor = new Floor(index);

        elevator.floorIndex = 1;
        elevator.taskQueue = [ TaskCollection.doorOpen, TaskCollection.doorOpen ];
        elevator.addDestination(floor);

        expect(elevator.finalDestinationFloorIndex).toBe(index);
    });
    test("1층에서 5층, 2층 목적지 추가", () => {
        const index1 = 5;
        const floor1 = new Floor(index1);
        const index2 = 2;
        const floor2 = new Floor(index2);

        elevator.floorIndex = 1;
        elevator.addDestination(floor1);
        elevator.addDestination(floor2);

        expect(elevator.finalDestinationFloorIndex).toBe(index2);
    });
});
