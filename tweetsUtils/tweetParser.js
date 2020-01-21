const { Transform } = require("stream");

const tweetParser = new Transform({
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
        let data;

        try {
            data =  JSON.parse(chunk);
            console
        }
        catch(error) {
            console.warn("JSON parsing error", error);
        }

        if (data != null) {
            this.push(data);
        }

        callback();
    }
});

module.exports = tweetParser; // (default export)
//exports.tweetParser = tweetParser (named export)
