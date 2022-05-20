const faker = require('faker');
const boom = require('@hapi/boom');

class productsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(), //Emulamos un bloqueador de productos que no pueden ser visualizados
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid,
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
    //return this.products;
  }

  async findOne(id) {
    //const name = this.getTotal(); //Forzamos un error con una fucción que no existe
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;
  }

  async update(id, changes) {
    //No usamos find() porque no solo necesitamos saber si esta o no, tambien necesitamos saber la posición para eso existe findIndex()
    const index = this.products.findIndex((item) => item.id === id);

    //Convervamos el producto antes de la modificacion
    const product = this.products[index];

    //Comprobramos si existe, sino existe suele devolver un -1
    if (index === -1) {
      //throw new Error('Product not found MMG!'); Error creado por nosotros
      throw boom.notFound('Product not found MMG!');
    } else {
      this.products[index] = {
        ...product,
        ...changes,
      };
      return this.products[index];
    }
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Product not found');
    } else {
      // Averiguar mas sobre el metodo splice
      this.products.splice(index, 1);
      return {
        message: `Product ${index} deleted`,
      };
    }
  }
}

module.exports = productsService;
