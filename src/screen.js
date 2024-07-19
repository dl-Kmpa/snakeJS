const canvas = () => {
    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    return canvas
}

const screen = container => resolution => {
  const screen = layers => {
    
    const layer = id => layers[id]
    
    const addLayer = (id, zIndex) => {
      if (layers[id] === undefined) {
        const knvas = canvas()
        knvas.style.zIndex = zIndex
        container.appendChild(knvas)
        layers[id] = {canvas: knvas, render:() => {}}
      }
      return screen(layers)
    }
    
    const moveLayer = (id, zIndex) => {
      const layer = layers[id]
      if (layer !== undefined )
        layer.canvas.style.zIndex = zIndex
      return screen(layers)
    }
    
    const removeLayer = id => {
      const _layers = {}
      Object.keys(layers).forEach(
        key => {
          if (key === id) 
            container.removeChild(layers[key].canvas)
          else 
            _layers[key] = layers[key]
        }
      )
      return screen(_layers)
    }
    const changeResolution = () => {}

    return {
      layer,
      changeResolution,
      addLayer,
      moveLayer,
      removeLayer,
    }
  }
    
  return screen({})
}

export default screen