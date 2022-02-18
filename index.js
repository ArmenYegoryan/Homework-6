import moment from "moment";
import fs from "fs";
import { Transform, Readable, Writable } from "stream";

const rs = new Readable({
    read() {
        setInterval(() => {
            this.push(moment().toISOString());
        }, 1000);
    },
});

const ws = new Writable({
    write(chunk, UTF8, next) {
        fs.writeFile("momentJS.txt", chunk, { flag: "a" }, next);
    }
})

const ts = new Transform({
    transform(chunk, UTF8, callback) {
        this.push((moment(chunk).format("MMMM Do YYYY, h:mm:ss a")).toString() + "\n");
        callback();
    }
})

rs.pipe(ts).pipe(ws);