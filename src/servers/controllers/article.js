import Article from '../models/article'
import slugify from 'slugify'
import sequelize from '../utils/database'
import { Op } from 'sequelize'

const response = {
	success: false,
	resdata: [],
	message: ""
}

export const addArticle = async (req, res) => {
	const { id } = req.session.user
	const { title, content, tags } = req.body
	await Article.create({ title, content, userId: id, tags: tags.toString(), slug: slugify(title.toLowerCase() + '-' + id, '-') }).catch(err => {
		console.log(err)
		response.success = false
		response.message = JSON.stringify(err)
		res.json(response)
	})
	response.resdata = req.body
	response.success = true
	res.json(response)
}

export const fetchArticle = async (req, res) => {
	let limit = 5
	let offset = 0 + (req.body.page - 1) * limit
	const data = await Article.findAndCountAll({ include: 'user', limit, offset })
	const recommended = await Article.findOne({ order: sequelize.random() })
	response.success = true
	response.resdata = { data, recommended }
	res.json(response)
}

export const detailArticle = async (req, res) => {
	const { slug } = req.params
	const data = await Article.findOne({ where: { slug }, include: 'user' })
	response.success = data ? true : false
	response.resdata = data
	res.json(response)
}

export const searchArticle = async (req, res) => {
	const { search } = req.body
	const data = await Article.findAll({ where: { title: { [Op.like]: `%${search}%` } } })
	response.success = data ? true : false
	response.resdata = data
	res.json(response)
}