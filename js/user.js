function login_user()
{
	// Log in
	url = PREFIX.URL + "loginUser";
	var username = document.getElementById("username_login").value;
	var password = document.getElementById("password_login").value;
	var getData = JSON.stringify({"username": username, "password": password});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				console.log(response);
			}
		}
	request.send(getData);

	// Get success
	var success = response["success"];
	if (success) {
		var payload = response["payload"];
		var info = payload[0];
		var user_id = info["user_id"];
		var status = info["status"];
		var role = info["role"];
		sessionStorage.setItem("role", role);

		// check status 1=active, 2=suspended, 3=blocked
		if (status == 2) {
			if (window.confirm("Your account is currently deactivated. Do you want to reactivate the account?")) {
				// if yes, request to reactivate the account
				url = PREFIX.URL + "reactivateUser";
				getData = JSON.stringify({"user_id": user_id});
				request = new XMLHttpRequest();
				response = null;
				request.open("POST", url, false);
				request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

				request.onreadystatechange = function() {
					if (request.readyState == 4 && request.status == 200) {
						response = JSON.parse(request.responseText);
						console.log(response);
					}
				}
				request.send(getData);

				// Get success
				success = response["success"];
				if (success) {
                    alert('Your account has been reactivated!');
                }
			} else {
				location.href = "index.html";
				return;
			}
		} else if (status == 3) {
			alert('Your account is currently blocked. Contact admin.');
			return;
		}
		sessionStorage.setItem("user_id", user_id); // save to session storage for later use
		location.href = "index.html";
    } else {
	    alert('Wrong username and/or password.');
    }
}

function addUser()
{
    // add user to db
	url = PREFIX.URL + "addUser";
	var username = document.getElementById("username_signup").value;
	var password = document.getElementById("password_signup").value;
	var email = document.getElementById("email_signup").value;

	// check length of password. password length must be >= 5
	if (password.length < 5) {
		alert('password must be 5 characters or longer');
		return;
	}

	var getData = JSON.stringify({"username": username, "password": password, "email": email});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				console.log(response);
			}
		}
	request.send(getData);

	// Get success
	var success = response["success"];
	if (success) {
	    alert('You signed up successfully! Please log in.');
		location.href = "login_signup.html"
    } else {
	    alert('Username and/or email you entered already exists. Try different username and email.');
    }
}

function suspendUser()
{
	url = PREFIX.URL + "suspendUser";
	var user_id = sessionStorage.getItem("user_id");
	var getData = JSON.stringify({"user_id": user_id});

	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				console.log(response);
			}
		}
	request.send(getData);

	// Get success
	var success = response["success"];
	if (success) {
		sessionStorage.clear();
	    alert('Account suspended successfully');
		location.href = "index.html"
    } else {
	    alert('There was an error in suspending the account. Try again.');
    }
}

function removeUser()
{
	url = PREFIX.URL + "removeUser";
	var user_id = sessionStorage.getItem("user_id");
	var getData = JSON.stringify({"user_id": user_id});

	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				console.log(response);
			}
		}
	request.send(getData);

	// Get success
	var success = response["success"];
	if (success) {
		sessionStorage.clear();
	    alert('Account removed successfully');
			location.href = "index.html";

    } else {
	    alert('There was an error in removing the account. Try again.');
    }
}

function updateUser()
{
	url = PREFIX.URL + "updateUser";
	var user_id = sessionStorage.getItem("user_id");
	var email = document.getElementById("edit-email").value;
	var password = document.getElementById("edit-password").value;
	var password_confirm = document.getElementById("edit-password-confirm").value;
	var description = document.getElementById("edit-description").value;

	// verify that password matches password_confirm
	if (password != password_confirm) {
		alert('password and password confirm do not match!');
		return;
	}

	// check length. password length must be >= 5
	if (password.length < 5) {
		alert('password must be 5 characters or longer');
		return;
	}

	var getData = JSON.stringify({"user_id": user_id, "email": email, "password": password, "description": description});

	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				console.log(response);
			}
		}
	request.send(getData);

	// Get success
	var success = response["success"];
	if (success) {
	    alert('User profile updated successfully!');
	    location.href = "user_profile.html"
    } else {
	    alert('There was an error in updating the profile. Try again.');
    }
}

function getUser()
{
    console.log(sessionStorage.getItem("role"));
    // add user to db
	url = PREFIX.URL + "getUser";
	var user_id = sessionStorage.getItem("user_id");
	console.log(user_id);
	var getData = JSON.stringify({"user_id": user_id});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				console.log(response);
			}
		}
	request.send(getData);

	var payload = response["payload"];
	var info = payload[0];
	var username = info["username"];
	var password = info["password"];
	var email = info["email"];
	var description = info["description"];
	var rating = info["rating"];

	document.getElementById("profile-username").innerHTML = username;
	document.getElementById("profile-email").innerHTML = email;
	document.getElementById("profile-description").innerHTML = description;
	show_rating("profile-rating", rating);

	document.getElementById("edit-email").value = email;
	document.getElementById("edit-description").value = description;
	document.getElementById("edit-password").value = "";
	document.getElementById("edit-password-confirm").value = "";

	// if the user is admin, show flagged item
	var role = sessionStorage.getItem("role");
	
	if(role == "Admin"){
		document.getElementById("myflaggedtab").style.display  = "block";
	}	
}

function logout()
{
	sessionStorage.clear();
	alert('You have logged out!');
	location.href = "index.html";
}

function show_rating (id, rating) {
	var profile_rating = document.getElementById("profile-rating");
	profile_rating.innerHTML = "";
	var x = Math.round(rating);
    var y = id;
    for (var i = 0; i < x; i++){
        var img = document.createElement("img");
        img.height=10;
        img.src = "images/star-icon.png";
       document.getElementById(y).appendChild(img);
    }
}
