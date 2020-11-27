import BasicViewModel from "./BasicViewModel";
import Floor from "./../data_models/Floor";

class FloorView extends BasicViewModel {
    protected _floor: Floor;
    protected _button: HTMLButtonElement;
    protected _input: HTMLInputElement;

    public constructor(floor: Floor) {
        super(floor);

        this._floor = floor;
        this.constructElement();
    }

    protected constructElement() {
        this._element = document.createElement(`div`);
        this._element.className = `floor-item`;
        this._element.innerHTML = this.getHTML();

        this._button = this._element.querySelector(`button`);
        this._input  = this._element.querySelector(`input`);

        this._button.addEventListener(`click`, () => {
            const { index } = this._floor;
            if(window.hasOwnProperty(`elevator`)) {
                window.elevator.callElevator(index);
            }
        });
    }
    protected getHTML(): string {
        const { index, assignedElevatorIndex } = this._floor;

        return (`
            <h4>${index} Floor</h4>
            <div>
                <button type="button">호출</button>
                <input type="text" value="${assignedElevatorIndex}" readonly />
            </div>
        `);
    }
    public update(): void {
        const isActive: boolean = this._floor.isActive;
        const assignedElevatorIndex = this._floor.assignedElevatorIndex;

        this._button.disabled = isActive;
        this._input.value = assignedElevatorIndex;
    }
}

export default FloorView;
