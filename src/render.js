import { compare } from './sums/vector'

const render = ctx => grid => {
    const $APPLE = 'red'
    const $SNAKE = 'grey'
    const width = ctx.canvas.clientWidth/grid.columns
    const height = ctx.canvas.clientHeight/grid.rows
    const tile = (x, y) => {
        return {
            x: x*width,
            y: y*height,
            width, 
            height
        }
    
    }
    
    const clearRect = rect => {
        const {x, y, width, height} = rect
        ctx.clearRect(x, y, width, height)
    }
    
    const drawRect = (rect, color) => {
        const {x, y, width, height} = rect
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.fillRect( x, y, width, height)
    }

    const render = (then, now) => {
        const eat = () => {
            clearRect(tile(then.apple.x, then.apple.y))
            drawRect(tile(now.apple.x, now.apple.y), $APPLE)
            drawRect(tile(then.apple.x, then.apple.y), $SNAKE)
        }
        const move = () => {
            const tail = then.snake.tail[then.snake.tail.length - 1]
            const head = now.snake.head.position
            clearRect(tile(tail.x, tail.y))
            drawRect(tile(now.apple.x, now.apple.y), $APPLE)
            drawRect(tile(head.x, head.y), $SNAKE)
        }
        
        !compare(then.apple, now.apple) 
            ? eat()
            : !compare(then.snake.head.position, now.snake.head.position) && move()
    }
    return render
}

export default render