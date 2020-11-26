import BasicViewModel from "./BasicViewModel";
import Elevator from "../data_models/Elevator";

class ElevatorView extends BasicViewModel {
    protected _elevator: Elevator;
    protected _box: HTMLElement;

    public constructor(elevator: Elevator) {
        super(elevator);

        this._elevator = elevator;
        this.constructElement();
    }

    protected constructElement() {
        this._element = document.createElement(`div`);
        this._element.className = `elevator-item`;
        this._element.innerHTML = this.getHTML();

        this._box = this._element.querySelector(`div.elevator`);
    }
    protected getHTML(): string {
        const { status } = this._elevator;

        return (`<div class="elevator" data-status="${status}"></div>`);
    }
    public update(): void {
        const { status, floorPosition } = this._elevator;

        this._box.dataset.status = `${status}`;
        this._box.style.bottom = `${(floorPosition - 1) * 100}px`;
    }
}

export default ElevatorView;
