import Floor from "../data_models/Floor";
import { ElevatorTest } from "../data_models/Elevator.test";
import { isCallInvalid, pickFastestComingElevator } from "./call_elevator";
import { ElevatorStatus, TaskCollection } from "../data_models/Elevator";

describe("isCallInvalid 함수 동작 테스트", () => {
    const elevatorList = [ new ElevatorTest, new ElevatorTest, new ElevatorTest ];

    test("( 1, 1, 1 ) 일 때 1층에서 호출", () => {
        const floor = new Floor(1);
        expect(isCallInvalid(floor, elevatorList)).toBe(true);
    });

    test("( 1, 1, 1 ) 일 때 3층에서 호출", () => {
        const floor = new Floor(3);
        expect(isCallInvalid(floor, elevatorList)).toBe(false);
    });

    test("( 2(Opened), 1, 1 ) 일 때 3층에서 호출", () => {
        elevatorList[0].status = ElevatorStatus.doorOpen;

        const floor = new Floor(3);
        expect(isCallInvalid(floor, elevatorList)).toBe(false);
    });

    test("( 5(Moving), 1, 1 ) 일 때 2층(1호기 배정)에서 호출", () => {
        elevatorList[0].status = ElevatorStatus.moving;

        const floor = new Floor(2);
        floor.assignElevator(elevatorList[0]);
        expect(isCallInvalid(floor, elevatorList)).toBe(true);
    });
});

describe("pickFastestComingElevator 함수 동작 테스트", () => {
    test("( 1, 1, 1 ) 일 때 3층에서 호출", () => {
        const floor = new Floor(3);
        const elevatorList = [ new ElevatorTest, new ElevatorTest, new ElevatorTest ];

        expect(pickFastestComingElevator(floor, elevatorList)).toBe(elevatorList[0]);
    });

    test("( 3(->4), 2(Opened), 1 ) 일 때 10층에서 호출", () => {
        const floor = new Floor(10);
        const elevatorList = [ new ElevatorTest, new ElevatorTest, new ElevatorTest ];

        elevatorList[0].floorIndex = 3;
        elevatorList[0].addDestination(new Floor(4));

        elevatorList[1].floorIndex = 2;
        elevatorList[1].taskQueue = [ TaskCollection.doorOpen, TaskCollection.doorOpen, TaskCollection.doorOpen ];

        /** 1호기가 4층 도착 후 3초 뒤 10층에 도착하는 시간과 3호기가 10층에 도착하는 시간이 동일, 호기 숫자가 낮은 1호기 배정 */
        expect(pickFastestComingElevator(floor, elevatorList)).toBe(elevatorList[0]);
    });

    test("( 1(->4->7), 2(Opened->5->6), 1(->3->8) ) 일 때 10층에서 호출", () => {
        const floor = new Floor(10);
        const elevatorList = [ new ElevatorTest, new ElevatorTest, new ElevatorTest ];

        elevatorList[0].floorIndex = 1;
        elevatorList[0].addDestination(new Floor(4));
        elevatorList[0].addDestination(new Floor(7));

        elevatorList[1].floorIndex = 2;
        elevatorList[1].taskQueue = [ TaskCollection.doorOpen, TaskCollection.doorOpen, TaskCollection.doorOpen ];
        elevatorList[0].addDestination(new Floor(5));
        elevatorList[0].addDestination(new Floor(6));

        elevatorList[2].floorIndex = 1;
        elevatorList[2].taskQueue = [ TaskCollection.doorOpen, TaskCollection.doorOpen, TaskCollection.doorOpen ];
        elevatorList[0].addDestination(new Floor(3));
        elevatorList[0].addDestination(new Floor(8));

        /** 1호기가 4층 도착 후 3초 뒤 10층에 도착하는 시간과 3호기가 10층에 도착하는 시간이 동일, 호기 숫자가 낮은 1호기 배정 */
        expect(pickFastestComingElevator(floor, elevatorList)).toBe(elevatorList[1]);
    });
});
