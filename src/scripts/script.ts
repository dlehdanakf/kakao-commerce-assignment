import { initializeApplicationModels } from "./controllers/initialize_application";
import { generate_callElevator } from "./controllers/call_elevator";
import { generate_isFloorCallable } from "./controllers/check_floor";

declare global {
    interface ElevatorAPI {
        callElevator: (floorIndex: number) => void,
        isFloorCallable: (floorIndex: number) => boolean
    }
    interface Window {
        elevator: ElevatorAPI
    }
    interface Document {
        variable_form: HTMLFormElement
    }
}
interface VariableFormInterface {
    floor: HTMLInputElement,
    elevator: HTMLInputElement,
    submit: HTMLButtonElement,
    reset: HTMLButtonElement
}

const disableForm = (form: VariableFormInterface) => {
    form.floor.disabled = form.elevator.disabled = form.submit.disabled = true;
    form.reset.disabled = false;
};
const enableForm = (form: VariableFormInterface) => {
    form.floor.disabled = form.elevator.disabled = form.submit.disabled = false;
    form.reset.disabled = true;
};

const runApplication = (form: VariableFormInterface) => {
    const { value: floorCount } = form.floor;
    const { value: elevatorCount } = form.elevator;

    const { floorList, elevatorList } = initializeApplicationModels(+floorCount, +elevatorCount);
    window.elevator = {
        callElevator: generate_callElevator(floorList, elevatorList),
        isFloorCallable: generate_isFloorCallable(floorList, elevatorList)
    };

    document.variable_form.addEventListener(`reset`, function eventListener() {
        floorList.forEach(e => e.destruct());
        elevatorList.forEach(e => e.destruct());

        floorList.length = 0;
        elevatorList.length = 0;
        window.elevator = undefined;

        enableForm(form);
        document.variable_form.removeEventListener(`reset`, eventListener);
    });
};

document.addEventListener(`DOMContentLoaded`, () => {
    const { platform } = navigator;
    document.body.dataset.platform = `${platform}`;

    document.variable_form.addEventListener(`submit`, e => {
        e.preventDefault();

        const form: VariableFormInterface = {
            floor: document.querySelector(`#variable-form-floor`),
            elevator: document.querySelector(`#variable-form-elevator`),
            submit: document.querySelector(`#variable-form-submit`),
            reset: document.querySelector(`#variable-form-reset`)
        };

        disableForm(form);
        runApplication(form);
    });
});
