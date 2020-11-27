import { initializeApplicationModels } from "./controllers/initialize_application";
import { generate_callElevator } from "./controllers/call_elevator";
import { generate_isFloorCallable } from "./controllers/check_floor";

declare global {
    interface ElevatorAPI {
        callElevator: (floorIndex: number) => void,
        isFloorCallable: (floorIndex: number) => boolean
    }
    interface Window {
        elevator: ElevatorAPI
    }
}

const floor_count = 5, elevator_count = 4;
document.addEventListener(`DOMContentLoaded`, () => {
    const { floorList, elevatorList } = initializeApplicationModels(floor_count, elevator_count);

    window.elevator = {
        callElevator: generate_callElevator(floorList, elevatorList),
        isFloorCallable: generate_isFloorCallable(floorList, elevatorList)
    };
});
