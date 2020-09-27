
var modal_backdrop = document.getElementById("modal-backdrop"); // hidden div that is a transparent black
var cancel_backdrop = document.getElementById("cancel-i"); //cancel the modal
var cancel_backdrop2 = document.getElementById("cancel-account-i"); //cancel the modal
var modal_account = document.getElementById("modal-sell"); //displays the content needed to create account
var make_account = document.getElementById("modal-account");
var sell_button = document.getElementById("sell-i"); //sell item button
var account_button = document.getElementById("create-i"); //create account button


function black_screen()
{
	modal_backdrop.style.display = "initial";
}

function clear_screen()
{
	modal_backdrop.style.display = "none";
    	modal_account.style.display = "none";
}

function clear_screen2()
{
    	modal_backdrop.style.display = "none";
    	make_account.style.display = "none";
}

function sell_item()
{
	modal_account.style.display = "initial";
}

function create_account()
{
  	make_account.style.display = "initial";
}

function refresh_sell_item(){
	var refresh = "";
	document.getElementById("username-sell").value = refresh;
	document.getElementById("password-sell").value = refresh;
	document.getElementById("item-name-sell").value = refresh;
	document.getElementById("price-sell").value = refresh;
}

function refresh_create_account() {
	var refresh = "";
	document.getElementById("create-user-input").value = refresh;
	document.getElementById("create-password-input").value = refresh;
}

sell_button.addEventListener("click", function()
  {
    	black_screen();
    	sell_item();
  }
);

account_button.addEventListener("click", function()
  {
    	black_screen();
    	create_account();
  }
);

cancel_backdrop.addEventListener("click", function()
  {
    	clear_screen();
	refresh_sell_item();
	document.getElementById("limited-i").checked = false;
	document.getElementById("special-i").checked = false;
	document.getElementById("regular-i").checked = true;
  }
);

cancel_backdrop2.addEventListener("click", function()
  {
    	clear_screen2();
	refresh_create_account();
  }
);

var postTypeReg = document.getElementById('regular-choice');
postTypeReg.addEventListener('click', function() {
	location.href = '/';
});

var postTypeLim = document.getElementById('limited-choice');
postTypeLim.addEventListener('click', function() {
	console.log('in');
	location.href = '/l-list';
});

var postTypeSpec = document.getElementById('special-choice');
postTypeSpec.addEventListener('click', function() {
	location.href = '/s-list';
});

var postAcceptButton = document.getElementById('create-post-i');

postAcceptButton.addEventListener('click', function()
{
  var uname = document.getElementById('username-sell').value;
  var pword = document.getElementById('password-sell').value;
  var iName = document.getElementById('item-name-sell').value;
  var price = document.getElementById('price-sell').value;
  if (document.getElementById('regular-i').checked) {
    location.href = 'createReg/' + uname + '/' + pword + '/' + iName + '/' + price;
  }
  else if (document.getElementById('special-i').checked) {
    location.href = 'createSpe/' + uname + '/' + pword + '/' + iName + '/' + price;
  }
  else if (document.getElementById('limited-i').checked) {
    location.href = 'createLim/' + uname + '/' + pword + '/' + iName + '/' + price;
  }
});

var accountAcceptButton = document.getElementById('create-account-i');

accountAcceptButton.addEventListener('click', function()
{
  var uname = document.getElementById('create-user-input').value;
  var pword = document.getElementById('create-password-input').value;
  location.href = 'createUsr/' + uname + '/' + pword;
});

/*
create_account.addEventListener("click", function()
  {
    	var username = "";
    	var password = "";
    	document.getElementById('name-input-i').value = username;
    	document.getElementById('name-input-i').value = password;
  }
  */
