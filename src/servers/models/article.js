import { Sequelize } from 'sequelize'
import sequelize from '../utils/database'

const Article = sequelize.define('article', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Article