const http = require("http")
const app = require("./app")

//createServer accepte un callback qui a come paramétre la requete et la réponse

const port = process.env.PORT || 5000

app.set("port",port)

const server = http.createServer(app)

//si pas de variable d'en PORT , on va écouter le port 5000

server.listen(port ,() => {
    console.log("Listenning on " +port)
})