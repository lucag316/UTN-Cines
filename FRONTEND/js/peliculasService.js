async function getPeliculas() {
    const res = await fetch("http://localhost:8080/api_utn_peliculas");
    const resJson = await res.json();
    return resJson;

}