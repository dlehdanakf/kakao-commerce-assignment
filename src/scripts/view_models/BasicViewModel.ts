import BasicDataModel from "../data_models/BasicDataModel";

abstract class BasicViewModel {
    protected _element: HTMLElement;

    protected constructor(dataModel: BasicDataModel) {
        dataModel.registerViewModel(this);
    }

    protected abstract constructElement(): void;
    protected abstract getHTML(): string;
    public abstract update(): void;

    get element() {
        return this._element;
    }
}

export default BasicViewModel;
