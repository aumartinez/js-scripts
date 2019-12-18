let arr = ['pear', 'apple', 'orange', 'apple', 'banana'];

function findMostFrequent(arr) {
  let mf = 1;
  let m = 0;
  let item;
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        m++;
        if (m > mf) {
          mf = m;
          item = arr[i];
        }
      }
    }
    m = 0;
  }
  
  return item;
}

findMostFrequent(arr); //apple
