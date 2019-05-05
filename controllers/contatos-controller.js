const util = require('util')
const { Contato } = require('../models')

class ContatosController {
  constructor(app) {
    this._app = app
  }

  async listar(req, res) {
    // const conn = req.connection

    // const query = util.promisify(conn.query).bind(conn)

    try {
      // const contatos = await query("SELECT * FROM contatos")
      const contatos = await Contato.findAll()
      res.render('contatos/listar', { contatos: contatos })
    } catch (err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async novo(req, res) {
    const contato = {}
    res.render("contatos/form", { contato })
  }

  async adicionar(req, res) {
    const contato = req.body

    req.assert("nome", "Nome é obrigatório").notEmpty()
    req.assert("email", "E-mail é obrigatório").notEmpty()

    const erros = req.validationErrors()

    if (erros) {
      return res.render("contatos/form", { erros, contato })
    }

    const conn = req.connection
    // const query = util.promisify(conn.query).bind(conn)

    try {
     // await query("INSERT INTO contatos SET ?", contato)
     await Contato.create(contato)
      res.redirect("/contatos")
    } catch (err) {
      res.render("form", { status: err }, contato)
    }
  }

  async editar(req, res) {
    const id = req.params.id
    // const conn = req.connection

    // const query = util.promisify(conn.query).bind(conn)

    try {
      // const contatos = await query("SELECT * FROM contatos WHERE id =? ", [id])
      // res.render('contatos/form', { contato: contatos[0] })
      const contato = await Contato.findByPy(id)
      res.render('contatos/form', {contato})
    } catch (err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async excluir(req, res) {
    const id = req.params.id
    // const conn = req.connection

    // const query = util.promisify(conn.query).bind(conn)

    try {
      await Contato.destroy({where:{id}})
      // await query("DELETE FROM contatos WHERE id =? ", [id])
      res.redirect('/contatos')
    } catch (err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async alterar(req, res) {
    const id = req.params.id
    const contato = req.body
    // const conn = req.connection

    // const query = util.promisify(conn.query).bind(conn)

    try {
      await Contato.update(contato,{where: {id}})
      // await query("UPDATE contatos SET ? WHERE id =? ", [contato, id])
      res.redirect('/contatos')
    } catch (err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

}

module.exports = ContatosController