function placeBid()
{
	// add user to db
	url = PREFIX.URL + "addBid";
	urlCheck = PREFIX.URL + "selectBid";
	urlMd = PREFIX.URL + "placeBid";
	var user_id = sessionStorage.getItem("user_id");
	var item_id = sessionStorage.getItem("item_id");
	var bid_price = parseFloat(document.getElementById("bidPrice").innerHTML);
	var base_price = parseFloat(document.getElementById("auctionBasePrice").innerHTML);
	var curr_bid_price = parseFloat(document.getElementById("currentBidPrice").innerHTML);
	var item_owner_id = sessionStorage.getItem("owner_id");

	// verify that user is logged in
	if (!isLoggedIn()) {
		alert("Please Log in!");
		location.href = "login_signup.html";
		return;
	}

	//verify valid input
	if (bid_price == null || parseFloat(bid_price) == null) {
		alert("Bid price is not valid.");
		return;
	}

	// verify that bid price is higher than current bid
	if (curr_bid_price != null && bid_price != null && bid_price <= curr_bid_price) {
		alert("Bid price must be higher than current bid price!");
		return;
	}

	if (base_price != null && bid_price != null && bid_price <= base_price) {
		alert("Bid price must be higher than base price!");
		return;
	}

	// verify if auction has expired. time_left is set in session storage inside show_countdown()
	var auction_time_left = sessionStorage.getItem("auction_time_left");
	if (auction_time_left == null || auction_time_left < 0) {
		alert("You cannot bid on this item anymore.");
		return;
	}

	// check if auction has started
	var auction_start_time = new Date(sessionStorage.getItem("auction_start_time")).getTime();
	var now = new Date().getTime();
	if (auction_start_time > now) {
		alert("Auction has not started yet.");
		return;
	}

	// owner of item is not allowed to bid on his own item
	if (item_owner_id == user_id) {
		alert("Item owner is not allowed to bid on his/her own item.");
		return;
	}

	var getDataMd = JSON.stringify({"user_id": user_id, "item_id": item_id, "bid": bid_price});
	var requestMd = new XMLHttpRequest();
	var responseMd = null;
	requestMd.open("POST", urlMd, false);
	requestMd.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

	requestMd.onreadystatechange = function() {
		if (requestMd.readyState == 4 && requestMd.status == 200) {
			responseMd = JSON.parse(requestMd.responseText);
			console.log(responseMd);
		}
	};
	requestMd.send(getDataMd);

	var successMd = responseMd["success"];
	if (successMd == true) {
		alert("You have bid on the item successfully!");

		// Here send email to seller when their items have been bid on
		var response = null;
		var email_url = PREFIX.URL + "alertSellerWhenBid";
		var postData = JSON.stringify({"item_id": item_id});
		var request = new XMLHttpRequest();
		request.open("POST", email_url, true);
		request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		request.onload = function() {

			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.response);
			};
		};
		request.send(postData);	
				
		// update mysql
		var getData = JSON.stringify({"user_id": user_id, "item_id": item_id});
		var request1 = new XMLHttpRequest();
		var response1 = null;
		var request = new  XMLHttpRequest();
		var response = null;
		request1.open("POST", urlCheck, false)
		request1.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		request1.onreadystatechange = function() {
			if (request1.readyState == 4 && request1.status == 200) {
				response1 = JSON.parse(request1.responseText);
				console.log(response1);
			}
		}
		request1.send(getData);
		while (response1["success"] == null) {
			;
		}
		if (response1["success"] == false) {
			request.open("POST", url, false);
			request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					response = JSON.parse(request.responseText);
					console.log(response);
				}
			}
			request.send(getData);


			console.log("here");
			//update item status to 1
			var url = PREFIX.URL + "updateItemField";
			var postData = JSON.stringify({"item_id": item_id, "item_field": "status", "value": 1});
			var request = new XMLHttpRequest();
			request.open("POST", url, false);
			request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
			request.onload = function() {
				if (request.readyState == 4 && request.status == 200) {
					response = JSON.parse(request.response);
				};
			};
			request.send(postData);
		}

		// reload the page to update the change on frontend
		getItem("single_item");

	} else { // either successMd = false or payloadMd is null
		alert("Bid failed. Reload and try again.");
	}	
}

function getBid()
{
	url = PREFIX.URL + "getBid";
	var user_id = sessionStorage.getItem("user_id");
	var getData = JSON.stringify({"user_id": user_id});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			response = JSON.parse(request.responseText);
			console.log(response)
		};
	}
	request.send(getData);

	// Get Item Information
	var payload = response["payload"];

	showBid(payload);
}

function showBid(payload)
{
	url = PREFIX.URL + "getItem";
	// clear table before loading
	var table = document.getElementById("bids");
	while(table.rows[0]) table.deleteRow(0);

	var tbody = document.createElement("tbody");
	for (var i in payload) {
		var entry = payload[i];
		var item_id = entry["item_id"];
		var request = new XMLHttpRequest();
		var getData = JSON.stringify({"item_id": item_id});
		var response = null;
		request.open("POST", url, false);
		request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				console.log(response);
			};
		}
		request.send(getData);
		console.log(response);
		if(response["payload"]) {
			var info = response["payload"][0];
			var item_name = info["item_name"];
			var image_link = info["image_link"];

			var row = document.createElement('tr');
			row.id = item_id;

			var imageCell = document.createElement('td');
			var productCell = document.createElement('td');

			imageCell.className = "product-thumbnail";
			productCell.className = "product-name";
			imageCell.style.width = "20%";

			// imageCell.innerHTML = '<img class="img-fluid" onclick="getItem(this)"/>';
			imageCell.innerHTML = '<img src="images/product_1.jpg" class="img-thumbnail" width="100" onclick="getBidItem(this)" style="cursor: pointer;"/>';
			productCell.innerHTML = '<h2 class="h5 text-black" onclick="getBidItem(this)" style="cursor: pointer;">' + item_name + '</h2>';

			row.appendChild(imageCell);
			row.appendChild(productCell);

			tbody.appendChild(row);
		}

	}
	var table = document.getElementById("bids");
	table.appendChild(tbody);
}

function getBidItem(obj) {
	var item_id = $(obj).parent().parent()[0].id;
	sessionStorage.setItem("item_id", item_id);
	location.href = "single_item.html";
	getItem('single_item');
}

function isLoggedIn()
{
	return sessionStorage.getItem("user_id") != null;
}