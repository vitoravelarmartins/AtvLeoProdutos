const ContatosController = require("../controllers/contatos-controller")

module.exports = (app) => {

	const controller = new ContatosController(app)

	app.route("/contatos")
		.get(controller.listar.bind(controller))
		.post(controller.adicionar.bind(controller))

	app.get("/contatos/novo", controller.novo.bind(controller))

	app.get("/contatos/editar/:id", controller.editar.bind(controller))

	app.route("/contatos/:id")
		.delete(controller.excluir.bind(controller))
		.put(controller.alterar.bind(controller))
}