//npm init -y
//npm install --save amqplib
// package.json --test--> clear  --> "publisher" : "node publisher.js"
//                               --> "consumer" : "node consumer.js"
//npm run consumer

const amqp = require("amqplib")

connect_rabbitmq();

async function connect_rabbitmq() {
    
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue("jobsQueue")

        //Mesaji Alinmasi..
        channel.consume("jobsQueue", message => {
            //ConsumerTag, routingKey, content
            //console.log("Message", message)

            //Sadece Content Bastirma
            console.log("Message", message.content.toString())

            //Gelen mesaji acknolage et. Yani okundu de.
            channel.ack(message);
        });
        
    } catch (error) {
        console.log("Error", error);
    }

}