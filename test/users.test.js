const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const expect = chai.expect;
const jwt = require("jsonwebtoken");

const { config } = require("./../config/config");

chai.use(chaiHttp);

describe("Test of all users routes", () => {
  let token;

  before(() => {
    const payload = { sub: 1, role: "admin" };
    token = jwt.sign(payload, config.jwtSecret);
  });

  describe("GET /", () => {
    it("should return the the users in db.", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${token}`)
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("role");
      expect(res.body[0]).to.have.property("username");
    });
  });

  describe("GET /:id", () => {
    it("should return a single user of the db.", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .get("/api/v1/users/4")
        .set("Authorization", `Bearer ${token}`)
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("role");
      expect(res.body).to.have.property("username");;
    });
  });

  describe("POST /", () => {
    it("should create a new user in the db", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .post("/api/v1/users")
        .set("Authorization", `Bearer ${token}`)
        .send({ username: "test", role: "test", password: 'test500' });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("username", "test");
      expect(res.body).to.have.property("role", "test");
    });
  });
});

