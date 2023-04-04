const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new mongoose.Schema({

    property_id: {
        type: Schema.ObjectId
    },
    property_name: {
        type: String,
        unique: true,
        required: true
    },
    property_location: {
        type: String,
        required: true
    },
    property_price: {
        type: Number,
        required: true
    },
    property_image: {
        type: String,
        required: true
    },
    property_listed_day: {
        type: Date,
        default: Date.now()
    },
    property_type: {
        type: String,
        required: true
    },
    property_purpose: {
        type: String,
        required: true
    },
    other_property_images: {
        type: String,
    },
    admin: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});


module.exports = mongoose.model('Property',propertySchema)