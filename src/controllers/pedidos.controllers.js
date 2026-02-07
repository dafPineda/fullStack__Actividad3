const {PedidoRepository} = require("../repositories/pedidos.repository.js")
const repositorio = new PedidoRepository()

function create(req, res){
    const nuevoPedido = req.body
    if(Array.isArray(nuevoPedido)) return res.status(400).json({error:"No arrays"})
    if(!nuevoPedido) return res.status(400).json({error:"No content"})
    if(!nuevoPedido.producto || !nuevoPedido.cantidad) return res.status(400).json({error:"Falta producto y cantidad"})
    if(typeof nuevoPedido.producto !== 'string' || nuevoPedido.producto.length <3) return res.status(400).json({error:"Producto invalido"})
    const cantidad = Number(nuevoPedido.cantidad)
    if(!cantidad || cantidad <=0) return res.status(400).json({error:"Cantidad invalida"})
    const nuevo = repositorio.create(nuevoPedido.producto, cantidad)
    return res.status(201).json(nuevo) 
}
function getAll(req, res){
    return res.json(repositorio.getAll())
}
function getById(req, res){
    const id = Number(req.params.id)
    const pedido = repositorio.getById(id)
    if(!pedido) return res.status(404).json({error:"Not found"})
    return res.status(200).json(pedido)
}
function update(req, res){
    const id = Number(req.params.id)
    const data = req.body
    let modificado = true
    const pedido = repositorio.getById(id)

    if(!pedido) return res.status(404).json({error:"Not found"})
    if(!data) return res.status(400).json({error:"Vacío"})
    if(data.producto){
        if(data.producto.length < 3 || typeof data.producto !== 'string') return res.status(400).json({error:"Producto invalido"})
        modificado = false
    }
    if(data.cantidad){
        const cantidad = Number(data.cantidad)
        if(cantidad <=0) return res.status(400).json({error:"Cantidad invalida"})
        modificado = false
    }
    if(data.estado){
        if(typeof data.estado !== 'string') return res.status(400).json({error:"Estado invalido"})
        if(data.estado.toLowerCase() !== "confirmado" && data.estado.toLowerCase() !== "cancelado") return res.status(400).json({error:"Estado debe ser cancelado o confirmado"})
        if(!pedido.estado || pedido.estado.toLowerCase() === "confirmado" || pedido.estado.toLowerCase() === "cancelado") return res.status(400).json({error: "Pedido finalizado"})
        modificado = false        
    }
    if(modificado) return res.status(304).json({error:"Sin cambios"})
    const actualizado = repositorio.update(id,data)
    return res.status(200).json(actualizado)
}
function remove(req, res){
    const id = Number(req.params.id)
    const pedido = repositorio.getById(id)
    if(!pedido) return res.status(404).json({error:"Not Found"})
    if(pedido.estado.toLowerCase() === 'confirmado' || pedido.estado.toLowerCase() ==="cancelado") return res.status(400).json({error:"Pedido finalizado"})
    const eliminado = repositorio.remove(id)
    if(!eliminado) return res.status(404).json({error:"Not found"})
    return res.status(200).json(eliminado)
}

module.exports = {create, getAll, getById, update, remove}