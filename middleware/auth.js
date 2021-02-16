const jwt = require('jsonwebtoken');
module.exports = function(req,res,next)  {
    // GET thE TOKEN FROM HESADER
    const token = req.header('x-auth-token')

    // Check if not token
    if(!token){
        return res.status(401).json({ msg: 'no Token, access denied' })
    }
    try {
        const decoded  = jwt.verify(token, process.env.JWTSECRECT)
        req.user = decoded
        next()
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' })
    }
}