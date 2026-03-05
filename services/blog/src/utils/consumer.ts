import amqp from "amqplib";
import { redisClient } from "../server.js";
import { sql } from "./db.js";

interface CacheInvalidationMessage {
  action: string;
  key: string[];
}

export const startCacheConsumer = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.RABBITMQ_HOST || "localhost",
      port: parseInt(process.env.RABBITMQ_PORT || "5672"),
      username: process.env.RABBITMQ_USER || "admin",
      password: process.env.RABBITMQ_PASSWORD || "admin123"
    });

    const channel = await connection.createChannel();
    const queueName = "cache_invalidation_queue"; // same queue name as in publisher
    await channel.assertQueue(queueName, { durable: true });
    console.log(
      "Blog service cache invalidation consumer started :",
      queueName
    );

    channel.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const messageContent: CacheInvalidationMessage = JSON.parse(
            msg.content.toString()
          );

          console.log(
            "Blog service received cache invalidation message:",
            messageContent
          );

          if (messageContent.action === "invalidateCache") {
            for (const pattern of messageContent.key) {
              const keys = await redisClient.keys(pattern);
              if (keys.length > 0) {
                await redisClient.del(keys);
                console.log(
                  `Blog service invalidated ${keys.length} cache keys matching pattern: ${pattern}`
                );
                const category = "";
                const searchQuery = "";
                const cacheKey = `blog:${category}:${searchQuery}`;
                const blogs =
                  await sql`SELECT * FROM blogs ORDER BY created_at DESC`;
                await redisClient.set(cacheKey, JSON.stringify(blogs), {
                  EX: 3600
                });
                console.log(
                  `🔄️ Blog service refreshed cache for key: ${cacheKey} `
                );
              }
            }
          }
          channel.ack(msg);
        } catch (error) {
          console.error(
            "❌ Error parsing cache invalidation message in blog service:",
            error
          );

          channel.nack(msg, false, true); // discard the message and requeue it for later processing
        }
      }
    });
  } catch (error) {
    console.error("❌ Error connecting to RabbitMQ Consumer:", error);
  }
};
