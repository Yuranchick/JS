export function renderStatus(container, status, error, retry) {
    if (status === "idle" || status === "loading") {
        container.innerHTML = `<p class="text-muted">Завантаження...</p>`;
        return true;
    }
    if (status === "error") {
        container.innerHTML = "";
        const alert = document.createElement("div");
        alert.className = "alert alert-danger";
        alert.textContent = `Помилка: ${error} `;
        const retryBtn = document.createElement("button");
        retryBtn.type = "button";
        retryBtn.className = "btn btn-default btn-sm";
        retryBtn.textContent = "Спробувати знову";
        retryBtn.addEventListener("click", retry);
        alert.append(retryBtn);
        container.append(alert);
        return true;
    }
    return false;
}

export function createLayout(container, listTitle) {
    container.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row";

    const listCol = document.createElement("div");
    listCol.className = "col-md-12";
    const heading = document.createElement("h2");
    heading.textContent = listTitle;
    listCol.append(heading);

    const formCol = document.createElement("div");
    formCol.className = "col-md-6";

    row.append(listCol, formCol);
    container.append(row);
    return { listCol, formCol };
}
