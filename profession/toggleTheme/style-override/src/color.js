import color from 'css-color-function'
import formula from './formula.json'
const generateColors = (primary) => {
  let colors = {}
  // 遍历formula里面的value，将关键字通过css-color-function换成rgb颜色
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    // css-color-function提供的convert转换颜色
    colors[key] = color.convert(value)
  })

  return colors
}
export default generateColors
