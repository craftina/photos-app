/* eslint-disable no-undef */
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get('/photos', (req, res) => {
    fs.readFile('api/data.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const photos = JSON.parse(data).photos;
        res.status(200).json(photos);
    });
});

app.get('/photos/:id', (req, res) => {
    const photoId = parseInt(req.params.id);

    fs.readFile('api/data.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const photos = JSON.parse(data).photos;
        const photo = photos.find(photo => photo.id === photoId);

        if (!photo) {
            res.status(404).send('Photo not found');
            return;
        }

        res.status(200).json(photo);

    });
});

app.post('/photos', (req, res) => {
    const newPhoto = req.body;

    fs.readFile('api/data.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const photos = JSON.parse(data).photos;
        const newPhotoId = photos.length > 0 ? photos[photos.length - 1].id + 1 : 1;
        newPhoto.id = newPhotoId;
        photos.push(newPhoto);

        fs.writeFile('api/data.json', JSON.stringify({ "photos": photos }), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).json(photos);
        });
    });
})

app.patch('/photos/:id', (req, res) => {
    const photoId = parseInt(req.params.id);
    const patchData = req.body;

    fs.readFile('api/data.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const photos = JSON.parse(data).photos;
        const photoIndex = photos.findIndex(photo => photo.id === photoId);

        if (photoIndex === -1) {
            res.status(404).send('User not found!');
            return;
        }

        const patchedPhoto = { ...photos[photoIndex], ...patchData };
        photos[photoIndex] = patchedPhoto;

        fs.writeFile('api/data.json', JSON.stringify({ "photos": photos }), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).json(patchedPhoto);
        });

    });
});

app.delete('/photos/:id', (req, res) => {
    const photoId = parseInt(req.params.id);

    fs.readFile('api/data.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const photos = JSON.parse(data).photos;
        const photoIndex = photos.findIndex(photo => photo.id === photoId);

        if (photoIndex === -1) {
            res.status(404).send('User not found!');
            return;
        }

        const deletedPhoto = photos.splice(photoIndex, 1)[0];

        fs.writeFile('api/data.json', JSON.stringify({ "photos": photos }), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).json(deletedPhoto);
        });

    });
});

app.listen(
    PORT,
    () => {
        console.log(`Server is running on port ${PORT}`);
    }
);