const trampoline = fn => { 
    let result = fn
    while (typeof result === 'function') result = result()
    return result
  }
export default trampoline