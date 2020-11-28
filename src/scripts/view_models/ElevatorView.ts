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
        const { index, status } = this._elevator;

        return (`<div class="elevator" data-index="${index}" data-status="${status}"></div>`);
    }
    public update(): void {
        const { status, currentFloorIndex } = this._elevator;

        this._box.style.transform = `translate(0, -${(currentFloorIndex - 1) * 100}px)`;
        if(this._box.dataset) this._box.dataset.status = `${status}`;
        else this._box.setAttribute(`data-status`, `${status}`);
    }

    destruct() {
        super.destruct();

        this._elevator = undefined;
    }
}

export default ElevatorView;
