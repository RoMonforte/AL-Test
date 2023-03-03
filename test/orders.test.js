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
});