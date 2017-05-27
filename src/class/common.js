export default class Common {

  /**
   * @description Hydrate current instance with obj attributes
   * @param obj
   * @param attributes
   */
  hydrate(obj, attributes) {
    if (!obj) return
    for (let item of attributes) {
      this[item] = (obj[item]) ? obj[item] : ''
    }
  }

  /**
   * @description Return number with padding
   * @example if id = 10, return 0010
   * @param num
   * @param size
   * @return {string}
   * @private
   */
  pad(num, size) {
    let output = num.toString()
    while (output.length < size) output = `0${output}`
    return output
  }

  /**
   * @description Check if is a number
   * @param n
   * @returns {boolean}
   * @private
   */
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

}
