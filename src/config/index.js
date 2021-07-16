import * as Dev from './dev';
import * as Production from './production';
import * as Homologation from './homologation';

let productionStatus = true;
let homologationStatus = false;

// const config = production ? Production : Dev;
let config = {};

if (productionStatus === true) {
  config = Production;
  config.environment = 'Production';
} else if (homologationStatus === true) {
  config = Homologation;
  config.environment = 'Homologation';
} else {
  config = Dev;
  config.environment = 'Dev';
}

export default config;
