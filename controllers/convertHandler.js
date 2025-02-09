function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    const regex = /^[^a-zA-Z]+/;
    const match = input.match(regex);

    if (!match) {
      return 1; // Default to 1 if no numerical input is provided
    }

    result = match[0];

    if (result.includes('/')) {
      const nums = result.split('/');
      if (nums.length != 2) {
        throw new Error('Invalid number');
      }
      result = parseFloat(nums[0]) / parseFloat(nums[1]);
    } else {
      result = parseFloat(result);
    }

    if (isNaN(result)) {
      throw new Error('Invalid number');
    }

    return result;
  };

  this.getUnit = function (input) {
    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const unit = input.match(/[a-zA-Z]+/)[0];

    if (!validUnits.includes(unit)) {
      throw new Error('Invalid unit');
    }

    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    const unitPairs = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };

    return unitPairs[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitSpelling = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };

    return unitSpelling[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        throw new Error('Invalid unit');
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
  };

}

module.exports = ConvertHandler;
