const {getAleatoryProducts} = require('../helpers/handleAleatory')

/**
 * Contains all categories that will be used on the fronted
 * @type Array<String|Number>
 * */

const categories = [
  'Pizzas', 
  'Bebidas', 
  'Postres', 
  'Empanadas'
]

/**
 * Contains all products that will be used on the fronted
 * @type Array<Object>
 */
const products = [
  {
    id: 1,
    productName: 'Pizza napolitana',
    description: 'Pizza con bordes elevados, sabor italiano',
    price: 1900,
    category: 'Pizzas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588347/don%20remolo/Pizzas/Pizza_napolitana_b1ghjs.png',
  },
  {
    id: 2,
    productName: 'Pizza de rucula y jamón',
    description: 'Base de pizza con salsa de tomate, muzzarella, rúcula y jamón.',
    price: 1900,
    category: 'Pizzas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588346/don%20remolo/Pizzas/Pizza_de_rucula_y_jam%C3%B3n_fqazt8.png',
  },
  {
    id: 3,
    productName: 'Pizza sin TACC',
    description: 'Base de pizza libre de gluten con salsa de tomate y muzzarella.',
    price: 2200,
    category: 'Pizzas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588344/don%20remolo/Pizzas/Pizza_sin_TACC_ibmxqf.png',
  },
  {
    id: 4,
    productName: 'Pizza de muzzarella',
    description: 'Base de pizza con salsa de tomate y muzzarella.',
    price: 1800,
    category: 'Pizzas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588343/don%20remolo/Pizzas/Pizza_de_muzzarella_ei09yz.png'
  },
  {
    id: 5,
    productName: 'Pizza de jamón y morrón',
    description: 'Base de pizza con salsa de tomate, muzzarella, jamon y morron.',
    price: 2100,
    category: 'Pizzas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588339/don%20remolo/Pizzas/Pizza_de_jam%C3%B3n_y_morr%C3%B3n_eaafiu.png',
  },
  {
    id: 6,
    productName: 'Helado conotu',
    description: 'Helado de dulce de leche',
    price: 400,
    category: 'Postres',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588424/don%20remolo/Postres/image-3_xjnz3g.png'
  },
  {
    id: 7,
    productName: 'Helado Sei Bom blanco',
    description: 'Helado de vainilla y chocolate blanco',
    price: 500,
    category: 'Postres',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588423/don%20remolo/Postres/image-1_p5ekod.png'
  },
  {
    id: 8,
    productName: 'Helado Sei Bom chocolate',
    description: 'Helado de chocolate',
    price: 450,
    category: 'Postres',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588423/don%20remolo/Postres/image-2_xl4sf0.png'
  },
  {
    id: 9,
    productName: 'Copa helada cookies',
    description: 'Helado de vainilla y oreos',
    price: 400,
    category: 'Postres',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588423/don%20remolo/Postres/image-4_rmspty.png'
  },
  {
    id: 10,
    productName: 'Helado Sei Bom almendrado',
    description: 'Helado almendrado',
    price: 550,
    category: 'Postres',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588422/don%20remolo/Postres/image_lpdnld.png'
  },
  {
    id: 11,
    productName: 'Helado Piccole',
    description: 'Helado de frutilla',
    price: 350,
    category: 'Postres',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588418/don%20remolo/Postres/image-5_tgohgq.png'
  },
  {
    id: 12,
    productName: 'Coca cola original 2.25L',
    description: 'Bebida gaseosa Coca cola original 2.25L',
    price: 500,
    category: 'Bebidas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588300/don%20remolo/Gaseosas/Coca_cola_original_2.25L_bbuggi.png',
  },
  {
    id: 13,
    productName: 'Fanta naranja 2.25L',
    description: 'Bebida gaseosa fanta naranja 2.25L',
    price: 250,
    category: 'Bebidas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588300/don%20remolo/Gaseosas/Fanta_naranja_2.25L_okgfgo.png',
  },
  {
    id: 14,
    productName: 'Fanta naranja 1.25L',
    description: 'Bebida gaseosa fanta naranja 1.25L',
    price: 450,
    category: 'Bebidas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588299/don%20remolo/Gaseosas/Fanta_naranja_1.5L_pdtrru.png',
  },
  {
    id: 15,
    productName: 'Coca cola sin azucar 1.5L',
    description: 'Bebida gaseosa Coca cola sin azucar 1.5L',
    price: 250,
    category: 'Bebidas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588297/don%20remolo/Gaseosas/Coca_cola_sin_az%C3%BAcar_dun9m6.png',
  },
  {
    id: 16,
    productName: 'Cerveza Schneider Lager 473cc',
    description: 'Lata de cerveza marca Schneider 473cc',
    price: 350,
    category: 'Bebidas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588298/don%20remolo/Gaseosas/Cerveza_schneider_dethfu.png',
  },
  {
    id: 17,
    productName: 'Cola Sprite 2.25L',
    description: 'Bebida gaseosa cola Sprite 2.25L',
    price: 250,
    category: 'Bebidas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588300/don%20remolo/Gaseosas/Fanta_naranja_2.25L_okgfgo.png',
  },
  {
    id: 18,
    productName: 'Coca cola original 1.5L',
    description: 'Bebida gaseosa Coca cola original 1.5L',
    price: 250,
    category: 'Bebidas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588300/don%20remolo/Gaseosas/Fanta_naranja_2.25L_okgfgo.png',
  },
  {
    id: 19,
    productName: 'Cerveza Noire',
    description: 'Lata de cerveza Noire',
    price: 300,
    category: 'Bebidas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588294/don%20remolo/Gaseosas/Cerveza_negra_ckrysp.png',
  },
  {
    id: 20,
    productName: 'Empanadas de carne',
    description: 'Relleno de carne picada, pimiento y cebolla.',
    price: 400,
    category: 'Empanadas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588264/don%20remolo/Empanadas/Empanadas_de_carne_g9rjmg.png',
  },
  {
    id: 21,
    productName: 'Empanadas de atún',
    description: 'Relleno de atún, pimiento y cebolla.',
    price: 420,
    category: 'Empanadas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588263/don%20remolo/Empanadas/Empanadas_de_at%C3%BAn_cjxhzy.png',
  },
  {
    id: 22,
    productName: 'Empanadas de JYQ',
    description: 'Relleno de jamón y queso.',
    price: 350,
    category: 'Empanadas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588259/don%20remolo/Empanadas/Empanadas_de_JYQ_zccruc.png',
  },
  {
    id: 23,
    productName: 'Empanadas de pollo',
    description: 'Relleno de pollo con vegetales.',
    price: 410,
    category: 'Empanadas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588259/don%20remolo/Empanadas/Empanadas_de_pollo_odnvxg.png',
  },
  {
    id: 24,
    productName: 'Empanadas con TACC',
    description: 'Relleno de carne picada, pimiento y cebolla.',
    price: 400,
    category: 'Empanadas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588256/don%20remolo/Empanadas/Empanadas_si_TACC_v7catx.png',
  },
  {
    id: 25,
    productName: 'Empanadas árabes',
    description: 'Relleno de carne picada, cebolla y tomate.',
    price: 350,
    category: 'Empanadas',
    urlImage: 'https://res.cloudinary.com/dug5xmfwj/image/upload/v1664588254/don%20remolo/Empanadas/Empanadas_%C3%A1rabes_iebetd.png',
  },
]

/**
 * Contains all favorites products that were selected of aleatory way
 * @type Array<Object>
 */
const favorites = getAleatoryProducts(products, categories)

/**
 * All data that will be used on the fronted
 * @type Object
 */
const data = {categories, products, favorites}

module.exports = {data}