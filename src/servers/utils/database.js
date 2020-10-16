import { Sequelize } from 'sequelize'

const { database_host, database_port, database_name, database_username, database_password } = process.env
const sequelize = new Sequelize(database_name, database_username, database_password, {
    dialect: 'mysql',
    host: database_host,
    port: database_port
})

export default sequelize