"use strict";
const amqp = require("amqplib");

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    if (!connection) throw new Error("Connection not established");

    const channel = await connection.createChannel();

    return { channel, connection };
  } catch (error) {}
};
const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();
    const queue = "test";
    const messages = "Hello RabbitMQ";
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(messages));
    await connection.close();
  } catch (error) {
    console.error(`Error connecting to RabbitMQ`, error);
  }
};
module.exports = {
  connectToRabbitMQ,
  connectToRabbitMQForTest,
};
