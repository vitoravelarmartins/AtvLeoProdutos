const util = require('util')
const { Produto } = require('../models')

class ProdutosController {
  constructor(app) {
    this._app = app
  }

  async listar(req, res) {
    const conn = req.connection

    // const query = util.promisify(conn.query).bind(conn)
    
    try {
      // const produtos = await query("SELECT * FROM produtos")
      const produtos = await Produto.findAll()
      res.render('produtos/listar', {produtos: produtos})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async novo(req, res) {
    const produtos = {}
    res.render("produtos/form", {produtos})
  }

  async adicionar(req, res) {
    const produto = req.body

    req.assert("nome", "Nome é obrigatório").notEmpty()
    req.assert("preco", "Preço é obrigatório").notEmpty()

    const erros = req.validationErrors()

    if (erros) {
      return res.render("produtos/form", {erros, produtos})
    }

    //const conn = req.connection
    // const query = util.promisify(conn.query).bind(conn)
    
    try {
      // await query("INSERT INTO produtos SET ?", produtos)
      await Produto.create(produto)
      res.redirect("/produtos")
    } catch(err) {
      res.render("form", {status: err}, produtos)
    }
  }

  async editar(req, res) {
    const id = req.params.id
    // const conn = req.connection

    // const query = util.promisify(conn.query).bind(conn)
    
    try {
      // const produtos = await query("SELECT * FROM produtos WHERE id =? ", [id])
      // res.render('produtos/form', {produtos: produtos[0]})
      const produtos = await Produto.findByPk(id)
      res.render('produtos/form', {produtos})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async excluir(req, res) {
    const id = req.params.id
    // const conn = req.connection

    // const query = util.promisify(conn.query).bind(conn)
    
    try {
      // await query("DELETE FROM produtos WHERE id =? ", [id])
      await Produto.destroy({where:{id}})
      res.redirect('/produtos')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async alterar(req, res) {
    const id = req.params.id
    const produtos = req.body
    // const conn = req.connection

    // const query = util.promisify(conn.query).bind(conn)
    
    try {
      // await query("UPDATE produtos SET ? WHERE id =? ", [produtos, id])
      await Produto.update(produtos,{where: {id}})
      res.redirect('/produtos')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

}

module.exports = ProdutosController