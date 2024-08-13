const root = document.querySelector('#root')
root.style.width = '50%'
root.style.height = '500px'

const canvas = container => {
    const canvas = document.createElement('canvas')
    canvas.style.width = '480'
    canvas.style.height = '720'
    container.appendChild(canvas)
    return canvas
}

const screen = canvas(root)

const ctx = screen.getContext('2d')


const loop = () => {
    const $TIMESTAMP = 10
    let rAF
    let isPaused = false
    let input = null
    
    const grid = {columns:40, rows:25}
    const render = require('./render').default(ctx)(grid)
    let gameboard =  require('./gameboard').newGame(grid)
    const next = require('./gameboard').next(grid)    
    
    document.addEventListener('keypress', key => {
        switch (key.code) {
            case 'KeyP':
                if (!isPaused)
                {
                    window.cancelAnimationFrame(rAF)
                    isPaused = true
                }
                else 
                {
                    isPaused = false
                    rAF = window.requestAnimationFrame(loop)
                }    
                break;
            case 'KeyW':if (!isPaused) input = 'up'
            break;
            case 'KeyD':if (!isPaused) input = 'right'
            break;
            case 'KeyA':if (!isPaused) input = 'left'
            break;
            case 'KeyS':if (!isPaused) input = 'down'
            break;
            case 'KeyZ':if (!isPaused) input = 'turnLeft'
            break;
            case 'KeyX':if (!isPaused) input = 'tuenRight'
            break;
            default: null
                break;
        }
    })
    
    const loop =  () => {
        
        if(rAF%$TIMESTAMP == $TIMESTAMP-1) 
        {
            const then = gameboard.scene
            gameboard = next(gameboard, input)
            render(then, gameboard.scene)
        } 
        else 
        {
            
        }
        rAF = window.requestAnimationFrame(loop)
    }
    rAF = window.requestAnimationFrame(loop)
}
loop()
