import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

const RASTER = 25
const COLUMNS = 9
let g_stop = false
const wall_color = [150,150,150]
const bg_color = []
let falling = false

kaboom({
    background : bg_color
})


function make_brick(px, py, rx, ry, tag, bcolor){
    add([
        rect(RASTER, RASTER),
        pos(px, py),
        area(),
        color(bcolor),
        outline(2),
        {rx:rx, ry:ry, isFrozen:false},
        tag
    ])
}
 
function rot90(brick){
    let rx = brick.rx
    let ry = brick.ry

    let x = brick.pos.x
    let y = brick.pos.y

    x = x - rx
    y = y - ry

    let x_old = x
    let y_old = y
    x =  -y_old
    y =   x_old

    x = x + rx
    y = y + ry

    brick.pos.x = x 
    brick.pos.y = y  
}

function brick_t(rx, ry){
    const bcolor = [255,0,255]
    const btag = 'brick'
    const r = RASTER
    make_brick(rx - r, ry    ,rx, ry, btag, bcolor)
    make_brick(rx    , ry    ,rx, ry, btag, bcolor)
    make_brick(rx + r, ry    ,rx, ry, btag, bcolor)
    make_brick(rx    , ry -r ,rx, ry, btag, bcolor)
    //add([circle(5), pos(rx, ry)])
}

function brick_i(rx, ry){
    const bcolor = [0,255,255]
    const btag = 'brick'
    const r = RASTER
    make_brick(rx -  2 * r, ry, rx , ry, btag, bcolor)
    make_brick(rx -      r, ry, rx, ry, btag, bcolor)
    make_brick(rx         , ry, rx, ry, btag, bcolor)
    make_brick(rx +      r, ry, rx, ry, btag, bcolor)
    //add([circle(5), pos(rx, ry)])
}

function brick_s(rx, ry){
    const bcolor = [0,255,0]
    const btag = 'brick'
    const r = RASTER
    make_brick(rx - 1 * r, ry,   rx, ry, btag, bcolor)
    make_brick(rx        , ry,   rx, ry, btag, bcolor)
    make_brick(rx        , ry-r, rx, ry, btag, bcolor)
    make_brick(rx +     r, ry-r, rx, ry, btag, bcolor)
    //add([circle(5), pos(rx, ry)])
}

function brick_z(rx, ry){
    const bcolor = [255,0,0]
    const btag = 'brick'
    const r = RASTER
    make_brick(rx - 1 * r, ry - r, rx, ry, btag, bcolor)
    make_brick(rx        , ry - r, rx, ry, btag, bcolor)
    make_brick(rx        , ry    , rx, ry, btag, bcolor)
    make_brick(rx +     r, ry    , rx, ry, btag, bcolor)
    //add([circle(5), pos(rx, ry)])
}

function brick_o(rx, ry){
    const bcolor = [255,255,0]
    const btag = 'brick'
    const r = RASTER
    const d1 = -r/2
    const d2 = -r/2
    make_brick(rx -r , ry - r, rx + d1, ry + d2, btag, bcolor)
    make_brick(rx    , ry - r, rx + d1, ry + d2, btag, bcolor)
    make_brick(rx -r , ry    , rx + d1, ry + d2, btag, bcolor)
    make_brick(rx    , ry    , rx + d1, ry + d2, btag, bcolor)
    //add([circle(5), pos(rx, ry)])
}

function brick_j(rx, ry){
    const bcolor = [30,144,255]
    const btag = 'brick'
    const r = RASTER
    const d1 = -r / 2
    const d2 = -r / 2
    make_brick(rx - 2 * r , ry - r, rx + d1, ry + d2, btag, bcolor)
    make_brick(rx - 1 * r , ry - r, rx + d1, ry + d2, btag, bcolor)
    make_brick(rx - 0 * r , ry - r, rx + d1, ry + d2, btag, bcolor)
    make_brick(rx - 0 * r , ry    , rx + d1, ry + d2, btag, bcolor)
    //add([circle(5), pos(rx, ry)])
}

function brick_l(rx, ry){
    const bcolor = [255,128,0]
    const btag = 'brick'
    const r = RASTER
    make_brick(rx - 2 * r , ry, rx , ry, btag, bcolor)
    make_brick(rx - 1 * r , ry, rx , ry, btag, bcolor)
    make_brick(rx - 0 * r , ry, rx , ry, btag, bcolor)
    make_brick(rx - 0 * r , ry -r  , rx, ry  , btag, bcolor)
    //add([circle(5), pos(rx, ry)])
}

function rand_brick(x, y){
    let i = Math.floor(rand(0, 7))
    switch(i){
        case 0: brick_i(x, y); return
        case 1: brick_j(x, y); return
        case 2: brick_l(x, y); return
        case 3: brick_o(x, y); return
        case 4: brick_s(x, y); return
        case 5: brick_t(x, y); return
        case 6: brick_z(x, y); return
    }
}
 
function test_bricks(){
    brick_i(100, 100)
    brick_j(300, 100)
    brick_l(500, 100)
    brick_o(650, 100)
    brick_s(100, 300)
    brick_t(300, 300)
    brick_z(500, 300)
}


addLevel([ 
    '             ',
    '  rrrrrrrrrrr',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  xooooooooox',
    '  fffffffffff',
],{
    width : RASTER,
    height : RASTER,
    x : () => [rect(RASTER, RASTER), color(wall_color), area(), solid(), outline(1), 'wall'],
    f : () => [rect(RASTER, RASTER), color(wall_color), area(), solid(), outline(1),'floor'],
    r : () => [rect(RASTER, RASTER), color(wall_color), area(), solid(), outline(1),'roof'],
    o : () => [rect(RASTER, RASTER), color([0,0,130]), outline(1)]
})

function move_brick(dx, dy){
    every('brick', (r) => {
        if(r.isFrozen==false){
            r.rx = r.rx + dx * RASTER
            r.ry = r.ry + dy * RASTER 

            let x = r.pos.x + dx * RASTER
            let y = r.pos.y + dy * RASTER
            r.moveTo(x, y)
        }
    })
}

function isColliding(tag1, tag2){
    let l1 = get(tag1)
    let l2 = get(tag2)
    let res = false

    for (const o1 of l1){
        for (const o2 of l2){
            if(o1.isColliding(o2)){
                return true
            }
        }
    }
    return false
}

function isCollidingBrick(){
    let l1 = get('brick')
    let l2 = get('brick')
    let res = false

    for (const o1 of l1){
        for (const o2 of l2){
            if( o1.isFrozen != o2.isFrozen){
                if(o1.isColliding(o2)){
                    return true
                }
            }
        }
    }
    return false
}

function rotate90(){
    every('brick', (r) => {
        if(r.isFrozen == false){
            rot90(r)
        }
        
    })
}

function freeze(){
    every('brick', (r) => {     
        r.isFrozen = true
    })

    // get completed rows
    let complRows = checkRowCompletion()
    let s = 'Completed rows '
    for(let nRow of complRows){
        deleteRow(nRow)
    }

    falling = false
}

function deleteRow(nRow){
    const l = get('brick')

    for(const r of l){
        if(r.pos.y == nRow * RASTER){
            destroy(r)
        }
    }

    for(const r of l){
        if(r.pos.y < nRow * RASTER){
            r.pos.y = r.pos.y + RASTER
        }
    }

}
  
function newBrick(){
    rand_brick(8 * RASTER, 3  * RASTER)
}

function rotateSave(){
    rotate90()
    if(isColliding('brick', 'wall')){
        rotate90()
        rotate90()
        rotate90()
    }
}

function downSave(dy){
    if(dy == undefined){
        dy = 0.5
    }
    move_brick(0, dy)
    if( isColliding('brick', 'floor')){
        move_brick(0, -dy)
        freeze()
        newBrick()
    }

    if( isCollidingBrick() ){
        move_brick(0, -dy)
        freeze()
        newBrick()
    }
}

function sideSave(dx){
    move_brick(dx, 0)

    if( isColliding('brick', 'wall')){
        move_brick(-dx, 0)
    }

    if( isCollidingBrick() ){
        move_brick(-dx, 0)
    }
}

loop(0.5, () => {
    if(g_stop == false){
        downSave()
    }
})

function checkRowCompletion(){
    let l = get('brick')
    let dic = {}

    // fill dictionary
    for(const brick of l){
        const row = brick.pos.y / RASTER
        let val = dic[row]
        if(val == null){
            val = 0
        }
        dic[row] = val + 1
    }
    
    // read full columns
    let res = []
    for(let key in dic){
           if(dic[key] == COLUMNS){
                key = parseFloat(key)
                res.push(key)
        }
    }
    return res
}

// Touch Control
const leftButton = add([
    rect(4 * RASTER, 3* RASTER),
    pos(2* RASTER, 26* RASTER),
    area()
])

const rightButton = add([
    rect(4 * RASTER, 3 * RASTER),
    pos(9* RASTER, 26* RASTER),
    area()
])

const rotateButton = add([
    rect(4 * RASTER, 3* RASTER),
    pos(2* RASTER, 30* RASTER),
    area()
])

const downButton = add([
    rect(4 * RASTER, 3 * RASTER),
    pos(9* RASTER, 30 * RASTER),
    area()
])

onTouchStart((id, pos) =>{
    if (leftButton.hasPoint(pos)){
        sideSave(-1)
    }
    if (rightButton.hasPoint(pos)){
        sideSave(1)
    }

    if (rotateButton.hasPoint(pos)){
        rotateSave()
    }

    if (downButton.hasPoint(pos)){
        falling = true
    }
})

onUpdate('brick', (b) => {
    if(falling == true){
        // determines fast falling
        downSave(0.2)
    }
})

onTouchEnd((id, pos) =>{
    if (downButton.hasPoint(pos)){
        falling = false
    }
})

onTouchMove((id, pos) =>{
    if ( pos.y < 24 * RASTER ){
        downSave()
        downSave()
    }
})

onKeyPress('s', () =>{
    if(g_stop == true){
        g_stop = false
    }else{
        g_stop = true
    }
})

onKeyPress('up', () =>{
       rotateSave() 
})

onKeyPress('space', () =>{
    rotateSave()
})

onKeyDown('down', () =>{
    falling = true 
})

onKeyPressRepeat('right', () =>{
    sideSave(1)
})

onKeyPressRepeat('left', () =>{
    sideSave(-1)
})


add([text('<'), pos(3 * RASTER, 26 * RASTER)])
add([text('>'), pos(10 * RASTER, 26 * RASTER)])
add([text('r'), pos(3 * RASTER, 30 * RASTER)])
add([text('v'), pos(10 * RASTER, 30 * RASTER)])
newBrick()
