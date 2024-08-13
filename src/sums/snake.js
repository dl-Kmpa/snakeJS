import { dequeue, enqueue, peck, pop } from "../utils/deque"
import { sum } from "./vector"
import { dxy } from "./direction"

const snake = (head, tail = []) => ({head, tail})

const head = (direction, position) => ({direction, position})

const stretch = (snake, direction) => {
    const {head, tail} = snake
    return {
        head: {
            direction,
            position: sum(dxy(direction), head.position)
        },
        tail: enqueue(tail, head.position)
    }
}

const shrinks = snake => ({
    head: snake.head,
    tail: dequeue(snake.tail)
})

export { snake, head, stretch, shrinks}