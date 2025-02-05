const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['text', 'audio'],
        default: 'text',
    },
    audioTranscription: {
        type: String,
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

// Add text index for search functionality
noteSchema.index({ title: 'text', content: 'text', audioTranscription: 'text' });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
