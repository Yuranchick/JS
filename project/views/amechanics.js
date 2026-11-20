import {
    state, loadAmechanics, createAmechanic, updateAmechanic, deleteAmechanic,
    startEditingAmechanic, cancelEditingAmechanic,
} from "../state.js";
import { renderTable } from "../components/table.js";
import { renderForm } from "../components/form.js";
import { renderStatus, createLayout } from "./common.js";

const columns = [
    { key: "id", label: "ID" },
    { key: "OFN", label: "ПІБ" },
    { key: "Experience", label: "Досвід" },
    { key: "Grade", label: "Розряд" },
    { key: "PN", label: "Табельний №" },
];

const fields = [
    { name: "OFN", label: "ПІБ" },
    { name: "Experience", label: "Досвід" },
    { name: "Grade", label: "Розряд" },
    { name: "PN", label: "Табельний №" },
];

export function renderAmechanics() {
    const container = document.querySelector("#app");
    const { items, status, error, editingId } = state.amechanics;

    if (renderStatus(container, status, error, loadAmechanics)) return;

    const { listCol, formCol } = createLayout(container, "Список механіків");

    renderTable(listCol, items, columns,
        { onEdit: startEditingAmechanic, onDelete: deleteAmechanic },
        editingId
    );

    const editing = items.find(item => item.id === editingId) ?? null;
    renderForm(formCol, {
        title: editing ? "Редагувати механіка" : "Додати механіка",
        fields,
        values: editing,
        onSubmit: (data) => editing ? updateAmechanic(editing.id, data) : createAmechanic(data),
        onCancel: cancelEditingAmechanic,
    });
}
