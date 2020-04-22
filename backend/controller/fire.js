const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');

const menus = require('../models/Menus');

exports.Menus = (req, res, next) => {

  menus.find().then(result => {
    res.status(200).json({
      message: "Menu fetched successfully",
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      message: 'No menu exist'
    });
  })
}
