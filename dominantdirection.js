// Example return the dominant direction from a given string
// Using the SCRIPTS.js object


function dominantDirection(str, scriptBase) {
  let scriptArr = [];
  let code;
  let script;
  
  // Loop over the string
  for (let i = 0, len = str.length; i < len; i++) {
    // Extract the character code for each string character
    code = str[i].codePointAt(0);
    // Get the script name for the given character and store in an array
    scriptArr.push(findScript(code, scriptBase));
  }
  
  // Find the dominant result script name (most frequent)
  script = findMostFrequent(scriptArr);
  // Given the name look up and return the direction
  return findScriptByName(script, scriptBase);
}

// Create helper functions

// Given the code look for the script name
function findScript(code, scriptBase) {
  let coincidence;
  
  // Loop over the scripts name to find a match in the range characters value
  for (let i = 0, len = scriptBase.length; i < len; i++) {
    for (let j = 0, rang = scriptBase[i].ranges.length; j < rang; j ++) {
      if (code >= scriptBase[i].ranges[j][0] && code <= scriptBase[i].ranges[j][1]) {
        // If character code is within script range code, return script name value
        coincidence = scriptBase[i].name;
      }
    }
  }
  
  return coincidence;
}

// Given any array find the most frequent value
function findMostFrequent(arr) {
  let mf = 1;
  let m = 0;
  let item;
  
  // Loop over array
  for (let i = 0; i < arr.length; i++) {
    // Compare values one by one looking for coincidences
    for (let j = i; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        // Match found increase m factor
        m++;        
        if (m > mf) {
          // This means at least more than one exists and compared again for higher frequency/coincidences
          mf = m;
          // Save and if updated return the item value
          item = arr[i];
        }
      }
    }
    m = 0;
  }
  
  return item;
}

// Given the most frequent script name from the string/test, find the script writing direction
function findScriptByName(name, scriptBase) {
  for (let i = 0, len = scriptBase.length; i < len; i++) {
    if (name == scriptBase[i].name) {
      return scriptBase[i].direction;
    }
  }
}
