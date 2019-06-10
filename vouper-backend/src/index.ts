import chalk from 'chalk';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as onerror from 'koa-onerror';


import * as mongoose from 'mongoose';
import app from './api';

const PORT = 3000;

mongoose.connect('mongodb://vouper:vouper@localhost:27017/vouper_dev?authSource=admin', { useNewUrlParser: true });


console.log('Launching the ' + chalk.red('Vouper') + " API");
app.listen(PORT, () => {
    console.log('Server is listening at --> localhost:' + chalk.blue(PORT.toString()));
});