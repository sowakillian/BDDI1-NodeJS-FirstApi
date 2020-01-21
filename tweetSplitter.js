const { Transform } = require("stream");

const tweetSplitter = new Transform({
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
        if(this.remainingData == null) {
            this.remainingData = "";
        }

       const currentData  = this.remainingData + chunk.toString("utf8");
        const lines = currentData.split(/\r\n/);

        this.remainingData = lines.pop();

        lines.forEach(line => { this.push(line); });

        callback();
    }
});

module.exports = tweetSplitter; // (default export)
//exports.tweetParser = tweetParser (named export)
