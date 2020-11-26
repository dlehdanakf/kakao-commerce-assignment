import Floor from "./../data_models/Floor";

class FloorView {
    protected _floor: Floor;
    protected _element: HTMLElement;
    protected _button: HTMLElement;
    protected _input: HTMLElement;

    public constructor(floor: Floor) {
        this._floor = floor;
        this.constructElement();
    }

    get element(): HTMLElement {
        return this._element;
    }

    protected constructElement() {
        this._element = document.createElement(`div`);
        this._element.className = `floor-item`;
        this._element.innerHTML = this.getHTML();

        this._button = this._element.querySelector(`button`);
        this._input  = this._element.querySelector(`input`);
    }
    protected getHTML(): string {
        const { index } = this._floor;

        return (`
            <h4>${index} Floor</h4>
            <div>
                <button type="button">호출</button>
                <input type="text" readonly />
            </div>
        `);
    }
}

export default FloorView;
