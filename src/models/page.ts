import * as mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    name: String,
    layout: String,
    creationTime: Date,
    parent: String
});

const PageModel = mongoose.model('Page', pageSchema);

export default PageModel;
