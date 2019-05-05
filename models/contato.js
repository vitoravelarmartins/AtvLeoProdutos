const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    const Contato = sequelize.define('Contato', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: DataTypes.STRING,
        email: DataTypes.STRING
    },
        {
            tableName: 'contatos',
            sequelize
        })
    return Contato
}