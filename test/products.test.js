const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const expect = chai.expect;
const jwt = require ('jsonwebtoken');

const {config} = require('./../config/config');

chai.use(chaiHttp);

describe("Test of all products routes", () => {
    let token;

    before(() => {
        const payload = { sub: 1,
            role: 'admin' };
        token = jwt.sign(payload, config.jwtSecret);
      });

  describe("GET /", () => {
    it("should return the 3 products in db.", async () => {
    const res = await chai.request('http://localhost:3000').get("/api/v1/products");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array").with.lengthOf(3);
      expect(res.body[0]).to.have.property("code");
      expect(res.body[0]).to.have.property("name");
      expect(res.body[0]).to.have.property("price");
    });
  });

  describe("GET /:code", () => {
    it("should return a single product of the db.", async () => {
    const res = await chai.request('http://localhost:3000').get("/api/v1/products/TSHIRT");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("code");
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("price");
    });
  });

  describe("POST /", () => {
    it("should create a new product in the db", async () => {
        const res = await chai.request('http://localhost:3000').post("/api/v1/products")
        .set('Authorization', `Bearer ${token}`)
        .send({ code: "5678", name: "New Product", price: 100 });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("code", "5678");
      expect(res.body).to.have.property("name", "New Product");
      expect(res.body).to.have.property("price", 100);
    });
  });
});

//   describe("PATCH /:code", () => {
//     it("should update a product", async () => {
//       const res = await chai
//         .request(server)
//         .patch("/products/5678")
//         .send({ price: 200 });
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an("object");
//       expect(res.body).to.have.property("code", "5678");
//       expect(res.body).to.have.property("name", "New Product");
//       expect(res.body).to.have.property("price", 200);
//     });
//   });

//   describe("DELETE /:code", () => {
//     it("should delete a product", async () => {
//       const res = await chai.request(server).delete("/products/5678");
//       expect(res).to.have.status(201);
//       expect(res.body).to.be.an("object");
//       expect(res.body).to.have.property("code", "5678");
//     });
//   });
