const {describe, test, expect} = require('@jest/globals');
const { getAleatoryProducts } = require('../helpers/handleAleatory') 

describe('Generate favorites', () => {
  let categories  = ['Jugos', 'Comidas', 'Postres']
  let products = [
    {
      id:1,
      name: 'Cola',
      category: 'Jugos'
    },
    {
      id:2,
      name: 'Pulpin',
      category: 'Jugos'
    },
    {
      id:3,
      name: 'Hamburguesa',
      category: 'Comidas'
    },
    {
      id:4,
      name: 'Papas fritas',
      category: 'Comidas'
    },
    {
      id:5,
      name: 'Magnum chocolate',
      category: 'Postres'
    },
    {
      id:6,
      name: 'Helado Polito',
      category: 'Postres'
    }
  ]

  const favorites = getAleatoryProducts(products, categories)

  test('Should return one product for each category', () => {
    expect(categories.length === favorites.length).toBeTruthy()
  })

  test('Should return the same categories', () => {
    let obj = []
    favorites.forEach(product => {
      obj.push(product.category)
    })

    let categoriesCopy = [...categories]
    let orderedObject = obj.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })

    let orderedCategories = categoriesCopy.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
    
    expect(orderedObject).toEqual(orderedCategories)
  })

})