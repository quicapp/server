import * as mongoose from 'mongoose';
import { Project, Page } from "../common/pojo/project";
import  PageModel   from './page';

const projectSchema = new mongoose.Schema({
    name: String,
    framework: String,
    library: String,
    creationTime: Date,
    parent: String
});

projectSchema.post('remove', function (doc) {
    console.log('Deleting Project', doc.id);
    PageModel.find({ parent: doc.id }, (err, docs) => {
        if (err) { return console.error(err); }
        for(const [i, doc] of docs.entries()){
            console.log('Deleting Page', docs[i].id);
            docs[i].remove();
        }
    });
});

const ProjectModel = mongoose.model('Project', projectSchema);

export default  { ProjectModel };
