import axios from "axios";

export async function analyzeCode(code: string) {

    try {
        const response = await axios.post('http://localhost:3000/dev/devcode', { code });
        console.log("Code sent to backend");
    } catch (err) {
        console.error("Error sending code: ", err)
    }

}