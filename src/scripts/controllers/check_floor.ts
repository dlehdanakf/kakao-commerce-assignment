import Floor from "../data_models/Floor";
import Elevator from "../data_models/Elevator";

export const generate_isFloorCallable = (floorList: Array<Floor>, elevatorList: Array<Elevator>): (floorIndex: number) => boolean => {
    return (floorIndex: number): boolean => {
        const floor: Floor = floorList[floorIndex - 1];
        if(floor === undefined) {
            /** 주어진 floorIndex 번호가 배열에 맞지 않는 경우 */
            return undefined;
        }

        /** 데이터 모델의 isElevatorComing 필드를 활용하면 손쉽게 활성 여부 판단 가능 */
        /** 오고있는 엘리베이터가 없다면 호출 버튼이 활성상태일 것 이므로 */
        return floor.isElevatorComing === false;
    };
};
