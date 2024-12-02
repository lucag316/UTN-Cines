async function getPeliculas() {
    const res = await fetch("http://localhost:5000/AllPelis");
    const resJson = await res.json();
    return resJson;

}
