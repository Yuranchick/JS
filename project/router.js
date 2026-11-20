import { renderCars } from "./views/cars.js";
import { renderAmechanics } from "./views/amechanics.js";
import { renderOrders } from "./views/orders.js";
import { state, loadCars, loadAmechanics, loadOrders } from "./state.js";

const DEFAULT_HASH = "#/cars";

const routes = {
    "#/cars":   { render: renderCars,   load: loadCars,   key: "cars" },
    "#/amechanics": { render: renderAmechanics, load: loadAmechanics, key: "amechanics" },
    "#/orders": { render: renderOrders, load: loadOrders, key: "orders" },
};

export function renderRoute() {
    const hash = routes[window.location.hash] ? window.location.hash : DEFAULT_HASH;
    const route = routes[hash];

    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.hash === hash);
    });

    route.render();

    if (state[route.key].status === "idle") {
        route.load();
    }
}
