import { MqttClient } from "mqtt/*";
import { LogService } from "../services/logs.service";
import { CommandService} from "../services/commands.service";

const mqtt = require('mqtt'); // If using Node.js

export class AdafruitIO {

    private ADAFRUIT_USERNAME: string;
    private ADAFRUIT_AIO_KEY: string;
    private FEED_NAMEs: string[];
    public client: MqttClient;

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
                // this.client.publish(`${this.ADAFRUIT_USERNAME}/feeds/${feed}`, 'Hello from JavaScript!');
            })
            
        });

        // Handle incoming messages
        this.client.on('message', (topic: string, message: Buffer) => {
            console.log(`Received message on ${topic}: ${message.toString()}`);
            // Hard coded
            // if (topic == `${this.ADAFRUIT_USERNAME}/feeds/${this.FEED_NAMEs[0]}`) {
            //     // handle message into led channel
            //     console.log(`Message from ${this.FEED_NAMEs[0]}: ${message.toString()}`);

            //     // push the log to the database
            //     try {
            //         LogService.create("265c89cc-fa6e-4a05-81f7-6d0b8f37a50c", message.toString())
            //     }
            //     catch (error) {
            //         console.log(error);
            //     }
            // }
            // else if (topic == `${this.ADAFRUIT_USERNAME}/feeds/${this.FEED_NAMEs[1]}`) {
            //     // handle message into humidity channel
            //     console.log(`Message from ${this.FEED_NAMEs[1]}: ${message.toString()}`);

            //     // push the log to the database
            //     try {
            //         LogService.create("85646821-3d30-4f59-b136-68b7020b2920", message.toString())
            //     }
            //     catch (error) {
            //         console.log(error);
            //     }
            // }

            // split the message to get the feed
            const feed = topic.split('/').slice(-1)[0];
            
            // call the log service to update message to the database
            try {
                LogService.createFromFeed(feed, message.toString())
                CommandService.createFromFeed(feed, message.toString())
            }
            catch (error) {
                console.log(error);
            }
        });

        // Handle errors
        this.client.on('error', (err: any) => {
            console.error('MQTT Error:', err);
        });
    }

    static async uploadApplianceInfo() {

    }

}

