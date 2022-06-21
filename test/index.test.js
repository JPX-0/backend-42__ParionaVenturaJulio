const daosFactory = require("../models/daos/daos.factory");
const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
// const should  = require("chai").should();
// const env = require("../utils/config/env.config");


describe("TEST PRODUCTS - methods HTTP", () => {
  let user; // se instancia el dao de Products.
  const testing = {}; // recibe un id de el producto a testear.
  const response = { // se genera las condiciones para el reporte.
    post: false, 
    get: { all: false, one: false }, 
    put: false, 
    delete: false 
  };
  let account = { username: "admin.new@test.com", password: "test" };
  let cookie;
  before(async () => daosFactory().user);

  describe('method: [POST]', () => {
    it("Logeo + redireccion a la página de productos", async () => {
      const response = await request.post("/api/auth/login").send(account);
      cookie = response.headers["set-cookie"];
      expect(response.status).to.eql(302);
      expect(response.header['location']).to.eql('/api/data/product/get');
    });
    it("Deberia guardar un producto", async () => {
      const response = await request.post("/api/data/product/post").set('Cookie', cookie).send({
        title: "product test 1",
        price: 10,
        thumbnail: "https://comunidad.retorn.com/wp-content/uploads/cache/2018/09/gatitos/3008811440.jpg",
      });
      expect(response.status).to.eql(201);
    });
  });
  // describe('method: [GET]', () => {
  //   it("Deberia ingresar a la pagina de productos logeado", async () => {
  //     const response = await request.get(`/api/data/product/get`).set('Cookie', cookie)
  //     expect(Array.isArray(response.body)).to.eql(true);
  //   });
  // });
});