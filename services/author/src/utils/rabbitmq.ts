import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.RABBITMQ_HOST || "localhost",
      port: parseInt(process.env.RABBITMQ_PORT || "5672"),
      username: process.env.RABBITMQ_USER || "admin",
      password: process.env.RABBITMQ_PASSWORD || "admin123"
    });

    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

export const publishToQueue = async (queueName: string, message: any) => {
  try {
    if (!channel) {
      console.error("RabbitMQ channel is not initialized");
      return;
    }

    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true
    });

    console.log(`Message published to queue ${queueName}`);
  } catch (error) {
    console.error("Error publishing to queue:", error);
  }
};

export const invalidateCacheJob = async (cacheKeys: string[]) => {
  try {
    const message = {
      action: "invalidateCache",
      key: cacheKeys
    };
    await publishToQueue("cache_invalidation_queue", message);
    console.log("Cache invalidation job published:", message);
  } catch (error) {
    console.error("Error creating invalidate cache job:", error);
  }
};
