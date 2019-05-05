const ProdutosController = require("../controllers/produtos-controller")

module.exports = (app) => {

	const controller = new ProdutosController(app)

	app.route("/produtos")
		.get(controller.listar.bind(controller))
		.post(controller.adicionar.bind(controller))

	app.get("/produtos/novo", controller.novo.bind(controller))

	app.get("/produtos/editar/:id", controller.editar.bind(controller))

	app.route("/produtos/:id")
		.delete(controller.excluir.bind(controller))
        .put(controller.alterar.bind(controller))
}