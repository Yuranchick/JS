export class ApiRepository {
 #baseUrl;
 #type;
 constructor(baseUrl, type) {
 this.#baseUrl = baseUrl;
 this.#type = type;
 }
 async readAll() {
 const response = await fetch(`${this.#baseUrl}?type=${this.#type}`);
 if (!response.ok) throw new Error(`Помилка завантаження: ${response.status}`);
 return response.json();
 }
 async readById(id) {
 const response = await fetch(`${this.#baseUrl}?type=${this.#type}&id=${id}`);
 if (!response.ok) throw new Error(`Помилка завантаження: ${response.status}`);
 return response.json();
 }
 async create(item) {
 const response = await fetch(`${this.#baseUrl}?type=${this.#type}`, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(item),
 });
 if (!response.ok) throw new Error(`Помилка створення: ${response.status}`);
 return response.json();
 }
 async update(id, changes) {
 const response = await fetch(`${this.#baseUrl}?type=${this.#type}&id=${id}`, {
 method: "PATCH",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(changes),
 });
 if (!response.ok) throw new Error(`Помилка оновлення: ${response.status}`);
 return response.json();
 }
 async delete(id) {
 const response = await fetch(`${this.#baseUrl}?type=${this.#type}&id=${id}`, {
 method: "DELETE",
 });
 if (!response.ok) throw new Error(`Помилка видалення: ${response.status}`);
 return response.json();
 }
}

const API_BASE_URL = "http://localhost/mock-server/api.php"
export const CarsApi = new ApiRepository(API_BASE_URL, "car_hobrei")
export const AMechanicsApi = new ApiRepository(API_BASE_URL, "amechanic_hobrei")
export const OrdersApi = new ApiRepository(API_BASE_URL, "order_hobrei")