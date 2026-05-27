const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', async (req, res) => {
    const token = process.env.PRIVATE_APP_ACCESS;
    const url = 'https://api.hubapi.com/crm/v3/objects/2-63191382?properties=name,publisher,price';
    try {
        const resp = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        res.render('homepage', { title: 'Video Games', data: resp.data.results });
    } catch (e) {
        console.error(e);
        res.send('Error loading data');
    }
});

app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Add a Video Game' });
});

app.post('/update-cobj', async (req, res) => {
    const token = process.env.PRIVATE_APP_ACCESS;
    const url = 'https://api.hubapi.com/crm/v3/objects/2-63191382';
    try {
        await axios.post(url, {
            properties: {
                video_game: req.body.name,
                name: req.body.name,
                publisher: req.body.publisher,
                price: req.body.price
            }
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.send('Error saving data');
    }
});

app.listen(PORT, () => console.log('App running on http://localhost:' + PORT));