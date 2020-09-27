var purchaseModal = document.getElementById('verify-purchase-modal');
var purchaseBackgroundDisplay = document.getElementById('verify-modal-backdrop');

function quantityInc() {
	var quantity = document.getElementById('pick-quantity').value;
	var integer = null;
	var number = Number(quantity);
	if(isNaN(number) == false) {
		integer = parseFloat(quantity);
		var newQuantity = integer + 1;
		document.getElementById('pick-quantity').value = newQuantity;
	}
	else {
		window.alert('The quantity is not a valid number.');
		document.getElementById('pick-quantity').value = '1';
	}
}

var quantityUp = document.getElementById('arrow-up');
quantityUp.addEventListener('click', quantityInc);

function quantityDec() {
	var quantity = document.getElementById('pick-quantity').value;
	var integer = null;
	var number = Number(quantity);
	if(isNaN(number) == false) {
		integer = parseFloat(quantity);
		console.log(integer);
	//if(isNaN(integer) == false){

		var newQuantity = integer - 1;
		document.getElementById('pick-quantity').value = newQuantity;
	}
	else{
		window.alert("The quantity wasn't a valid number");
		document.getElementById('pick-quantity').value = "1";
	}
}

var quantityDown = document.getElementById('arrow-down');
quantityDown.addEventListener('click', quantityDec);

function verifyNewPurchase() {
	var quantity = document.getElementById('pick-quantity').value;
	var integer = null;
	var number = Number(quantity);
	if(isNaN(number) == false) {
		purchaseModal.classList.remove('hidden');
		purchaseBackgroundDisplay.classList.remove('hidden');
	}
	else {
		document.getElementById('pick-quantity').value = "1";
		window.alert("The quantity wasnt a valid number.");
	}
}

var purchaseButton = document.getElementById('purchase-button');
purchaseButton.addEventListener('click', verifyNewPurchase);

function cancelModal() {
	purchaseModal.classList.add('hidden');
	purchaseBackgroundDisplay.classList.add('hidden');

	var username = document.getElementById('verify-username-input').value;
	var password = document.getElementById('verify-password-input').value;
	username = "";
	password = "";
	//document.getElementById('verify-username-input').value = username;
	//document.getElementById('verify-password-input').value = password;
}

var modalCancel = document.getElementsByClassName('cancel-verify')[0];
modalCancel.addEventListener('click', cancelModal);

function submitModal() {
	var username = document.getElementById('verify-username-input').value;
	var password = document.getElementById('verify-password-input').value;
	var quantity = document.getElementById('pick-quantity').value;
	if(username){
		if(password){
			var quantityValue = 'Quantity: ' + quantity;

			var transContainer = document.getElementsByClassName('trans-container')[0];
			var newDiv = document.createElement('div');

			newDiv.classList.add('purchase-trans');

			var newP1 = document.createElement('p');
			newP1.classList.add('user-trans');
			newP1.classList.add('trans-info');
			var newNameVerify = document.createTextNode(username);

			var newP2 = document.createElement('p');
			newP2.classList.add('quantity-trans');
			newP2.classList.add('trans-info');
			var newPassVerify = document.createTextNode(quantityValue);

			//transContainer.appendChild(newDiv);
			transContainer.prepend(newDiv);
			newDiv.appendChild(newP1);
			newP1.appendChild(newNameVerify);
			newDiv.appendChild(newP2);
			newP2.appendChild(newPassVerify);

			purchaseModal.classList.add('hidden');
			purchaseBackgroundDisplay.classList.add('hidden');
			username = "";
			password = "";
			document.getElementById('verify-username-input').value = username;
			document.getElementById('verify-password-input').value = password;
		}
		else {
			window.alert("This was not an acceptable password.");
		}
	}
	else	{
		window.alert("This is not an acceptable username.");
	}
}

var modalSubmit = document.getElementsByClassName('submit-verify')[0];
modalSubmit.addEventListener('click', submitModal);
