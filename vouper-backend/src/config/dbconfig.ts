import * as mongoose from 'mongoose';

console.log("Establishing connection to database...");
mongoose.connect('mongodb://vouper:vouper@localhost:27017/vouper_dev?authSource=admin', { useNewUrlParser: true });

export default mongoose;