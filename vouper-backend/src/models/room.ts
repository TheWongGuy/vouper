import * as mongoose from 'mongoose';

var Schema = mongoose.Schema;

var roomSchema = new Schema({
    roomid: {type: String, required: true},
    question: {type: String, required: true},
    answers: [{type: String}],
    owner: {type: String, required: true},
    users: [{type: String}]
});

export default mongoose.model('Room', roomSchema);