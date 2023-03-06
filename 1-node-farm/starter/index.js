const fs =  require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate')


////////////////////////////////////////////////////////////////
////// Files
// //Blocking, synchros way
// const textIn =  fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn} .\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

// //nonBlocking,  asychronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => { 
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => { 
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => { 
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('Your file has been Written ❤️');
//             });
//         });
//     });
// });
// console.log('While reading file');

////////////////////////////////////////////////////////////////
////// Server

const tmpOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tmpCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tmpProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs  = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs); 

 const server = http.createServer((req,res) => {

    const {query, pathname} = (url.parse(req.url, true));

    //overview page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-Type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tmpCard, el)).join('');
        const output = tmpOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);


        res.end(output);

        //product page
    }else if(pathname === '/product'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tmpProduct,product);
        url.replace(slugs);
        res.end(output);

        //API page
    }else if(pathname === '/api'){
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(data);

        //Not found
    }else{
        res.writeHead(404,{
            'content-type': 'text/html'
        });
        res.end('<h1>Page Not Found 404</h1>');
    }
 });
 server.listen(8000, '127.0.0.1',() =>{
    console.log('Server listening on port 8000');
 });


