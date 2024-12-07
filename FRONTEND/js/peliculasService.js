const API_BASE_URL = "https://utn-cines-production.up.railway.app"; // Cambia esto a la URL base de tu API

async function getPeliculas() {
    const res = await fetch(`${API_BASE_URL}/AllPelis`);
    const resJson = await res.json();
    return resJson;

}
