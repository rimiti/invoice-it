export default class Common {
  /**
   * @description Hydrate current instance with obj attributes
   * @param obj
   * @param attributes
   */
  hydrate(obj, attributes) {
    if (!obj) return;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of attributes) {
      this[item] = (obj[item]) ? obj[item] : '';
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
  pad(num, size = 3) {
    let output = num.toString();
    while (output.length < size) output = `0${output}`;
    return output;
  }

  /**
   * @description Check if is a number
   * @param n
   * @returns {boolean}
   * @private
   */
  isNumeric(n) {
    return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
  }

  /**
   * @description Round float with x decimals
   * @param num
   * @param decimals, default 2 decimals
   * @returns {number}
   */
  round(num, decimals = 2) {
    if (!(`${num}`).includes('e')) {
      return +(`${Math.round(`${num}e+${decimals}`)}e-${decimals}`);
    }
    const arr = (`${num}`).split('e');
    let sig = '';
    if (+arr[1] + decimals > 0) sig = '+';
    return +(`${Math.round(`${+arr[0]}e${sig}${+arr[1] + decimals}`)}e-${decimals}`);
  }

  /**
   * @description Format number to return number with two decimals
   * @param num
   * @return {string}
   */
  formatOutputNumber(num) {
    const number = num.toString();
    if (number.includes('.')) {
      const split = number.split('.');
      if (split[1].length === 1) return `${split[0]}.${split[1]}0`;
      else if (split[1].length === 2) return number;
      return `${split[0]}.${split[1][0]}${split[1][1]}`;
    }
    return `${number}.00`;
  }
}
