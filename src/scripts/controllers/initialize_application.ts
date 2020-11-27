import BasicViewModel from "../view_models/BasicViewModel";
import Floor from "../data_models/Floor";
import FloorView from "../view_models/FloorView";
import Elevator from "../data_models/Elevator";
import ElevatorView from "../view_models/ElevatorView";

export const floorListContainer = `#floor-list`;
export const elevatorListContainer = `#elevator-list`;

export const renderFragment = (container: HTMLElement, viewList: Array<BasicViewModel>) => {
    const fragment: DocumentFragment = document.createDocumentFragment();
    viewList.forEach(view => fragment.appendChild(view.element));

    container.appendChild(fragment);
};

interface initializerReturnType {
    floorList: Array<Floor>,
    elevatorList: Array<Elevator>
};
export const initializeApplicationModels = (floorCount: number, elevatorCount: number): initializerReturnType  => {
    const floorList: Array<Floor> = new Array(floorCount).fill(undefined).map((_, i) => new Floor(i + 1));
    const floorViewList: Array<FloorView> = floorList.map(floor => new FloorView(floor));

    const elevatorList: Array<Elevator> = new Array(elevatorCount).fill(undefined).map((_, i) => new Elevator(i + 1));
    const elevatorViewList: Array<ElevatorView> = elevatorList.map(elevator => new ElevatorView(elevator));

    renderFragment(document.querySelector(floorListContainer), floorViewList.reverse());
    renderFragment(document.querySelector(elevatorListContainer), elevatorViewList);

    return { floorList, elevatorList };
};
