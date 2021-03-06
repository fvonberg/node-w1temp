'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSensorsUids;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fileExistsWait = require('./fileExistsWait');

var _fileExistsWait2 = _interopRequireDefault(_fileExistsWait);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSensorsUids() {
  var w1DeviceFolderPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/sys/bus/w1/devices';

  return new Promise(function (resolve, reject) {
    var file = w1DeviceFolderPath + '/w1_bus_master1/w1_master_slaves';

    (0, _fileExistsWait2.default)(file).then(function () {
      var data = _fs2.default.readFileSync(file, 'utf8');
      var list = data.split('\n').filter(function (line) {
        return _constants.SENSOR_UID_REGEXP.test(line);
      });

      resolve(list);
    }).catch(function () {
      reject(new Error('Cant get list of sensors'));
    });
  });
}