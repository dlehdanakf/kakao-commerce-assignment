import BasicViewModel from "../view_models/BasicViewModel";

abstract class BasicDataModel {
    protected _index: number;
    protected _viewModel: BasicViewModel;

    protected constructor(index: number) {
        this._index = index;
    }

    public registerViewModel(viewModel: BasicViewModel): void {
        this._viewModel = this._viewModel || viewModel;
    }
    protected updateViewModel() {
        this._viewModel.update();
    }

    get index(): number {
        return this._index;
    }
}

export default BasicDataModel;
