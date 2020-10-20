const express= require('express')
const app=express()
const ejsLayouts=require('express-ejs-layouts')
const fs=require('fs')
const dino = require('./controllers/dinosaurs')
const critters= require('./controllers/prehistoric-creatures')


app.set('view engine', 'ejs')
app.use(ejsLayouts)
/// body parser middleware- it makes req.body work
app.use(express.urlencoded({extended: false}))
app.use('/dinosaurs', dino)
app.use('/prehistoric-creatures',critters)

app.get('/', (req, res)=>{
    res.render('home')
})

app.listen(8000, ()=>{
    console.log('You\re listening to the smooth sounds of port 8000')
})