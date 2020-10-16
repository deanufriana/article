import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser'
import multer from 'multer'

import User from './servers/models/user'
import Article from './servers/models/article'
import sequalize from './servers/utils/database'
import session from 'express-session'
import { login, logout, profile, register } from './servers/controllers/auth'
import { addArticle, detailArticle, fetchArticle, searchArticle } from './servers/controllers/article'
import MySQLStore from 'express-mysql-session'

const app = express()
const upload = multer({ dest: 'static/avatars' })
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app.use(session({
	secret: 'articleapp',
	store: new MySQLStore({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'silkyheart09',
		database: 'article'
	}),
	cookie: { secure: false, expires: 28800000, httpOnly: false },
	resave: false,
	saveUninitialized: false
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/login', login)
app.post('/logout', logout)
app.get('/profilejson/:username', profile)
app.post('/register', upload.single('avatar'), register)
app.post('/addArticle', upload.single('path'), addArticle)
app.post('/fetchArticle', fetchArticle)
app.get('/readmorejson/:slug', detailArticle)
app.post('/searchArticle', searchArticle)

Article.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Article)

sequalize.sync({ force: false }).then(result => {
	app
		.use(
			compression({ threshold: 0 }),
			sirv('static', { dev }),
			sapper.middleware({
				session: (req, res) => ({
					user: req.session.user
				})
			})
		)
		.listen(PORT, err => {
			if (err) console.log('error', err);
		});

})