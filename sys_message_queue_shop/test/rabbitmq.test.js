"use strict";
const { connectToRabbitMQForTest } = require("../dbs/init.rabbit");

describe("RabbitMQ Connection", () => {
  it("Should connect to succesfull Rabbit", async () => {
    const result = await connectToRabbitMQForTest();
    expect(result).toBeUndefined();
  });
});
