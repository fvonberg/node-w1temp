import { EventEmitter } from 'events';

declare function setGpioData(gpioPin: number): Promise<void>;
declare function setGpioPower(gpioPin: number): Promise<void>;

declare function getSensorsUids(w1DeviceFolderPath?: string): Promise<string[]>;
declare function getSensor(sensorUid: string, enablePolling?: boolean, w1DeviceFolderPath?: string): Promise<Sensor>;

declare class Sensor extends EventEmitter {
  sensorUid: string;
  file: string;
  lastTemp: boolean;
  constructor(file, enablePolling?);
  getTemperature(): number | boolean;
  getTemperatureAsync(): Promise<number>;
}
