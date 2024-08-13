const rect = (x, y, width, height) => ({x, y, width, height})

const adjustDimentions = (rect, ratio) => (
    {...rect, 
        width: width*ratio.x,
        height: height*ratio.y
    }
)
    
const adjustPosition = (rect, ratio) => {
    const d = dimention => (dimention*ratio - dimention)/2
    return {
        ...rect, 
        x:d(rect.x, ratio.x), 
        y:d(rect.y, ratio.y)
    }
}

export { rect, adjustDimentions, adjustPosition }