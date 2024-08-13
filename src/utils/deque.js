const isEmpty = arr => arr.length === 0 

const peck = arr => arr[0]

const pop = arr => [_,...arr]

const enqueue = (arr, value) => [value,...arr]

const dequeue = arr => !isEmpty(arr) ? arr.slice(0, arr.length - 1) : []

export { isEmpty, peck, pop, enqueue, dequeue}