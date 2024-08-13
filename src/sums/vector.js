const vector = (x, y) => ({x, y})

const sum = (v1, v2) => vector(v1.x + v2.x, v1.y + v2.y)

const compare = (v1, v2) => v1.x === v2.x && v1.y === v2.y

export { vector, sum, compare }