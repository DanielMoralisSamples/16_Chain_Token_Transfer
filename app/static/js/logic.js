Moralis.initialize(""); // Application id from moralis.io
Moralis.serverURL = ""; //Server url from moralis.io

const web3_utilities = new Moralis.Web3();
Moralis.Web3

//frontend logic

async function login(){
  document.getElementById('submit').setAttribute("disabled", null);
  document.getElementById('username').setAttribute("disabled", null);
  document.getElementById('useremail').setAttribute("disabled", null);
  Moralis.Web3.authenticate().then(function (user) {
      user.set("name",document.getElementById('username').value);
      user.set("email",document.getElementById('useremail').value);
      user.save();
      document.getElementById("amountToken").removeAttribute("disabled");
      document.getElementById("transfer").removeAttribute("disabled");
      document.getElementById("sendTo").removeAttribute("disabled");
  })
}

async function transfer(){
  const ethValue = codeValue(document.getElementById("amountToken").value);
  const transactionParameters = {
    to: document.getElementById("sendTo").value,
    from: ethereum.selectedAddress,
    value: ethValue, 
  };
  const txHash = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  });
  console.log(txHash)
}

function codeValue(_value){
  const result = parseInt(web3_utilities.utils.toWei(_value, 'ether')).toString(16)
  return result
}