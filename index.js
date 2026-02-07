const express = require('express')
const { router: pedidosRouter } = require('./src/routes/pedidos.routes.js')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Listo');
})

app.use('/pedidos', pedidosRouter);

app.listen(3000, () => {
  console.log("Servidor Corriendo")
})