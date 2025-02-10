function ConvertHandler() {

  this.getNum = function (input) {
    // j34ykg
    const splitIndex = input.search(/[a-zA-Z]/);
    let numberPart = input.slice(0, splitIndex);

    if (!numberPart) {
      return 1; // Default to 1 if no numerical input is provided
    }

    if (numberPart.includes('/')) {
      const nums = numberPart.split('/');
      if (nums.length != 2) {
        throw new Error('Invalid number');
      }
      numberPart = parseFloat(nums[0]) / parseFloat(nums[1]);
    } else {
      numberPart = parseFloat(numberPart);
    }

    if (isNaN(numberPart)) {
      throw new Error('Invalid number');
    }

    return numberPart;
  };

  this.getUnit = function (input) {
    const splitIndex = input.search(/[a-zA-Z]/);
    // const numberPart = input.slice(0, splitIndex);
    let unitPart = input.slice(splitIndex);

    if (!unitPart) {
      throw new Error('Invalid unit');
    }

    if (unitPart.toLowerCase() === 'l') {
      unitPart = 'L';
    }

    if (!['gal', 'L', 'mi', 'km', 'lbs', 'kg'].includes(unitPart)) {
      throw new Error('Invalid unit');
    }

    return unitPart;
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

    result = Math.round(result * 1e5) / 1e5;
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
  };

}

module.exports = ConvertHandler;
