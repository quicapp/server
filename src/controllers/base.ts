import ControlModel from "../models/control";

abstract class BaseCtrl {

  abstract model: any;

  // Get all
  public getAll (req, res) {
    this.model.find({parent: req.headers['parent']}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  // Count all
  public count (req, res) {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  }

  // Insert
  public insert (req, res) {
    const obj = new this.model(req.body);
    obj.parent = req.headers['parent'];
    obj.creationTime = new Date();
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      console.log('Error', err);
      console.log('Item', item);
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

  // Get by id
  public get(req, res) {
    console.log("Get Request", req);
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

  // Update by id
  public update (req, res) {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  // Delete by id
  public delete (req, res) {
    // this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
    //   if (err) { return console.error(err); }
    //   res.sendStatus(200);
    // });
    // Using this implementation to allow for cascading delete
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) { 
        return console.error(err); 
      }
      obj.remove();
      res.json(obj);
    });
  }
}

export default BaseCtrl;
