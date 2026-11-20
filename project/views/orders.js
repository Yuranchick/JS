import {
    state, loadOrders, createOrder, updateOrder, deleteOrder,
    startEditingOrder, cancelEditingOrder,
} from "../state.js";
import { renderTable } from "../components/table.js";
import { renderForm } from "../components/form.js";
import { renderStatus, createLayout } from "./common.js";

const STATUS_OPTIONS = [
    { value: "Pending", label: "В роботі (Pending)" },
    { value: "Completed", label: "Виконано (Completed)" },
    { value: "Cancelled", label: "Скасовано (Cancelled)" },
];

function findById(items, id) {
    return items.find(item => String(item.id) === String(id));
}

export function renderOrders() {
    const container = document.querySelector("#app");
    const { items, status, error, editingId } = state.orders;
    const cars = state.cars.items;
    const amechanics = state.amechanics.items;

    if (renderStatus(container, status, error, loadOrders)) return;

    const columns = [
        { key: "id", label: "ID" },
        {
            label: "Авто",
            render: o => {
                const car = findById(cars, o.CarId);
                return car ? `${car.Brand} (${car.Number})` : "Невідоме авто";
            }
        },
        {
            label: "Механік",
            render: o => findById(amechanics, o.MechanicId)?.OFN ?? "Невідомий механік"
        },
        { key: "Price", label: "Ціна" },
        { key: "IssueDate", label: "Дата видачі" },
        { key: "WorkType", label: "Вид робіт" },
        { key: "PCD", label: "Плановане завершення" },
        { key: "ACD", label: "Фактичне завершення" },
        { key: "OrderStatus", label: "Статус" },
        { key: "Discount", label: "Знижка" },
    ];

    const fields = [
        {
            name: "CarId",
            label: "Авто",
            type: "select",
            options: cars.map(c => ({ value: c.id, label: `${c.Brand} (${c.Number})` }))
        },
        {
            name: "MechanicId",
            label: "Механік",
            type: "select",
            options: amechanics.map(m => ({ value: m.id, label: `${m.OFN} (${m.Grade})` }))
        },
        { name: "Price", label: "Ціна" },
        { name: "IssueDate", label: "Дата видачі", type: "date" },
        { name: "WorkType", label: "Вид робіт" },
        { name: "PCD", label: "Плановане завершення", type: "date" },
        { name: "ACD", label: "Фактичне завершення", type: "date", required: false },
        { name: "OrderStatus", label: "Статус", type: "select", options: STATUS_OPTIONS },
        { name: "Discount", label: "Знижка" },
    ];

    const { listCol, formCol } = createLayout(container, "Список замовлень");

    renderTable(listCol, items, columns,
        { onEdit: startEditingOrder, onDelete: deleteOrder },
        editingId
    );

    const editing = items.find(item => item.id === editingId) ?? null;
    renderForm(formCol, {
        title: editing ? "Редагувати замовлення" : "Додати замовлення",
        fields,
        values: editing,
        onSubmit: (data) => {
            const record = { ...data, CarId: Number(data.CarId), MechanicId: Number(data.MechanicId) };
            return editing ? updateOrder(editing.id, record) : createOrder(record);
        },
        onCancel: cancelEditingOrder,
    });
}