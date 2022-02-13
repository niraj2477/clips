import { Router } from 'express';
import categoryModel from '../models/Category.js';
const categoryRouter = Router();

categoryRouter.route('/').get(function (req, res) {
    categoryModel.find(function (err, category) {
      if (err) {
        console.log(err);
      } else {
        res.json(category);
      }
    });
});

categoryRouter.route('/addCategory').post(function (req, res) {
  console.log(req.query);
    let category = new categoryModel({name: req.query.name});
    console.log(category)
    category.save()
    .then(result => {
    res.status(200).json({ 'category': 'category Added Successfully' });
    })
    .catch(err => {
    res.status(400).send(err);
    });
    });

    categoryRouter.route('/updateCategory').post((req, res, next) => {
      categoryModel.findByIdAndUpdate(req.query.id, {
        $set: { name : req.query.name}
      }, (error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          res.status(200).json({ 'category': 'category Updated Successfully' });
        }
      })
    })
    

    categoryRouter.route('/deleteCategory').post((req, res, next) => {
      categoryModel.findByIdAndRemove(req.query.id, (error, data) => {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(200).json({ 'category': 'category Deleted Successfully' });
        }
      })
    })
export default categoryRouter;