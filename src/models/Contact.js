
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], 
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: ''
    },
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
