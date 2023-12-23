//npm init -y
//npm install --save amqplib
// package.json --test--> clear  --> "publisher" : "node publisher.js"
//                               --> "consumer" : "node consumer.js"
//npm run publisher

const amqp = require("amqplib")

const message = {
    description : "Bu bir test mesajidir.."
}

connect_rabbitmq();

async function connect_rabbitmq() {
    
    try {

        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        const assertion = await channel.assertQueue("jobsQueue")

        channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)))

        console.log("Gonderilen Mesaj", message)
        
    } catch (error) {
        console.log("Error", error);
    }

}