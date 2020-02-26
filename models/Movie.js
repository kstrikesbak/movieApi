const mongoose = require('mongoose');

//create blueprint for inputs into database
// word will have type string 
//definition will be type string, to lowercase, and have a default
const MovieSchema = new mongoose.Schema({
    title : {type: String, unique: true, lowercase: true, trim:true, default:""},
    rating: {type: String},
    synopsis : {type: String, default:""},
    release_year: {type: Number , unique:false, default:""},
    genre: {type: [], default:""}
})

module.exports = mongoose.model('movies', MovieSchema);