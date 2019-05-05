const mysql = require("mysql");
const database = "unifeob";

module.exports = () => {

	const connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database
		});

	return connection;
}