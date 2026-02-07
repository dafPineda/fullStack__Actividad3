class PedidoRepository{
    #id
    #pedidos
    constructor(){
        this.#id = 1
        this.#pedidos = []
    }
    create(producto, cantidad){
        const nuevoPedido = {
            id:this.#id++,
            producto,
            cantidad,
            estado: "Pendiente"
        }
        this.#pedidos.push(nuevoPedido)
        return nuevoPedido
    }
    getAll(){
        return [...this.#pedidos]
    }
    getById(id){
        const buscado = this.#pedidos.find(pedido => pedido.id === id);
        if(!buscado) return null
        return buscado
    }
    update(id, data){
        const pedido = this.getById(id);
        pedido.producto = data.producto
        pedido.cantidad = data.cantidad
        pedido.estado = data.estado
        return pedido;
    }
    remove(id){
        const index = this.#pedidos.findIndex(pedido => pedido.id === id)
        if(index === -1) return null
        return this.#pedidos.splice(index,1)
    }
}

module.exports = {PedidoRepository}