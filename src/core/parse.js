export function parse(value = '') {
  try {
    if (value.startsWith('=')) {
      const sliced = value.slice(1)
      return eval(sliced)
    }
  
    return value
  } catch (error) {
    // console.log(error);
  }
}