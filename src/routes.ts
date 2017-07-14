import * as express from 'express';
import ProjectCtrl from './controllers/project';
import PageCtrl from './controllers/page';

// API Routes
export default function setRoutes(app) {
  const projectCtrl = new ProjectCtrl();
  const pageCtrl = new PageCtrl();

  app.route('/api/authorization').post(function (req, res) {
    const auth = req.headers.authorization;
    res.status(201).send({ message: "quickApp authorization endpoint success babale" });
  });

  // Projects
  app.route('/api/projects').get((req, res) => projectCtrl.getAll(req, res));
  app.route('/api/project/:id').get((req, res) => projectCtrl.get(req, res));
  app.route('/api/project').post((req, res) => projectCtrl.insert(req, res));
  app.route('/api/project/:id').put((req, res) => projectCtrl.update(req, res));
  app.route('/api/project/:id').delete((req, res) => projectCtrl.delete(req, res));

  // Pages
  app.route('/api/pages/:id').get((req, res) => pageCtrl.getAll(req, res));
  app.route('/api/page/').post((req, res) => pageCtrl.insert(req, res));
  app.route('/api/page/:id').get((req, res) => pageCtrl.get(req, res));
  app.route('/api/page/:id').put((req, res) => pageCtrl.update(req, res));
  app.route('/api/page/:id').delete((req, res) => pageCtrl.delete(req, res));
}
