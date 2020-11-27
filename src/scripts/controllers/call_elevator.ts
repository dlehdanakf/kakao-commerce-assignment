import Floor from "../data_models/Floor";
import Elevator from "../data_models/Elevator";

interface ElevatorTimeInterface {
    elevator: Elevator,
    time: number
}

export const isCallInvalid = (floor: Floor, elevatorList: Array<Elevator>) => {
    /**
     *  floor === undefined    : 전달받은 floor 파라미터가 유효하지 않은 객체일 경우
     *  floor.isElevatorComing : 해당 층에 이미 엘리베이터가 오는 중일 경우
     *  elevatorList.some(...) : 해당 층에 엘리베이터가 pending 상태이거나 doorOpen 상태일 경우
     *
     *  위 세 가지 중 하나라도 해당할 경우 엘리베이터 호출을 무시한다.
     */

    return (
        floor === undefined ||
        floor.isElevatorComing ||
        elevatorList.some((elevator: Elevator) => elevator.currentFloorIndex === floor.index && elevator.isStopped)
    );
};
export const pickFastestComingElevator = (floor: Floor, elevatorList: Array<Elevator>): Elevator => {
    const [ elevator ] = elevatorList
        .map((elevator: Elevator): ElevatorTimeInterface => {
            /* Elevator가 Floor에 도착하는 시간 = Task를 모두 처리하는데 걸리는 시간 + 최종 Floor에서 호출한 Floor까지 가는데 걸리는 시간 */
            /* Elevator가 올라가던 내려가던 이동하는 거리는 절댓값 */
            const moveDistance = Math.abs(floor.index - elevator.finalDestinationFloorIndex);
            const time = elevator.timeToCompleteTask + moveDistance;

            return {
                elevator,
                time
            };
        })
        .sort((a: ElevatorTimeInterface, b: ElevatorTimeInterface) => a.time - b.time)
        .map((elevatorTime: ElevatorTimeInterface): Elevator => elevatorTime.elevator);

    return elevator;
};
export const generate_callElevator = (floorList: Array<Floor>, elevatorList: Array<Elevator>): (floorIndex: number) => void => {
    return (floorIndex: number): number => {
        const floor: Floor = floorList[floorIndex - 1];

        // 1. 엘리베이터 호출이 유효한지 검사
        if(isCallInvalid(floor, elevatorList) === true) {
            // 호출이 유효하지 않다면 -1 인덱스를 반환
            return -1;
        }

        // 2. 엘리베이터 선발
        const elevator: Elevator = pickFastestComingElevator(floor, elevatorList);

        // 3. Floor 객체에 Elevator assign
        floor.assignElevator(elevator);

        // 4. Elevator 객체에 Floor 층으로 이동하는 Task 추가
        elevator.addDestination(floor);

        // 5. 배정된 엘리베이터의 번호를 반환하며 마무리
        return elevator.index;
    };
};
