async function getPeliculas() {
    const res = await fetch("http://localhost:8080/db_utn_cines");
    const resJson = await res.json();
    return resJson;

}