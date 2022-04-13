import chai from "chai";
import chaiHttp from "chai-http";

import app from "../index";

chai.use(chaiHttp);
const { expect } = chai;

describe("Welcome", () => {
  it("should return success", async () => {
    const response = await chai.request(app).get("/api/v1/");
    expect(response.body).to.be.equal("Power your Todos!");
    expect(response).to.have.status(200);
  });
  it("Undefined API routes should return a 404", async () => {
    const response = await chai.request(app).get("/");
    expect(response).to.have.status(404);
  });
});
