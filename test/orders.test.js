const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../index");
const jwt = require("jsonwebtoken");

const { config } = require("../config/config");

chai.use(chaiHttp);

describe("Test of all orders routes", () => {
  let token;

  before(() => {
    const payload = { sub: 1, role: "admin" };
    token = jwt.sign(payload, config.jwtSecret);
  });

  describe("GET /", () => {
    it("should return all orders in db.", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .get("/api/v1/orders");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("total");
      expect(res.body[0]).to.have.property("pantsDiscount");
      expect(res.body[0]).to.have.property("bulkDiscount");
      expect(res.body[0]).to.have.property("toPay");
    });
  });

  describe("GET /:id", () => {
    it("should return a single order(11) of the db.", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .get("/api/v1/orders/11");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("total");
      expect(res.body).to.have.property("pantsDiscount");
      expect(res.body).to.have.property("bulkDiscount");
      expect(res.body).to.have.property("toPay");
    });
  });

//   describe("POST /", () => {
//     it("should create a new product in the db", async () => {
//       const res = await chai
//         .request("http://localhost:3000")
//         .post("/api/v1/products")
//         .set("Authorization", `Bearer ${token}`)
//         .send({ code: "5678", name: "New Product", price: 100 });
//       expect(res).to.have.status(201);
//       expect(res.body).to.be.an("object");
//       expect(res.body).to.have.property("code", "5678");
//       expect(res.body).to.have.property("name", "New Product");
//       expect(res.body).to.have.property("price", 100);
//     });
//   });

//   describe("PATCH /:code", () => {
//     it("should update the created product in db", async () => {
//       const res = await chai
//         .request("http://localhost:3000")
//         .patch("/api/v1/products/5678")
//         .set("Authorization", `Bearer ${token}`)
//         .send({ price: 200 });
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an("object");
//       expect(res.body).to.have.property("code", "5678");
//       expect(res.body).to.have.property("name", "New Product");
//       expect(res.body).to.have.property("price", 200);
//     });
//   });
//   describe("DELETE /:code", () => {
//     it("should delete the created product in db and return no the beginning", async () => {
//       const res = await chai
//         .request("http://localhost:3000")
//         .delete("/api/v1/products/5678")
//         .set("Authorization", `Bearer ${token}`);
//       expect(res).to.have.status(201);
//       expect(res.body).to.be.an("object");
//       expect(res.body).to.have.property("code", "5678");
//     });
//   });
});