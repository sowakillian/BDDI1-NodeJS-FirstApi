require("dotenv").config();

const server = require("./server");
const { pipeline } = require("stream");
const request = require("request");
const tweetSplitter = require("./tweetsUtils/tweetSplitter");
const tweetParser = require("./tweetsUtils/tweetParser");
const logger = require("./logger");

//const httpStream = request.get("https://stream.twitter.com/1.1/statuses/sample.json", {
const httpStream = request.post(`${process.env.TWITTER_API_STREAM_URL}/statuses/filter.json`, {
    json: true,
    form: {
        track: "javascript",
        locations: "-122.75,36.8,-121.75,37.8"
    },
    oauth: {
        consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
        token: process.env.TWITTER_API_TOKEN,
        token_secret: process.env.TWITTER_API_TOKEN_SECRET
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

server.listen(process.env.PORT);
