const axios = require('axios');
const HF_API_KEY = process.env.HF_API_KEY
const HF_INFERENCE_ENDPOINT = process.env.HF_INFERENCE_ENDPOINT || 'https://api-inference.huggingface.co/models/openai/whisper-large-v3'

export class SpeechController {
    public static query = async (req: any, res: any) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        try {
            const flacFile = req.file.buffer; // get the buffer of the file
            const response = await fetch(
                `${HF_INFERENCE_ENDPOINT}`,
                {
                    headers: {
                        Authorization: `Bearer ${HF_API_KEY}`,
                        "Content-Type": "audio/flac",
                    },
                    method: "POST",
                    body: JSON.stringify(flacFile),
                }
            );
            if (!response.ok) {
                console.log(`Error calling HF API: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            return res.status(200).json(data);  // TODO: process the audio to get the command

        }
        catch (error: any) {
            console.log(`Error querying the model: ${error.response?.data || error.message}`)
            return res.status(500).json({ message: 'Error querying the model' });
        }
        

        // the req body contains audio flac file
    }
}