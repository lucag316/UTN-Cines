async function getPeliculas() {
    const res = await fetch("http://localhost:6000/api_utn_peliculas");
    const resJson = await res.json();
    return resJson;

}