var mongoose = require('mongoose');

var PeopleSchema = new mongoose.Schema({
    ssn: String,
    first: String,
    middle: String,
    last : String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zip: String
});

module.exports = mongoose.model("PeopleModel", PeopleSchema);