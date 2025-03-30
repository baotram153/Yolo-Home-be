import { MqttClient } from "mqtt/*";

const mqtt = require('mqtt'); // If using Node.js

export class AdafruitIO {

    private ADAFRUIT_USERNAME: string;
    private ADAFRUIT_AIO_KEY: string;
    private FEED_NAMEs: string[];
    private client: MqttClient;

    // Connect to Adafruit IO MQTT broker
    constructor(username: string, key: string, feedName: string[]) {
        this.ADAFRUIT_USERNAME = username;
        this.ADAFRUIT_AIO_KEY = key;
        this.FEED_NAMEs = feedName;  // change this to individual feed

        // MQTT connection options
        const options = {
            username: this.ADAFRUIT_USERNAME,
            password: this.ADAFRUIT_AIO_KEY
        };

        this.client = mqtt.connect(`mqtt://io.adafruit.com`, options);

        // When connected
        this.client.on('connect', () => {
            console.log('Connected to Adafruit IO');
            
            this.FEED_NAMEs.map((feed) => {
                // Subscribe to get information from the feed
                this.client.subscribe(`${this.ADAFRUIT_USERNAME}/feeds/${feed}`, (err: any) => {
                    if (!err) {
                        console.log(`Subscribed to ${feed}`);
                    }
                });

                // Publish a test message to the feed
                this.client.publish(`${this.ADAFRUIT_USERNAME}/feeds/${feed}`, 'Hello from JavaScript!');
            })

            
        });

        // Handle incoming messages
        this.client.on('message', (topic: string, message: Buffer) => {
            console.log(`Received message on ${topic}: ${message.toString()}`);
        });

        // Handle errors
        this.client.on('error', (err: any) => {
            console.error('MQTT Error:', err);
        });
    }

    static async uploadApplianceInfo() {

    }

}

