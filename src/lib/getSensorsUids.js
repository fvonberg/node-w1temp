import fs from 'fs';
import fileExistsWait from './fileExistsWait';
import { SENSOR_UID_REGEXP } from './constants';

export default function getSensorsUids(w1DeviceFolderPath = '/sys/bus/w1/devices') {
  return new Promise((resolve, reject) => {
    const file = `${w1DeviceFolderPath}/w1_bus_master1/w1_master_slaves`;

    fileExistsWait(file)
      .then(() => {
        const data = fs.readFileSync(file, 'utf8');
        const list = data
          .split('\n')
          .filter((line) => SENSOR_UID_REGEXP.test(line));

        resolve(list);
      })
      .catch(() => {
        reject(new Error('Cant get list of sensors'));
      });
  });
}
