//Delivery robot sample

//Array group from town map image with points grouped by pair
const points = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildMap(points) {
  //Initialize empty town object
  let townMap = {};
  
  //Loop through pair of points
  //Map method to create the array pair for each point
  for (let [a, b] of points.map(function(start){return start.split("-");})){
    //Add starting point from a to b
    addPoint(a, b);
    //Add return point from b to a
    addPoint(b, a);
  }
  
  //Add points to map
  function addPoint(a, b) {
    //If starting point does not exists add it
    if (typeof townMap[a] == undefined) {
      townMap[a] = [b];
    }
    //Else starting point already exists, then add node linked to it
    else {
      townMap[a].push(b);
    }
  }
  
  return townMap;  
}
