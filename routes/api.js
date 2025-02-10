'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input.toLowerCase();
    let initNum, initUnit, returnNum, returnUnit;
    let numError = false;
    let unitError = false;

    try {
      initNum = convertHandler.getNum(input);
    } catch (e) {
      numError = true;
    }

    try {
      initUnit = convertHandler.getUnit(input);
    } catch (e) {
      unitError = true;
    }

    if (numError && unitError) {
      return res.json({ error: 'invalid number and unit' });
    } else if (numError) {
      return res.json({ error: 'invalid number' });
    } else if (unitError) {
      return res.json({ error: 'invalid unit' });
    }

    returnNum = convertHandler.convert(initNum, initUnit);
    returnUnit = convertHandler.getReturnUnit(initUnit);

    const responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: responseString
    });
  });

};