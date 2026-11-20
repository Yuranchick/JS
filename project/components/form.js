export function renderForm(container, { title, fields, values, onSubmit, onCancel }) {
    const heading = document.createElement("h2");
    heading.textContent = title;

    const form = document.createElement("form");

    for (const field of fields) {
        const group = document.createElement("div");
        group.className = "form-group";

        const id = `field-${field.name}`;
        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = `${field.label}:`;

        let input;
        if (field.type === "select") {
            input = document.createElement("select");
            const options = [...field.options];
            const current = values?.[field.name];
            if (current != null && current !== "" && !options.some(o => String(o.value) === String(current))) {
                options.push({ value: current, label: String(current) });
            }
            for (const { value, label: text } of options) {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = text;
                input.append(option);
            }
        } else {
            input = document.createElement("input");
            input.type = field.type || "text";
        }
        input.id = id;
        input.name = field.name;
        input.className = "form-control";
        input.required = field.required !== false;
        if (values && values[field.name] != null) input.value = values[field.name];

        group.append(label, input);
        form.append(group);
    }

    const actions = document.createElement("div");
    actions.className = "form-actions";

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "btn btn-primary";
    submit.textContent = values ? "Зберегти зміни" : "Додати";
    actions.append(submit);

    if (values && onCancel) {
        const cancel = document.createElement("button");
        cancel.type = "button";
        cancel.className = "btn btn-default";
        cancel.textContent = "Скасувати";
        cancel.addEventListener("click", onCancel);
        actions.append(cancel);
    }
    form.append(actions);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        submit.disabled = true;
        onSubmit(Object.fromEntries(new FormData(form)));
    });

    container.append(heading, form);
}
