let accdids = `
ACCOUNT1
ACCOUNT2
ACCOUNT3
ACCOUNT4
`;

let arr = accdids.split("\n");
arr.shift();
arr.pop();
let acc = {};
let promises = [];
let acc_arr = [];
let key = "Product Name";

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

function json_to_csv(str){
	let json = JSON.parse(str);
	str = "";
	
  str = "item,account,product,start_date,end_date";
  str += "\r\n";
	
	for(let i = 0; i < json.length; i++){
		str += (i+1) + ",";
		str += json[i].account + ",";
		str += json[i].tnproduct + ",";
    		str += json[i].start_date + ",";
    		str += json[i].end_date + ",";
		str += "\r\n";
	}
	
	window.location.href;
	window.open("data:text/csv;charset=utf-8," + escape(str));
}

for (let i = 0; i < arr.length; i++) {
  let accdid = arr[i];
  let url = 'https://URL_TO_FETCH?Acct_DID='+accdid;  
  
  let data =  fetch(url, {
                method: "GET",                
              })
              .then(sleeper(500))
              .then((res) => res.text());
              
  let promise = Promise.resolve(data);
  promises.push(promise);
}

Promise.all(promises)
.then(sleeper(500))
.then((res) => {
  for (let i = 0; i < res.length; i++) {
    let text = res[i];    
    let find = text.search(key);
    
    if (find < 0) {
      acc.account = arr[i];
      acc.tnproduct = "No";
      acc.start_date = "";
      acc.end_date = "";      
    }
    
    if (find > 0) {
      text = text.substr(find);
      let patt = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
      
      dates = text.match(patt);
    
      acc.account = arr[i];
      acc.tnproduct = "Yes";
      try{
        acc.start_date = dates[0];
        acc.end_date = dates[1];
      }
      catch(e){
        console.log(e);
        console.log(arr[i]);
      }
    }
    
    acc_arr.push(acc);
    acc = {};
  }
  
  let json_str = JSON.stringify(acc_arr);  
  console.log("Final state completed");  
  json_to_csv(json_str);
});
