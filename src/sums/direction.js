const direction = (isPositive, isVertical) => ({isVertical, isPositive})

const DIRECTION = {
    'up': direction(false, true),
    'right': direction(true, false),
    'down': direction(true, true),
    'left': direction(false, false)
}

const dxy = direction => {
    const {isPositive, isVertical} = direction
    const d = (1-2*!isPositive)
    return {
        x: !isVertical*d, 
        y: isVertical*d
    }
  }
const rotate = (direction, clockwise = true) => {}

const invert = direction => ({
    ...direction,
    isPositive: !direction.isPositive
})

const changeDirection = (current, next) => 
    current.isVertical === next.isVertical ? current : next 

export {DIRECTION, dxy, rotate, invert, changeDirection}