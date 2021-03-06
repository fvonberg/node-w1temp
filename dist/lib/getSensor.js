'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSensor;

var _fileExistsWait = require('./fileExistsWait');

var _fileExistsWait2 = _interopRequireDefault(_fileExistsWait);

var _Sensor = require('./Sensor');

var _Sensor2 = _interopRequireDefault(_Sensor);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSensor(sensorUid) {
  var enablePolling = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var w1DeviceFolderPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/sys/bus/w1/devices';

  return new Promise(function (resolve, reject) {
    if (!_constants.SENSOR_UID_REGEXP.test(sensorUid)) {
      reject(new Error('Bad sensor uid format'));
    } else {
      var file = w1DeviceFolderPath + '/' + sensorUid + '/w1_slave';

      (0, _fileExistsWait2.default)(file).then(function () {
        var sensor = new _Sensor2.default(sensorUid, file, enablePolling);
        resolve(sensor);
      }).catch(function () {
        reject(new Error('Cant get sensor instance'));
      });
    }
  });
}