const router = require('express').Router();
let Data = require('../models/data.model');

router.route('/').get((req, res) => {
    Data.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.error(req.body)
    const language = req.body.language;
    const gender = req.body.gender;
    const age = req.body.age;
    const jobtype = req.body.jobtype;
    const order = req.body.order;
    const date = req.body.date;

    const newData = new Data({
        language,
        gender,
        age,
        jobtype,
        order,
        date
    });

    newData.save()
        .then(() => res.json('Data added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Data.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Data.findByIdAndDelete(req.params.id)
        .then(() => res.json('Data deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Data.findById(req.params.id)
        .then(data => {
            data.language = req.body.language;
            data.gender = req.body.gender;
            data.age = req.body.age;
            data.jobtype = req.body.jobtype;
            data.date = req.body.date;

            data.save()
                .then(() => res.json('Data updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;