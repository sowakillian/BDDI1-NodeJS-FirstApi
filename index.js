const { pipeline } = require("stream");
const request = require("request");

const httpStream = request.get("https://reqres.in/api/users")

pipeline(
    httpStream,
    process.stdout,
    error => {
        console.error("error", error);
    }
);
