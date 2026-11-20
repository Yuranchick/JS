import {
    state, loadCars, createCar, updateCar, deleteCar,
    startEditingCar, cancelEditingCar,
} from "../state.js";
import { renderTable } from "../components/table.js";
import { renderForm } from "../components/form.js";
import { renderStatus, createLayout } from "./common.js";

const columns = [
    { key: "id", label: "ID" },
    { key: "Number", label: "Номер" },
    { key: "Brand", label: "Марка" },
    { key: "YOM", label: "Рік випуску" },
    { key: "OFN", label: "Власник" }
];

const fields = [
    { name: "Number", label: "Номер" },
    { name: "Brand", label: "Марка" },
    { name: "YOM", label: "Рік випуску" },
    { name: "OFN", label: "Власник" },
];

export function renderCars() {
    const container = document.querySelector("#app");
    const { items, status, error, editingId } = state.cars;

    if (renderStatus(container, status, error, loadCars)) return;

    const { listCol, formCol } = createLayout(container, "Список машин");

    renderTable(listCol, items, columns,
        { onEdit: startEditingCar, onDelete: deleteCar },
        editingId
    );

    const editing = items.find(item => item.id === editingId) ?? null;
    renderForm(formCol, {
        title: editing ? "Редагувати машину" : "Додати машину",
        fields,
        values: editing,
        onSubmit: (data) => editing ? updateCar(editing.id, data) : createCar(data),
        onCancel: cancelEditingCar,
    });
}
