const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const uuid = require('uuid/v4')

const BlogSchema = new Schema({
    hash: {
        type: String,
        unique: 'Hash mast be unique',
    },
    title: {
        type: String,
        required: 'Title is required',
        trim: true,
    },
    description: {
        type: String,
        required: 'Description is required',
        trim: true,
    },
    category: {
        type: String,
        required: "Type is required",
        trim: true,
    },
    date: {
        type: String,
        required: 'Date is required',
        trim: true,
    },
    image: {
        type: String,
        required: 'Image is required',
        trim: true,
    },
    author: {
        type: String,
        required: 'Author is required',
        trim: true,
    },
    tags: {
        type: [String],
        required: 'Tags is required',
        trim: true,
    },
    comments: [{
        name: String,
        email: String,
        description: String,
        time: String,
    }]

}, {timestamps: true})

BlogSchema.statics.createFields = [
    'title',
    'description',
    'category ',
    'date',
    'image',
    'author',
    'tags',
    'comments'
]

BlogSchema.pre('save', function (next) {
    if (!this.hash) {
        this.hash = uuid()
    }
    next()

})

module.exports = mongoose.model('blog', BlogSchema);