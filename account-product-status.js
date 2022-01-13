let accdids = `
ACCOUNT1
ACCOUNT2
ACCOUNT3
ACCOUNT4
`;

let acc_arr = accdids.split("\n");
acc_arr.shift();
acc_arr.pop();
let acc = {};
let promises = [];
let res_arr = [];

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

function json_to_csv(str){
	let json = JSON.parse(str);
	str = "";
	
  str = "item,account,product_status,";
  str += "\r\n";
	
	for(let i = 0; i < json.length; i++){
		str += (i+1) + ",";
		str += json[i].account_did + ",";
		str += json[i].status + ",";
		str += "\r\n";
	}
	
	window.location.href;
	window.open("data:text/csv;charset=utf-8," + escape(str));
}

for (let i = 0; i < acc_arr.length; i++) {
  let accdid = acc_arr[i];
  let url = 'https://API_URL_ENDPOINT?kw='+accdid;
  
  let data =  fetch(url, {
                method: "GET",                
              })
              .then(sleeper(500))
              .then((res) => res.json());
              
  let promise = Promise.resolve(data);
  promises.push(promise);
}

Promise.all(promises)
.then(sleeper(500))
.then((res) => {
  
  for (let i = 0; i < res.length; i++) {  
    if (res[i].length > 0){
      acc.account_did = res[i][0].account_did;
      acc.status = res[i][0].status;
    }
    else {
      acc.account_did = acc_arr[i];
      acc.status = "Not found";
    }
    
    res_arr.push(acc);
    acc = {};
  }
  
  let json_str = JSON.stringify(res_arr);  
  console.log("Final state completed");  
  json_to_csv(json_str);
});
