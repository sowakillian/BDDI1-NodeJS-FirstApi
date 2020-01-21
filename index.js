const { pipeline } = require("stream");
const request = require("request");
const tweetSplitter = require("./tweetsUtils/tweetSplitter");
const tweetParser = require("./tweetsUtils/tweetParser");
const logger = require("./logger");

//const httpStream = request.get("https://stream.twitter.com/1.1/statuses/sample.json", {
const httpStream = request.post("https://stream.twitter.com/1.1/statuses/filter.json", {
    json: true,
    form: {
        track: "javascript",
        locations: "-122.75,36.8,-121.75,37.8"
    },
    oauth: {
        consumer_key: "P7DaVudQIzftBaUqKSiKOwpwA",
        consumer_secret: "bl9AXGvyYxvsNFQug7U43tUKVW0vrVFrcK1mns25zRoWAUqNfh",
        token: "1218209939249881092-n3OlmB6RJ3IDJM7RppBbpmLU0iK1Ya",
        token_secret: "ke56vloLKUpwFvqfAiPRdDT3AeFxk7RTWyGGIszoDQLXO"
    }
});

pipeline(
    httpStream,
    tweetSplitter,
    tweetParser,
    logger,
    error => {
        console.error("error", error);
    }
);
