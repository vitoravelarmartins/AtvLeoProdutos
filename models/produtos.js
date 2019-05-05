const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: DataTypes.STRING,
        preco: DataTypes.DECIMAL(10,2)
    },
        {
            tableName: 'produtos',
            sequelize
        })
    return Produto
}