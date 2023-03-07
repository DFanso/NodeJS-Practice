const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(file, (err, data) =>{
            if (err) reject ('could not find that file 😭')
            resolve(data);
        });
    });
};

const writeFilePro = (file,data) =>{
    return new Promise((resolve, reject) =>{
        fs.writeFile(file, data, err =>{
            if (err) reject ('could not write file 😭');
            resolve('success 🫶🏻');
        });
    });
};

const getDogPic = async () =>{
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Bread: ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePro('dog-image.txt',res.body.message);
    console.log('Random dog image saved to file');

    }catch(err) {
        console.log(err);
        throw err;
    }
    return '2: ready 🐶'
}

(async() => {
    try{
        console.log('1: Will get dog image');
        const x = await getDogPic();
        console.log('3: Done Getting dog image');

    }catch(err) {
        console.log('Error: ' + err);

    }
})();

/*console.log('1: Will get dog image')
getDogPic().then(x=>{
    console.log(x);
    console.log('3: Done Getting dog image')
}).catch(err => {
    console.log('Error: ' + err);
});
*/



/*readFilePro(`${__dirname}/dog.txt`)
    .then(data =>{
    console.log(`Bread: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res => {
        console.log(res.body.message);

        return writeFilePro('dog-image.txt',res.body.message);
    })
    .then(() =>{
        console.log('Random dog image saved to file');
    })
    .catch(err => {
        console.log(err.message);
    });
    */


