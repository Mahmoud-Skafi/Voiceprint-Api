const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phraseschema = new Schema({
    random: { type: String, required: true },
}
    ,
    {
        collection: 'phrases'
    }
);

module.exports = mongoose.model('phrases', phraseschema);