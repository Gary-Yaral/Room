/**
 * This function generates one object using the data of a array as properties in false
 * @param {Array<String|Number>} categories All categories of products
 * @returns {Object} Object with properties in false
 */
const generateValidator = (categories) => {
  let categoriesKey = {}
  categories.forEach(key => {
    if(!categoriesKey[key]) {
      categoriesKey[key] = false
    }
  })

  return categories
}

/**
 * This function creates a object selecting one product for each category
 * @param {Array<Object>} products All products to filter 
 * @param {Array<String|Number>} categories All categories to filter
 * @returns {Array<Object>} Selected products aleatory way
 */
const getAleatoryProducts = (products, categories) => {
  let limit = categories.length
  let max = products.length - 1
  let min = 0
  let aleatory = []
  let validator = generateValidator(categories)
  let complete = false
  while (complete === false) {
    if(limit === aleatory.length) {
      complete = true
    } else {
      let id = Math.floor(Math.random()*(max-min+1)+min)
      let foundProduct = products[id]
      let category = foundProduct.category
      if(!validator[category]) {
        aleatory.push(foundProduct)
        categories[category] = true
      }
    }
  }
  return aleatory 
}

module.exports = { getAleatoryProducts }