'use strict';

const fs = require('fs');
const _ = require('lodash');

console.time('entire process');

let trafficData = fs.readFileSync('./data/traffic-accidents.csv')
                    .toString()
                    .split('\r\n')
                    .map(row => row.split(','));

let columnHeader = _.first(trafficData);
let columnData = _.rest(trafficData);

const parseData = (columnData, columnHeader) => {
 let parsedData = []
   for(var i = 0; i < columnData.length; i++){
   parsedData.push(_.zipObject(columnHeader, columnData[i]))
 }
 return parsedData
}

function getColumnArray(columnName) {
  return _.pluck(parseData(columnData, columnHeader), columnName)
}

function getColumnCount(columnArray) {
  return _.countBy(columnArray, function(value) {
    return value
  });
}

function filterByCount(object, leastValue) {
  return _.pick(object, function(value, key) {return value > leastValue})
}

var addresses = getColumnArray('INCIDENT_ADDRESS');
var addressCount = getColumnCount(addresses);
var neighborhoods = getColumnArray('NEIGHBORHOOD_ID');
var neighborhoodCount = getColumnCount(neighborhoods);
console.timeEnd('entire process');

// Verification Code Commented Out Below
// var topFiveAddresses = filterByCount(addressCount, 300);
// var topFiveNeighborhoods = filterByCount(neighborhoodCount, 2890);
// console.log(topFiveAddresses);
// console.log(topFiveNeighborhoods);
