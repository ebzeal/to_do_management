import { ServiceResponseInterface } from "../../../utils/types";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import ItemServices from "../../../controllers/items/items.services";
import app from "../../../index";
import ItemController from "../../../controllers/items/item.controller";
import { singleList, stubList, stubListResponse } from "../../mockfiles";

chai.use(chaiHttp);
chai.should();

describe("ItemController", () => {
  describe("createItem", () => {
    it("should create a List item in the db", async () => {
      const response = await chai.request(app).post("/api/v1/item").send({
        description: "Go to spa",
        list_id: 1,
      });

      expect(response.status).to.eqls(201);
      expect(response.body.status).to.eqls(stubListResponse.status);
      expect(response.body.data.message).to.eqls("New Item has been added to List successfully");
    });

    it("should return error when creating an already existing item", async () => {
      const response = await chai.request(app).post("/api/v1/item").send({
        description: "Go to spa",
        list_id: 1,
      });

      expect(response.body.status).to.eqls("failure");
      expect(response.body.data.message).to.eqls("This item already exists");
    });
  });

  describe("updateItem", () => {
    it("should update a single item in the db", async () => {
      const response = await chai.request(app).patch("/api/v1/item/5").send({
        description: "Go to Shades Spa at noon",
        checked: true,
      });

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls("success");
      expect(response.body.data.message).to.deep.equals("item has been updated in List");
      expect(response.body.data).to.not.have.property("payload");
    });
  });

  describe("deleteItem", () => {
    it("should delete a single Item in the db", async () => {
      const response = await chai.request(app).delete("/api/v1/item/5");

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls("success");
      expect(response.body.data.message).to.deep.equals("item has been deleted from List");
      expect(response.body.data).to.not.have.property("payload");
    });

    it("return error for not found item", async () => {
      const response = await chai.request(app).delete("/api/v1/item/30");

      expect(response.body.status).to.eqls("failure");
      expect(response.body.data.message).to.deep.equals("item does not exist");
      expect(response.body.data).to.not.have.property("payload");
    });
  });
});
