const express = require('express');
const app = express();
const cors = require('cors');
const placeH = require('./placeholder.js');
var MarkovChain = require('markovchain')
	, fs = require('fs')
	, news = new MarkovChain(fs.readFileSync('./headlines.txt', 'utf8'));

//middleware
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/generate', (req, res) => {
	let start = req.query.q;

	if (!req.query.q) {
        return res.status(400).send('No start phrase provided');
    }
	
	const headline = news.start(start).end(13).process()
	let html = placeH.insert('./public/html/generate.html', '<h4><em id="headline" class="centered">HEADLINE_PLACEHOLDER</em></h4>', `<h4><em id="headline" class="centered">${headline}</em></h4>`);
	
	res.status(200).send(html);
});

app.get('/api/generate', (req, res) => {
	let start = req.query.q;
	
	if (!req.query.q) {
        return res.status(400).send('No start phrase provided');
    }

	const headline = news.start(start).end(13).process()
	res.status(200).send(headline);
});

app.listen(3000, () => {
	console.log('server started');
});
