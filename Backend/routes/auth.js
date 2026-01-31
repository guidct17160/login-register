const express = require('express')
const db = require('../db')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET


router.post('/forgot-password', async (req, res) => {
    const { username } = req.body
    const result = await db.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
    )
    if(result.rows.length === 0 ){
        return res.status(404).json({message:'User not found'})
    }
    const user = result.rows[0]
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expire = new Date(Date.now()+15*60*1000)
    await db.query(
        `UPDATE users SET reset_token = $1, reset_token_expire = $2 WHERE username = $3`,
        [resetToken,expire,username]
    )
    res.json({message:'Reset token generated', resetToken:resetToken})
})

router.post('/reset-password',async(req,res)=>{
    const { token , newPassword} = req.body
    const result = await db.query(
        `SELECT * FROM users WHERE reset_token = $1 AND reset_token_expire > NOW()`,
        [token]
    )
    if(result.rows.length === 0 ){
        return res.status(400).json({message:'Invalid or expired reset token'})
    }
    const hashedPassword = await bcrypt.hash(newPassword,10)
    await db.query(
        `UPDATE users SET password = $1, reset_token = NULL, reset_token_expire = NULL
        WHERE id = $2`,
        [hashedPassword, result.rows[0].id]
    )
    res.json({message:'Password has been reset successfully'})
})

router.post('/register',async (req,res)=>{
    const{username,password} = req.body
    const existingUser = await db.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
        
    )
    if(existingUser.rows.length > 0){
        return  res.status(400).json({message:'Username already exists'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.query(
        `INSERT INTO users(username,password)VALUES ($1,$2)`,
        [username,hashedPassword]
    )
    res.json({message:'Register success'})
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body
    const result = await db.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]

    )
    if(result.rows.length === 0 ){
        return res.status(404).json({messgae:'User not found'})

    }

    const user = result.rows[0]
    const isMatch = await bcrypt.compare(password, user.password)
    

    if(!isMatch){
        return res.status(401).json({message:'Wrong password'})

    }
    const token = jwt.sign(
        { id:user.id,username:user.username},
        JWT_SECRET,
        {expiresIn:'1h'}
    )
    
    res.json({message:'Login Successful', token})
})

router.get('/',async(req,res)=>{
    const result = await db.query(`SELECT id,username,password FROM users`)
    res.json(result.rows)
})

router.get('/profile', auth,(req,res)=>{
    res.json({user:req.user})
})

module.exports = router
