const fs = require('fs');
const mainDir = './fkWords';

const createFile = async(filename, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, content, (err) => {
            if(err) reject({error: err});
            else resolve({success: 'Ok!'});
        });
    });
};

const readFile = async(filename) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filename, 'utf8', (err, content) => {
                if(err) reject({error: err});
                else resolve({success: content});
            });
        } catch(err) {
            reject({error: err});
        }
    });
};

const router = (app) => {
    app.get('/', (req, res) => {
        res.send(
            '<h1> Welcome mother fucker! did you like bad words? here is your place </h1> <p>To save a new shitty word is url/{lengague}/{word}</p> <p>To get the fucking words is url/list/{lengague}</p>'
        );
    });

    app.get('/new/:lengague/:word', async(req, res) => {
        console.log(req.params);
        
        const lenDir = mainDir + '/' + req.params.lengague;
        const filename = lenDir + '/' + req.params.lengague + '.json';

        if (!fs.existsSync(mainDir)){
            fs.mkdirSync(mainDir);
        }

        if (!fs.existsSync(lenDir)){
            fs.mkdirSync(lenDir);
        }

        if(!fs.existsSync(filename)){

            const content = JSON.stringify({words: [req.params.word] });
            const result = await createFile(filename, content);

            if(result.error) {
                res.send(`Hey you little scum can't do that!`);
            }else {
                res.send('Get the hell out of here, you sucker! the fuking bad word is saved!');
            }
        }else {

            const result = await readFile(filename);
            const info = result.success;
            if(result.error) {
                res.send(`Hey you little scum can't do that!`);
            }else {

                let updateContent = JSON.parse(info);
                updateContent.words.push(req.params.word);

                const content = JSON.stringify(updateContent);
                let result = await createFile(filename, content);

                if(result.error)
                    res.send(`Hey you little scum can't do that!`);
                else
                    res.send('Get the hell out of here, you sucker! the fuking bad word is saved!')
            }
        }

        
    });

    app.get('/list/:lengague', async(req, res) => {
        
        const lenDir = mainDir + '/' + req.params.lengague;
        const filename = lenDir + '/' + req.params.lengague + '.json';

        if (!fs.existsSync(mainDir)){
            fs.mkdirSync(mainDir);
        }

        if (!fs.existsSync(lenDir)){
            fs.mkdirSync(lenDir);
        }

        if(!fs.existsSync(filename)){
            const result = await createFile(filename, {words: []});
            res.send(`WTF!? There's no fucking words recorded on your shitty lengague, hahaha!`);
        }else {
            const result = await readFile(filename);
            const success = result.success;

            if(result.error) {
                res.send(`Hey you little scum can't do that!`);
            }else {
                const content = success;
                res.send(
                    `<p>Here's you'r fucking words, leave me alone scum</p> <p>${content}</p>`
                );
            }
        };
    });
}

module.exports = router;