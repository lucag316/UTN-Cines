const app = require("./app")


const PORT = app.get("port")

app.listen(PORT,()=> console.log(`Servidor corriendo en puerto ${PORT}`));// usar bactics en vez de comillas




