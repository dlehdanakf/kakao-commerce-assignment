import Floor from "../data_models/Floor";
import Elevator from "../data_models/Elevator";

export const isCallInvalid = (floor: Floor, elevatorList: Array<Elevator>) => {
    /**
     *  floor === undefined    : 전달받은 floor 파라미터가 유효하지 않은 객체일 경우
     *  floor.isElevatorComing : 해당 층에 이미 엘리베이터가 오는 중일 경우
     *  elevatorList.some(...) : 해당 층에 엘리베이터가 pending 상태이거나 opened 상태일 경우
     *
     *  위 세 가지 중 하나라도 해당할 경우 엘리베이터 호출을 무시한다.
     */

    return (
        floor === undefined ||
        floor.isElevatorComing ||
        elevatorList.some((elevator: Elevator) => elevator.floorPosition === floor.index || elevator.isStopped)
    );
};
export const pickFastestComingElevator = (floor: Floor, elevatorList: Array<Elevator>): Elevator => {
    /**
     *  TODO: 임시로 가장 빠른 엘리베이터를 탐색하지 않고 elevatorList 배열 속 첫 번째 엘리베이터 객체를 반환한다.
     *        일단 Elevator 한 객체에 대해 TaskQueue 기능과 ViewModel 연동이 모두 정상 작동하는 것을 체킹한뒤 구현할 예정
     */

    const [ elevator ] = elevatorList;
    return elevator;
};
export const generate_callElevator = (floorList: Array<Floor>, elevatorList: Array<Elevator>): (floorIndex: number) => void => {
    return (floorIndex: number): void => {
        const floor: Floor = floorList[floorIndex - 1];

        // 1. 엘리베이터 호출이 유효한지 검사
        if(isCallInvalid(floor, elevatorList) === true) {
            return;
        }

        // 2. 엘리베이터 선발
        const elevator: Elevator = pickFastestComingElevator(floor, elevatorList);

        // 3. Floor 객체에 Elevator assign
        floor.assignElevator(elevator);

        // 4. Elevator 객체에 Floor 층으로 이동하는 Task 추가
        elevator.addDestination(floor);
    };
};
