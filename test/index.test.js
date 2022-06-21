const DAOFactory = require("../models/daos/daos.factory");
const assert = require('node:assert').strict;

describe("TEST PROUCTS", () => {
  let product;
  let testing = {};
  let response = { post: false, get: { all: false, one: false }, put: false, delete: false };
  before(() => product = DAOFactory().product);

  describe("method: POST", () => {
    it("Deberia guardar un producto", async () => {
      const savedProduct = await product.save({ 
        title: "product test 1",
        price: 10,
        thumbnail: "https://comunidad.retorn.com/wp-content/uploads/cache/2018/09/gatitos/3008811440.jpg",
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      assert.strictEqual(typeof savedProduct, "object")
      if(savedProduct) {
        testing._id = await savedProduct._id;
        response.post = true;
      }
    });
  });
  describe("method: GET", () => {
    it("Deberia leer todos los productos", async () => {
      const allProducts = await product.getAll();
      assert.strictEqual(Array.isArray(allProducts), true);
      assert.strictEqual(allProducts.length >= 0, true);
      response.get.all = true;
    });
    it(`Deberia leer un producto (el que se acaba de crear)}`, async () => {
      const productFound = await product.getById(testing._id);
      assert.strictEqual(typeof productFound, "object");
      assert.deepStrictEqual(productFound._id, testing._id);
      response.get.one = true;
    });
  });
  // describe("method: PUT", () => {
  //   it("Deberia actualizar un producto, ejemplo: 62b0f1fe66d6076ba999a61d", async () => {
  //     const productFound = await product.getById("62b0f1fe66d6076ba999a61d");
  //     const updatedProduct = await product.updateById("62b0f1fe66d6076ba999a61d", { title: "product test 1 - updated" });
  //     console.log("updatedProduct: ", updatedProduct);
  //     assert.deepStrictEqual(updatedProduct.title != productFound.title, true);
  //   });
  // });
  after(() => console.log(`
    TEST FINISHED!
      >> [POST]: ${response.post ? "✔" : "❌"} 
      >> [GET]: ${(response.get.all && response.get.one) ? "✔" : "❌"} 
      >> [PUT]: ${response.put ? "✔" : "❌"} 
      >> [DELETE]: ${response.delete ? "✔" : "❌"} 
  `));
});