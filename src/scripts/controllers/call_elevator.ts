import Floor from "../data_models/Floor";
import Elevator from "../data_models/Elevator";

export const generate_callElevator = (floorList: Array<Floor>, elevatorList: Array<Elevator>): (floorIndex: number) => void => {
    return (floorIndex: number): void => {
        console.log(`elevator called from ${floorIndex} floor`);
    };
};
