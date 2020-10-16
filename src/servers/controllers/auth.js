import User from '../models/user'
import fs from 'fs'

const response = {
    success: false,
    resdata: [],
    message: ""
}

export const login = async (req, res) => {
    const { username, password } = req.body
    const data = await User.findOne({ where: { username, password } })
    if (data) {
        response.success = true
        response.resdata = data
        req.session.user = data
        response.message = 'Login Berhasil'
    } else {
        response.success = false
        response.message = 'User Tidak Ditemukan'
    }
    res.json(response)
}

export const logout = async (req, res) => {
    req.session.destroy()
    response.success = true
    response.message = 'Logout Berhasil'
    res.json(response)
}

export const register = async (req, res) => {
    const { username, password, name, email, gender } = req.body
    const { destination, path, mimetype } = req.file

    const namefile = `${username}.${mimetype.split('/')[1]}`
    User.create({ username, password, name, email, gender, avatar: namefile }).then(result => {
        fs.rename(`${path}`, `${destination}/${namefile}`, (err) => {
            response.success = true
            response.message = 'Data Telah Di Registrasi'
            res.json(response)
        })
    })

}

export const profile = async (req, res) => {
    const { username } = req.params
    const data = await User.findOne({ username })
    response.success = true
    response.resdata = data
    res.json(response)
}