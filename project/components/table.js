export function renderRow(item, columns, { onEdit, onDelete }, editingId) {
    const tr = document.createElement("tr");
    if (item.id === editingId) tr.classList.add("info");

    for (const column of columns) {
        const td = document.createElement("td");
        const value = column.render ? column.render(item) : item[column.key];
        td.textContent = value ?? "";
        tr.append(td);
    }

    const actions = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn-warning btn-sm";
    editBtn.textContent = "Редагувати";
    editBtn.addEventListener("click", () => onEdit(item.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "Видалити";
    deleteBtn.addEventListener("click", () => onDelete(item.id));

    actions.append(editBtn, deleteBtn);
    tr.append(actions);
    return tr;
}

export function renderTable(container, items, columns, handlers, editingId = null) {
    const table = document.createElement("table");
    table.className = "table table-striped";

    const headRow = document.createElement("tr");
    for (const label of [...columns.map(c => c.label), "Дії"]) {
        const th = document.createElement("th");
        th.textContent = label;
        headRow.append(th);
    }
    const thead = document.createElement("thead");
    thead.append(headRow);

    const tbody = document.createElement("tbody");
    if (items.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = columns.length + 1;
        td.className = "text-muted";
        td.textContent = "Записів немає";
        tr.append(td);
        tbody.append(tr);
    } else {
        for (const item of items) {
            tbody.append(renderRow(item, columns, handlers, editingId));
        }
    }

    table.append(thead, tbody);
    const wrapper = document.createElement("div");
    wrapper.className = "table-responsive";
    wrapper.append(table);
    container.append(wrapper);
}