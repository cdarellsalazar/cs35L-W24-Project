const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const {authorization } = req.headers
    //console.log('auth running')

    if(!authorization) {
        return res.status(401).json({error: 'Requires Authorization Token'})
    }

    const token = authorization.split(' ')[1]

    console.log(token)

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
       // console.log('user: ', req.user)
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized' })
    }
}

module.exports = requireAuth