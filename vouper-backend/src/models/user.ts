import * as mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    uid: {type: String, required: true},
    email: {type: String, required: true},
    rooms: [{type: String}]
});

export default mongoose.model('User', userSchema)