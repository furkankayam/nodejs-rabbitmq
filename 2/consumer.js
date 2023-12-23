//npm init -y
//npm install --save amqplib
// package.json --test--> clear  --> "publisher" : "node publisher.js"
//                               --> "consumer" : "node consumer.js"
//npm run consumer

//Seri Mesaj Alma

const amqp = require("amqplib")
const queueName = process.argv[2] || "jobQueue"
console.log("queueName", queueName);

connect_rabbitmq();

async function connect_rabbitmq() {
    
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName)

        //Mesaji Alinmasi..
        console.log("Mesaj Bekleniyor...");
        channel.consume(queueName, message => {
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