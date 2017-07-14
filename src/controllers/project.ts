import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import Data from '../models/project';
import BaseCtrl from './base';

export default class ProjectCtrl extends BaseCtrl {
  model = Data.ProjectModel;

  public getAll(req, res) {
    console.log("User", req.user);
    req.headers['parent'] = req.headers['user_id'];
    console.log('This', this);
    super.getAll(req, res);
  }

  // Insert
  public insert(req, res) {
    console.log('This', this);
    const obj = new this.model(req.body);
    req.headers['parent'] = req.headers['user_id'];
    return super.insert(req, res);
  }
}