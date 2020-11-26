import { initializeApplicationModels } from "./controllers/initialize";

const floor_count = 5, elevator_count = 4;
document.addEventListener(`DOMContentLoaded`, () => {
    const { floorList, elevatorList } = initializeApplicationModels(floor_count, elevator_count);
});
