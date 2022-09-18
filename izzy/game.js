'use strict'

// Constants
const SPEED = 300
const JUMP = 560 
const SNAIL_SPEED = 400
const GROUND = 450

// initialization
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"
kaboom({
    ////scale : 1,
    width: 800,
    height: 600,
    background : [0,255,255]
})

// load ressourcen
loadSprite('test', 'bug.png')
loadSprite('snail', 'snail.gif')
loadSprite('cloud1', 'cloud1.png')
loadSprite('cloud2', 'cloud2.png')
loadSprite('cloud3', 'cloud3.png')

// clouds
const cloud1 = add([
    sprite('cloud1'),
    pos(400, 60),
    origin('topright'),
    area(),
    'cloud'
])

const cloud2 = add([
    sprite('cloud2'),
    pos(700, 60),
    origin('topright'),
    area(),
    'cloud'
])

const cloud3 = add([
    sprite('cloud3'),
    pos(1000, 60),
    origin('topright'),
    area(),
    'cloud'
])

cloud1.onUpdate(() =>{
    cloud1.move(-40, 0)
    if(cloud1.pos.x < 0){
        cloud1.moveTo(width() + 450, cloud1.pos.y)
    }
})

cloud2.onUpdate(() =>{
    cloud2.move(-40, 0)
    if(cloud2.pos.x < 0){
        cloud2.moveTo(width() + 200, cloud2.pos.y)
    }
})

cloud3.onUpdate(() =>{
    cloud3.move(-40, 0)
    if(cloud3.pos.x < 0){
        cloud3.moveTo(width() + 200, cloud3.pos.y)
    }
})


// ground
const ground = add([
    rect(width(), 300),
    pos(0, GROUND),
    color([,200,0]),
    area(),
    solid()
])

// player
const player = add([
    sprite('test'),
    pos(width()/2, height()/2),
    scale(0.2),
    rotate(0),
    origin('center'),
    area({
        width: 650,
        height: 650,
        offset: [5, -10]}),
    body(),
])


// snails
function addSnail(){
    const snail = add([   
        sprite('snail'),
        pos(-100, GROUND - 80),
        area({width: 330,   
            height: 280,    
            offset: [30, 10]
        }), 
        body(),
        scale(0.2),   
        'snail'
    ]) 
}

player.onCollide('snail', (snail) => {
    //debug.log('collision')
    
})


let auto = true

onUpdate('snail', (s) =>{
    s.move(SNAIL_SPEED, 0)
    if(s.pos.x > width()){
        destroy(s)
    }

    if(auto){

        let p = player.pos.x - 210 - 17

        if(s.pos.x  > p && s.pos.x < p + 30){
            player.jump(JUMP)
            // same position as before
            player.pos.x = width()/2
    }
}
})


function randomSnail(){
    let t 
    t = rand(0.9, 3)
    //t = 0.9
    wait(t, () =>{
        addSnail()
        randomSnail()
    })
}
randomSnail()
 

// key handler
onKeyPress('p', () =>{
    if(auto){
        auto = false
    }else{
        auto = true
    }
    
})
  
onKeyPress('space', () =>{
    if(player.isGrounded()){
        player.jump(JUMP)
    }
    
})

onKeyDown('right', () => {
    player.move(SPEED, 0)
})

onKeyDown('left', () => {
    player.move(-SPEED, 0)
})
debug.inspect = false

