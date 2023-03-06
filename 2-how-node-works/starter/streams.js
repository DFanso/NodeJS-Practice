const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 1
    // fs.readFile('test-file.txt', 'utf8', (err,data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    //solution 2: streams
    // const readable = fs.createReadStream('test-file.txt')
    // readable.on('data', chuck => {
    //     res.write(chuck)
    // });
    // readable.on('end', () =>{
    //     res.end();
    // });
    // readable.on('error',  err  =>{
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found");
    // });

    //Solution 3
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res);
    // readableSourced.pipe(WritableDestination);


});



server.listen(8000, ()=> {
    console.log('listening on 8000');
});