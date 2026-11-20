import { renderRoute } from "./router.js";
import { CarsApi, AMechanicsApi, OrdersApi } from "./api.js";

export const state = {
    cars:   { items: [], status: "idle", error: null, editingId: null },
    amechanics: { items: [], status: "idle", error: null, editingId: null },
    orders: { items: [], status: "idle", error: null, editingId: null },
};

function setError(key, error) {
    state[key].status = "error";
    state[key].error = error.message;
    renderRoute();
}

// <------------ Cars --------------->

export async function loadCars() {
    state.cars.status = "loading";
    renderRoute();
    try {
        state.cars.items = await CarsApi.readAll();
        state.cars.status = "success";
        state.cars.error = null;
    } catch (error) {
        state.cars.status = "error";
        state.cars.error = error.message;
    }
    renderRoute();
}

export async function createCar(data) {
    try {
        await CarsApi.create(data);
        await loadCars();
    } catch (error) {
        setError("cars", error);
    }
}

export async function updateCar(id, data) {
    try {
        await CarsApi.update(id, data);
        state.cars.editingId = null;
        await loadCars();
    } catch (error) {
        setError("cars", error);
    }
}

export async function deleteCar(id) {
    try {
        await CarsApi.delete(id);
        if (state.cars.editingId === id) state.cars.editingId = null;
        await loadCars();
    } catch (error) {
        setError("cars", error);
    }
}

export function startEditingCar(id) {
    state.cars.editingId = id;
    renderRoute();
}

export function cancelEditingCar() {
    state.cars.editingId = null;
    renderRoute();
}

// <------------ Amechanics --------------->

export async function loadAmechanics() {
    state.amechanics.status = "loading";
    renderRoute();
    try {
        state.amechanics.items = await AMechanicsApi.readAll();
        state.amechanics.status = "success";
        state.amechanics.error = null;
    } catch (error) {
        state.amechanics.status = "error";
        state.amechanics.error = error.message;
    }
    renderRoute();
}

export async function createAmechanic(data) {
    try {
        await AMechanicsApi.create(data);
        await loadAmechanics();
    } catch (error) {
        setError("amechanics", error);
    }
}

export async function updateAmechanic(id, data) {
    try {
        await AMechanicsApi.update(id, data);
        state.amechanics.editingId = null;
        await loadAmechanics();
    } catch (error) {
        setError("amechanics", error);
    }
}

export async function deleteAmechanic(id) {
    try {
        await AMechanicsApi.delete(id);
        if (state.amechanics.editingId === id) state.amechanics.editingId = null;
        await loadAmechanics();
    } catch (error) {
        setError("amechanics", error);
    }
}

export function startEditingAmechanic(id) {
    state.amechanics.editingId = id;
    renderRoute();
}

export function cancelEditingAmechanic() {
    state.amechanics.editingId = null;
    renderRoute();
}

// <------------ Orders --------------->

export async function loadOrders() {
    state.orders.status = "loading";
    renderRoute();
    const needsLoad = (key) => state[key].status === "idle" || state[key].status === "error";
    try {
        const [items] = await Promise.all([
            OrdersApi.readAll(),
            needsLoad("cars") ? loadCars() : null,
            needsLoad("amechanics") ? loadAmechanics() : null,
        ]);
        state.orders.items = items;
        state.orders.status = "success";
        state.orders.error = null;
    } catch (error) {
        state.orders.status = "error";
        state.orders.error = error.message;
    }
    renderRoute();
}

export async function createOrder(data) {
    try {
        await OrdersApi.create(data);
        await loadOrders();
    } catch (error) {
        setError("orders", error);
    }
}

export async function updateOrder(id, data) {
    try {
        await OrdersApi.update(id, data);
        state.orders.editingId = null;
        await loadOrders();
    } catch (error) {
        setError("orders", error);
    }
}

export async function deleteOrder(id) {
    try {
        await OrdersApi.delete(id);
        if (state.orders.editingId === id) state.orders.editingId = null;
        await loadOrders();
    } catch (error) {
        setError("orders", error);
    }
}

export function startEditingOrder(id) {
    state.orders.editingId = id;
    renderRoute();
}

export function cancelEditingOrder() {
    state.orders.editingId = null;
    renderRoute();
}
