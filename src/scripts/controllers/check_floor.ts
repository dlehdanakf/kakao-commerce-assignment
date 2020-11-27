import Floor from "../data_models/Floor";
import Elevator from "../data_models/Elevator";

export const generate_isFloorCallable = (floorList: Array<Floor>, elevatorList: Array<Elevator>): (floorIndex: number) => boolean => {
    return (floorIndex: number): boolean => {
        return false;
    };
};
