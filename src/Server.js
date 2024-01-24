import app from "./App.js"

//Definir a Porta
const PORT = process.env.PORT || 3000

//Escutar a porta 
app.listen(PORT, () => {
    console.log(`Servidor rodando na endereço http://localhost:${PORT}`)
})