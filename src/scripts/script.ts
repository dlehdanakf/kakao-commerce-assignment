import Floor from "./data_models/Floor";
import FloorView from "./view_models/FloorView";
import Elevator from "./data_models/Elevator";
import ElevatorView from "./view_models/ElevatorView";

const floor_count = 5, elevator_count = 4;
document.addEventListener(`DOMContentLoaded`, () => {
    const floorListContainer: HTMLElement = document.querySelector(`#floor-list`);
    const elevatorListContainer: HTMLElement = document.querySelector(`#elevator-list`);

    const floorList: Array<Floor> = new Array(floor_count).fill(undefined).map((_, i) => new Floor(i + 1));
    const floorViewList: Array<FloorView> = floorList.map(floor => new FloorView(floor));

    const elevatorList: Array<Elevator> = new Array(elevator_count).fill(undefined).map((_, i) => new Elevator(i + 1));
    const elevatorViewList: Array<ElevatorView> = elevatorList.map(elevator => new ElevatorView(elevator));

    const floorFragment: DocumentFragment = document.createDocumentFragment();
    const elevatorFragment: DocumentFragment = document.createDocumentFragment();
    floorViewList.reverse().forEach((floorView: FloorView) => floorFragment.appendChild(floorView.element));
    elevatorViewList.forEach((elevatorView: ElevatorView) => elevatorFragment.appendChild(elevatorView.element));

    floorListContainer.appendChild(floorFragment);
    elevatorListContainer.appendChild(elevatorFragment);
});



