const express = require('express')
const router = express.Router()
const fs=require('fs')


/////////////////// PRE-HISTORIC CREATURES ROUTES/////////////////

router.get('/', (req, res)=>{
    
    let creatures= fs.readFileSync('./prehistoric_creatures.json')
    let creatureData=JSON.parse(creatures)
 
     // handle a query string if there is one
     let typeFilter= req.query.type
     console.log(typeFilter)
     if(typeFilter){
         creatureData=creatureData.filter((creature)=>{// reassign dinoData to only be an array of dinos whose name matches the query string name and make it ignore case
             return creature.type.toLowerCase() === typeFilter.toLowerCase()
         })
     }
     res.render('prehistoric-creatures/index', {creatures:creatureData})
 
     
 })

/////PRE-HISTORIC NEW ROUTE
router.get('/new', (req, res)=>{

    res.render('prehistoric-creatures/new')
})

//////////  PREHISTORIC CREATURES POST ROUTE
router.post('/', (req, res)=>{
    let creatures=  fs.readFileSync('./prehistoric_creatures.json')
    let creatureData=JSON.parse(creatures)
    creatureData.push(req.body)// push the new dino into the array
    // save the new dino data array to the dinosaurs.json file
    // JSON. stringify does the opposite of JSON.parse
    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))
    //redirect to the GET / dinosaurs route(index)
    res.redirect('/prehistoric-creatures')

})


///////// PREHISTORIC- CREATURES SHOW ROUTE////////////////////

router.get('/:idx', (req,res)=>{
    
    let creatures= fs.readFileSync('./prehistoric_creatures.json')
    let creatureData=JSON.parse(creatures)

    // get array index from url parameter

    let creatureIndex=req.params.idx
    // console.log(creatureData[creatureIndex])
    res.render('prehistoric-creatures/show', {creature: creatureData[creatureIndex], creatureId: creatureIndex})

})
module.exports = router