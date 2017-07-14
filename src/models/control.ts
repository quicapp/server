import * as mongoose from 'mongoose';
import { Control } from "../common/pojo/control";

const controlSchema = new mongoose.Schema(Control);
const ControlModel = mongoose.model('Control', controlSchema);

export default ControlModel;
