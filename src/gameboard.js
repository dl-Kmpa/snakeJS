import {DIRECTION, rotate, changeDirection} from './sums/direction'
import {shrinks, stretch } from './sums/snake'
import {compare} from './sums/vector'

const gameboard = (scene, score = 0, gameover = false) => ({scene, score, gameover})

const randomApple = ({columns, rows}, snake) => {
    const avoid = [snake.head.position, ...snake.tail]
    
    const grid = []
    
    for (let x = 0; x < columns; x++) {
        const row = []
        for (let y = 0; y < rows; y++) {
            row[y] = [x,y]
        }
        grid[x] = row
    }
        
    for (let index = 0; index < avoid.length; index++) {
        const {x,y} = avoid[index]
        grid[x][y] = null
    }

    const allowed = grid.flat().filter(value => value !== null)
    const result = allowed[Math.round(Math.random() * allowed.length)]
    return {
        x: result[0],
        y: result[1]
    }
}

const arrange = (position, grid) => {
    const arrange = (value, max) => 
        value < 0 ? max-1 : value > max-1 ? 0 : value
    const {columns, rows} = grid
    const {x, y} = position
    return {
        x: arrange(x, columns),
        y: arrange(y, rows)
    }
}
const nextDirection = (input, direction) => 
    input !== null 
    ? ( input === 'turnRight' || input === 'turnLeft' )
        ? rotate(direction, input === 'turnRight') 
        : (() => {
            const next = DIRECTION[input]
            return next !== undefined && changeDirection(direction, next)
        })()
    : direction
const next = grid => (gameboard, input) => {
    const {scene, score, gameover} = gameboard
    return gameover ? gameboard : (() => {
        const tryDirection = nextDirection(input, scene.snake.head.direction, grid)
        const stretchSnake = stretch(scene.snake, tryDirection)
        const snake = shrinks({
            ...stretchSnake,
            head: {
                ...stretchSnake.head,
                position: arrange(stretchSnake.head.position, grid)
            }
        })
        const canEat = compare(scene.apple, arrange(stretchSnake.head.position, grid))
        
        const collide = canEat 
            ? false 
            : snake.tail.find(value => compare(snake.head.position, value)) !== undefined
        const next = canEat 
            ? {
                snake: stretchSnake, 
                apple: randomApple(grid, snake)
            } 
            : collide 
                ? scene
                : {
                    snake, 
                    apple: scene.apple
                }
        return {
            scene: next, 
            score: canEat ? score + 1 : score, 
            gameover: collide ? true : gameover
        }
    })()
    
}


const newGame = (grid) => {
    const snake = (() => {
        const direction = DIRECTION['up']
        const position = {x: Math.round(grid.columns/2),y: Math.round(grid.rows/2)}
        const tail = []
        const {x, y} = position
        for (let index = 0; index < 3; index++) {
            tail[index] = {x , y: y + index + 1}
        }
        return {
            head: {direction, position},
            tail
        }
    })()
    const apple = randomApple(grid, snake)
    return gameboard({snake, apple})
}    

export {newGame, next, randomApple}