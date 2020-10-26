
const newBorderStyle = () => Math.random() > 0.5 ? 'dashed' : 'dotted'

const radius = () => Math.round(Math.random()) ? '0' : '50%'

const createHexPart = () => (Math.random() * 255 << 0).toString(16).padStart(2, '0');

const newHex = (count = 3) => {
  let result = '#'
  while (count > 0) {
    result += createHexPart()
    count--
  }
  return result
}

const animationName = () => {
  return Math.random() > 0.5 ? 'circle' : 'recircle'
}

const newBgColor = ()=> `linear-gradient(to bottom right, ${newHex()}, ${newHex()})`

const filterValue = (level)=> {
  if (level === 6) {
    return 'blur(1px)'
  } else if (level === 7) {
    return 'blur(1px) brightness(2)'
  } else if (level === 8) {
    return 'grayscale(75%) blur(1px)'
  } else {
    return 'none'
  }
}

const newSquare = (level = 0) => {
  const bgColor = newHex()
  return {
    backgroundColor: bgColor,
    backgroundImage: level > 4 && newBgColor(),
    borderColor: level ? newHex() : bgColor,
    borderRadius: level > 1 ? radius() : '0',
    borderStyle: level > 2 ? newBorderStyle() : 'solid',
    animationName: level > 3 ? animationName() : '',
    filter: filterValue(level)
  }
}

export const createSquares = (count, level = 0) => {
  return [...Array(count).keys()].map(item => newSquare(level))
}

const setEncryption = (num) => {
  const front = (num + 531) * 12345
  const last = front % 9
  return front + '' + last
}

const getEncryption = num => {
  const last = num % 10
  if (Math.floor(num / 10) % 9 === last) {
    console.log((num - last) / 10 / 12345 - 531)
    return Math.floor((num - last) / 10 / 12345 - 531)
  } else {
    return 0
  }
}

export const setNum = (key, value) => {
  window.localStorage.setItem(key, setEncryption(value))
}

export const getNum = (key) => {
  const num = Number(window.localStorage.getItem(key))
  return num ? getEncryption(num) : 0
}