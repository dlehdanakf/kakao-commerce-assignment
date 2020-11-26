import Floor from "./data_models/Floor";
import FloorView from "./view_models/FloorView";


const floor_count = 5, elevator_count = 4;
document.addEventListener(`DOMContentLoaded`, () => {
    const floorListContainer: HTMLElement = document.querySelector(`#floor-list`);
    const elevatorListContainer: HTMLElement = document.querySelector(`#elevator-list`);

    const floor_list: Array<Floor> = new Array(floor_count).fill(undefined).map((_, i) => new Floor(i + 1));
    const floor_view_list: Array<FloorView> = floor_list.map(floor => new FloorView(floor));

    const fragment: DocumentFragment = document.createDocumentFragment();
    floor_view_list.reverse().forEach((floorView: FloorView) => {
        fragment.appendChild(floorView.element);
    });

    floorListContainer.appendChild(fragment);
});



