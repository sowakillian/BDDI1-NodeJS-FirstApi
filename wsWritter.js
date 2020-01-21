const { Writable } = require("stream");

class WsWriter extends Writable {
    constructor(ws) {
        super();
        this.ws = ws;
    }

    _write(chunk, encoding, callback) {
        if (this.ws != null) {
            this.ws.send(chunk.toString());
        }

        callback();
    }
}

module.exports = WsWriter;
