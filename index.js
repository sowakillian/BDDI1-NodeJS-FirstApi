require("dotenv").config();

const { server, wsServer } = require("./server");
const { pipeline } = require("stream");
const request = require("request");
const tweetSplitter = require("./tweetsUtils/tweetSplitter");
const tweetParser = require("./tweetsUtils/tweetParser");
const logger = require("./logger");

const WsWriter = require("./wsWritter");

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

const twitterStream = httpStream
    .pipe(tweetSplitter)
    //.pipe(tweetParser);

//pipeline(
//    httpStream,
//    tweetSplitter,
//    tweetParser,
//    logger,
//    error => {
//        console.error("error", error);
//    }
//);

wsServer.on('connection', (ws) => {
    console.log("new connection");
    ws.send('du texte');

    ws.on('message', (message) => {
        console.log("message du client", message)
    });

    const wsWriter = new WsWriter(ws);
    twitterStream.pipe(wsWriter);
});

server.listen(process.env.PORT);
