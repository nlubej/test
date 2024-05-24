'use strict';

const underwritingActors = ['UnderwriterL1', 'UnderwriterL2', 'Underwriter'];

const vehicleTypes = {
  'vehicleCar': 10,
  'vehicleTruck': 30,
  'upgrades': 140
};

const fuelTypes = {
  'Diesel': 'Diesel',
  'Bencin - neosvinčen': 'Gasoline',
  'Bencin - osvinčen': 'Gasoline',
  'Bencin in elektrika': 'Gasoline and electricity',
  'Ostalo': 'Other',
  'Bencin ali plin': 'Gasoline or gas',
  'Diesel in elektrika': 'Diesel and electricity',
  'Plin': 'Gas',
  'Elektro (akumulator)': 'Electric'
};

const toyotaIdMake = 582;

module.exports = {
  underwritingActors,
  vehicleTypes,
  fuelTypes,
  toyotaIdMake
};
