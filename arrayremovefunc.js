function arrRemove(arr, value) {
  let rem = [];
  for (let i = 0, len = arr.length; i < len ; i++) {
    if (arr[i] !== value) {
      rem.push(arr[i]);
    }
  }  
  return rem;
}

function arrRemove (arr, value) {
  return arr.filter((n) => n != value);
}
