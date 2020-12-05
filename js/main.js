var toggle = false;
var PREFIX = {URL: "http://13.59.166.200:5000/"};
if(toggle){
	PREFIX.URL = "http://localhost:5000/";
}

function checkIsLoggedIn(){
	if (sessionStorage.getItem("user_id")) {
		return sessionStorage.getItem("user_id");
	}
	else{
		alert("Please Log in!");
		location.href = "login_signup.html";
	}
}
 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });


jQuery(document).ready(function($) {

	"use strict";

	var slider = function() {
		$('.nonloop-block-3').owlCarousel({
		center: false,
		items: 1,
		loop: true,
		smartSpeed: 700,
			stagePadding: 15,
		margin: 20,
		autoplay: true,
		nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		responsive:{
		600:{
			margin: 20,
		  items: 2
		},
		1000:{
			margin: 20,
		  items: 3
		},
		1200:{
			margin: 20,
		  items: 3
		}
		}
		});
	};
	slider();


	var siteMenuClone = function() {

		$('<div class="site-mobile-menu"></div>').prependTo('.site-wrap');

		$('<div class="site-mobile-menu-header"></div>').prependTo('.site-mobile-menu');
		$('<div class="site-mobile-menu-close "></div>').prependTo('.site-mobile-menu-header');
		$('<div class="site-mobile-menu-logo"></div>').prependTo('.site-mobile-menu-header');

		$('<div class="site-mobile-menu-body"></div>').appendTo('.site-mobile-menu');



		$('.js-logo-clone').clone().appendTo('.site-mobile-menu-logo');

		$('<span class="ion-ios-close js-menu-toggle"></div>').prependTo('.site-mobile-menu-close');


		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {

			var counter = 0;
	  $('.site-mobile-menu .has-children').each(function(){
		var $this = $(this);

		$this.prepend('<span class="arrow-collapse collapsed">');

		$this.find('.arrow-collapse').attr({
		  'data-toggle' : 'collapse',
		  'data-target' : '#collapseItem' + counter,
		});

		$this.find('> ul').attr({
		  'class' : 'collapse',
		  'id' : 'collapseItem' + counter,
		});

		counter++;

	  });

	}, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
	  var $this = $(this);
	  if ( $this.closest('li').find('.collapse').hasClass('show') ) {
		$this.removeClass('active');
	  } else {
		$this.addClass('active');
	  }
	  e.preventDefault();

	});

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function(e) {
		var container = $(".site-mobile-menu");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
		  if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
		}
		});
	};
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	sitePlusMinus();


	var siteSliderRange = function() {
	$( "#slider-range" ).slider({
	  range: true,
	  min: 0,
	  max: 500,
	  values: [ 75, 300 ],
	  slide: function( event, ui ) {
		$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	  }
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	  " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	siteSliderRange();


	var siteMagnificPopup = function() {
		$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		 gallery: {
		  enabled: true,
		  navigateByImgClick: true,
		  preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
		  verticalFit: true
		},
		zoom: {
		  enabled: true,
		  duration: 300 // don't foget to change the duration also in CSS
		}
	  });

	  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	  });
	};
	siteMagnificPopup();

	var searchShow = function() {
		var searchWrap = $('.search-wrap');
		$('.js-search-open').on('click', function(e) {
			e.preventDefault();
			searchWrap.addClass('active');
			setTimeout(function() {
				searchWrap.find('.form-control').focus();
			}, 300);
		});
		$('.js-search-close').on('click', function(e) {
			e.preventDefault();
			searchWrap.removeClass('active');
		})
	};
	searchShow();

});

function addItem() {
	var ownerid = checkIsLoggedIn();

	var itemName = document.getElementById("itemName").value;
	var itemDescription = document.getElementById("itemDescription").value;
	var buyNowPrice = document.getElementById("buyNowPrice").innerHTML;
	var auctionBasePrice = document.getElementById("auctionBasePrice").innerHTML;
	var startTime = document.getElementById("startTime").value;
	var endTime = document.getElementById("endTime").value;
	var isAuction = document.getElementById("isAuction");
	var category = document.getElementById("category").value;
	var itemAmount = document.getElementById("itemAmount").value;

	var data = {"owner_id": ownerid,  "item_name": itemName, "item_description": itemDescription, "buy_now_price": buyNowPrice, "auction_start_price": auctionBasePrice, "quantity": itemAmount, "category": category, "sale_option": 1, "status": 0};

	//buynow is 1, both is 2, auction only is 3
	if (isAuction.checked){
		if(buyNowPrice==0)
		{
			data["sale_option"] = 3;
		}
		else{
			data["sale_option"] = 2;
		}
		data["start_time"] = startTime;
		data["end_time"] = endTime;
	}

	var response = null;
	var url = PREFIX.URL + "addItem";
	var shouldBeAsync = false;
	var postData = JSON.stringify(data);

	var request = new XMLHttpRequest();
	request.open("POST", url, shouldBeAsync);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	//request.setRequestHeader('Access-Control-Allow-Headers', '*');
	request.onload = function() {

		if (request.readyState == 4 && request.status == 200) {
			response = JSON.parse(request.response);
		};
	};
	request.send(postData);
	var added_item_id = response["item_id"];
	// add failure-- alert
	if (added_item_id == -1) {
		alert("There was problem in adding this item. Check the fields or try again later.");
		return;
	}
	alert("Added item id successfully");
	sessionStorage.setItem("item_id", response["item_id"]);
	location.href = "user_profile.html#mysalestab";
};

function updateItem() {

	var itemid = sessionStorage.getItem("item_id");
	var sale_option = sessionStorage.getItem("sale_option");
	var itemName = document.getElementById("itemName").innerHTML;
	var itemDescription = document.getElementById("itemDescription").innerHTML;
	var buyNowPrice = document.getElementById("buyNowPrice").innerHTML;
	var auctionBasePrice = document.getElementById("auctionBasePrice").innerHTML;
	var category = document.getElementById("category").value;
	var itemAmount = document.getElementById("itemAmount").value;
	var startTime = document.getElementById("startTime").value;
	var endTime = document.getElementById("endTime").value;

	var data = {"item_id": itemid, "item_name": itemName, "item_description": itemDescription, "buy_now_price": buyNowPrice, "auction_start_price": auctionBasePrice, "quantity": itemAmount, "category": category, "sale_option": sale_option}
	data["sale_option"] = sessionStorage.getItem("sale_option");
	

	if(sessionStorage.getItem("end_time") != null){
		data["start_time"] = sessionStorage.getItem("start_time");
		data["end_time"] = sessionStorage.getItem("end_time");
	}
	// If currently the item is but now only
	if (sale_option == 1)
	{
		if(endTime != 0){
			data["start_time"] = startTime;
			data["end_time"] = endTime;
			data["sale_option"] = 2;
			if(buyNowPrice == 0){
				data["sale_option"] = 3;
			}
		}
	}
	// case when buynow item start auction
	else{
		if(buyNowPrice != 0)
		{
			data["sale_option"] = 2;
		}
		else{
			data["sale_option"] = 3;
		}
	}
	var response = null;
	var url = PREFIX.URL + "updateItem";
	var postData = JSON.stringify(data);

	var request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

	request.onload = function() {

		if (request.readyState == 4 && request.status == 200) {
			response = JSON.parse(request.response);
		};
	};
	request.send(postData);

	// Here send email if new buy now price below buyers' expection price
	var response = null;
	var url = PREFIX.URL + "emailBelowExpectPrice";
	var postData = JSON.stringify({"item_id": itemid, "item_name": itemName, "buy_now_price": buyNowPrice});
	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.onload = function() {

		if (request.readyState == 4 && request.status == 200) {
			response = JSON.parse(request.response);
		};
	};
	request.send(postData);

	alert("Successfully updated item!");
	location.href = "user_profile.html#mysalestab";

};
function storeOwnerId(ownerid){
	sessionStorage.setItem("user_id", ownerid);
}

function storeItemId(obj){
	itemid = $(obj).parent().parent()[0].id;
	sessionStorage.setItem("item_id", itemid);
}

function showCountdown(item, countdown)
{
	// check if the item is for auction
	if ((item["sale_option"] == 2 || item["sale_option"] == 3) && item["end_time"] != null) {
		var auctionEnd = new Date(item["end_time"]).getTime();
		var x = setInterval(function() {
			var now = new Date().getTime();
			var t = auctionEnd - now;
			sessionStorage.setItem("auction_time_left", t);
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((t % (1000 * 60)) / (1000));

			countdown.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
			if (t < 0) {
				clearInterval(x);
				console.log("expired");
				countdown.innerHTML = "EXPIRED";}
		}, 1000);
	}
}

function getItem(page)
{
	checkIsLoggedIn();

	var itemid = sessionStorage.getItem("item_id");
	url = PREFIX.URL + "getItem";
	var getData = JSON.stringify({"item_id": itemid});
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
	showItem(response["payload"][0], page);

}

function showItem(item, page)
{
	var name = document.getElementById('itemName');
	var itemDescription = document.getElementById("itemDescription");
	var buyNowPrice = document.getElementById("buyNowPrice");
	var auctionBasePrice = document.getElementById("auctionBasePrice");
	var itemAmount = document.getElementById("itemAmount");
	var countdown = document.getElementById("countdown");
	var quantity_available = document.getElementById("quantity");
	var category = {};

	category["Shoes"] = document.getElementById("Shoes");
	category["Pants"] = document.getElementById("Pants");
	category["Clothes"] = document.getElementById("Clothes");
	category["Hat"] = document.getElementById("Hat");

	name.innerHTML = item["item_name"];
	itemDescription.innerHTML = item["item_description"];
	buyNowPrice.innerHTML = item["buy_now_price"];
	auctionBasePrice.innerHTML = item["auction_start_price"];
	var quantity = item["quantity"];
	// set quantity and save
	sessionStorage.setItem("quantity", quantity);

	// hide elements depending on sale option
	//sale_option=1 buynow only
	var sale_option = item["sale_option"];
	var owner_id = item["owner_id"];

	sessionStorage.setItem("owner_id", owner_id);
	sessionStorage.setItem("sale_option", sale_option);
	var role = sessionStorage.getItem("role");

	if (page == 'single_item') {
		if (sale_option == 1) {
			document.getElementById("hide-auction-base-price").style.display = "none";
			document.getElementById("hide-current-bid-price").style.display = "none";
			document.getElementById("hide-auction-start").style.display = "none";
		} else {
			showCountdown(item, countdown);
			document.getElementById("hide-countdown").style.display = "block";

			quantity_available.innerHTML = quantity;
			var auctionStart = document.getElementById("auction-start");
			var auctionStartTime = item["start_time"];
			auctionStart.innerText = auctionStartTime
			sessionStorage.setItem("auction_start_time", auctionStartTime);

			var system_time = new Date().getTime();
			var start_time = new Date(auctionStartTime);
			var end_time = new Date(item["end_time"])

			// Display place bid button and refresh only when in valid time window.
			if(system_time > start_time && system_time < end_time){
				document.getElementById("hide-bid-price-button").style.display = "block";
				// Only admin can see the button
				if(role == "Admin"){
					document.getElementById("endbutton").style.display  = "block";
				}
				// get current highest bid. Refresh every 2 seconds
				getCurrBid(itemid);
				window.setInterval(function () {
					getCurrBid(itemid);
				}, 2000);
			}


			if (sale_option == 3) { //sale_option=3 auction only
				document.getElementById("hide-buy-now-price").style.display = "none";
				document.getElementById("hide-buy-now-price-button").style.display = "none";
			}
		}
		//WatchList operations
		var itemid = sessionStorage.getItem("item_id");
		var user_id = sessionStorage.getItem("user_id");
		var url = PREFIX.URL + "checkWatchList";
		var postData = JSON.stringify({"user_id": user_id, "item_id": itemid});

		var request = new XMLHttpRequest();
		request.open("POST", url, false);
		request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		request.onload = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.response);
			};
		};

		request.send(postData);

		if (response["success"] == true) {
			document.getElementById("addToWatchilist").innerHTML = '<i class="fas fa-heart" style= "cursor: pointer;"></i>';
		}

	} else {
		sessionStorage.removeItem("start_time");
		sessionStorage.removeItem("end_time");
		var countdownBlock = document.getElementById("countdownblock");
		var buynowBlock = document.getElementById("buynowblock");
		var auctionBaseBlock = document.getElementById("auctionbaseblock");
		var quantityBlock = document.getElementById("quantityblock");
		var startTimeBlock = document.getElementById("starttimeblock");
		var endTimeBlock = document.getElementById("endtimeblock");
		var quantity = document.getElementById("itemAmount");

		if(item["end_time"] != null){
			sessionStorage.setItem("start_time", item["start_time"]);
			sessionStorage.setItem("end_time", item["end_time"]);
		}
		
		quantity.value = item["quantity"]
		if(item["category"] != null){
			category[item["category"]].checked=true;
			document.getElementById("category").value = item["category"];
		}

		countdownBlock.style.display = "None";
		// If item has auction
		if (sale_option != 1) {
			startTimeBlock.style.display = "None";
			endTimeBlock.style.display = "None";
			countdownBlock.style.display = "Block";

			var system_time = new Date().getTime();
			var start_time = new Date(item["start_time"]);
			var end_time = new Date(item["end_time"])


			// auction not start
			if(system_time < start_time){
				countdownBlock.innerHTML = 'Auction has not started yet!';
			}
			else if (system_time > end_time) {
				countdownBlock.innerHTML = 'Auction ended! You can relist it!';
				startTimeBlock.style.display = "Block";
				endTimeBlock.style.display = "Block";
			}
			else {
				//auction start, but not end
				showCountdown(item, countdown);
				auctionBaseBlock.innerHTML = 'Auction Base Price: $<strong class="text-primary h4" id="auctionBasePrice">' + auctionBasePrice.innerHTML + '</strong>';
				quantityBlock.innerHTML = '<div class="input-group mb-3" style="max-width: 120px;"><input type="text" class="form-control text-center" value="1" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" disabled id = "itemAmount">';
			}
		}
	}
}


// get current highest bid
function getCurrBid(itemid) {
	// get curr bid from mongo db and load on frontend
	urlMd = PREFIX.URL + "getHighestBid";
	var getDataMd = JSON.stringify({"item_id": itemid});
	var requestMd = new XMLHttpRequest();
	var responseMd = null;
	requestMd.open("POST", urlMd, false);
	requestMd.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

	requestMd.onreadystatechange = function() {
		if (requestMd.readyState == 4 && requestMd.status == 200) {
			responseMd = JSON.parse(requestMd.responseText);
			console.log(responseMd);
		}
	}
	requestMd.send(getDataMd);

	var successMd = responseMd["success"];
	if (successMd) {
		if (responseMd["payload"] == null) {
			document.getElementById("currentBidPrice").innerHTML = "0.00";
		} else {
			var currBidPrice = responseMd["payload"]["bid"];
			document.getElementById("currentBidPrice").innerHTML = currBidPrice;
		}
	} else {
		document.getElementById("currentBidPrice").innerHTML = "0.00";
	}
}

function endAuction() {
	var itemid = sessionStorage.getItem("item_id");
	var sale_option = sessionStorage.getItem("sale_option");

	var url = PREFIX.URL + "updateItemField";
	time = new Date().toLocaleString("sv-SE").slice(0, 19).replace(',', ' ');
	time =  "\'"+ time + "\'";

	var postData = JSON.stringify({"item_id": itemid, "item_field": "end_time", "value": time});
	var request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.onload = function() {
		if (request.readyState == 4 && request.status == 200) {
			response = JSON.parse(request.response);
		};
	};
	request.send(postData);
	alert("Successfully end auction item");
	location.reload();

};

function getMyItems()
{
	var ownerid = sessionStorage.getItem("user_id");

	var url = PREFIX.URL + "getItemByOwner";
	var getData = JSON.stringify({"owner_id": ownerid});
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


	showMyItems(payload);

}

function showMyItems(payload)
{
	url = PREFIX.URL + "getItem";
	var table = document.getElementById("sales");
	while(table.rows[0]) table.deleteRow(0);
	
	var tbody = document.createElement("tbody")
	var total = 0;
	for (i in payload) {
		var entry = payload[i]
		item_id = entry["item_id"];
		quantity = entry["quantity"];
		var request = new XMLHttpRequest();
		var getData = JSON.stringify({"item_id": item_id})
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

		console.log(response["payload"])
		info = response["payload"][0];
		item_name = info["item_name"]
		buy_now_price = info["buy_now_price"]
		auction_end_price = info["auction_end_price"];
		price = auction_end_price == null ? buy_now_price : auction_end_price;


		var row = document.createElement('tr');
		row.id = item_id;

		var imageCell = document.createElement('td');
		var productCell = document.createElement('td');
		var priceCell = document.createElement('td');
		var quantityCell = document.createElement('td');
		var actionCell = document.createElement('td');

		imageCell.className = "product-thumbnail";
		productCell.className = "product-name";
		priceCell.className = "product_price";
		quantity.className = "produc_quantity";
		actionCell.className = "product_remove";

		imageCell.innerHTML = '<img src="images/product_1.jpg" alt="Image" class="img-fluid"/>';
		productCell.innerHTML = '<h2 class="h5 text-black">' + item_name + '</h2>';
		priceCell.innerHTML = '$' + price;
		quantityCell.innerHTML = quantity;
		actionCell.innerHTML = '<a href="update_item.html" class="btn btn-primary height-auto btn-sm" span onclick="storeItemId(this);">Update</a> <hr> <a href="#" style="background-color: red;" class="btn btn-primary height-auto btn-sm" span onclick="delete_item(this)">Delete</a>';

		row.appendChild(imageCell);
		row.appendChild(productCell);
		row.appendChild(priceCell);
		row.appendChild(quantityCell);
		row.appendChild(actionCell);

		tbody.appendChild(row);

	}
	var table = document.getElementById("sales");
	table.appendChild(tbody);

}

function delete_item(obj){
	var r = confirm("Are you sure to delete? This action cannot be undone!");
	if(r){
		var item_id = $(obj).parent().parent()[0].id;
		url = PREFIX.URL + "removeItem";
		var getData = JSON.stringify({"item_id": item_id});
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
		if(response['success'] == true){
			alert("Item Removed.");
			location.reload();
		}
		else{
			alert("There is a bid on item, you cannot delete it!");
		}
	}
}

// Given a userid, get its shoppingcart.
function getCart()
{
	var user_id = checkIsLoggedIn();

	url = PREFIX.URL + "getShoppingCart";
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

	var payload = response["payload"];

	showCart(payload);

}

function showCart(payload)
{
	url = PREFIX.URL + "getItem";
	var tbody = document.createElement("tbody")
	tbody.id = "cart_body";
	var total = 0;
	for (i in payload) {
		var entry = payload[i];
		var item_id = entry["item_id"];
		var quantity = entry["quantity"];
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
		var info = response["payload"][0];
		var owner_id = info["owner_id"];
		var item_name = info["item_name"];
		var max_quantity = info["quantity"];
		sessionStorage.setItem(item_id + "_max_quantity", max_quantity);
		var buy_now_price = info["buy_now_price"];
		var auction_end_price = info["auction_end_price"];
		var price = auction_end_price == null ? buy_now_price : auction_end_price;

		var row = document.createElement('tr');
		row.id = item_id;

		var imageCell = document.createElement('td');
		var productCell = document.createElement('td');
		var priceCell = document.createElement('td');
		var quantityCell = document.createElement('td');
		var totalCell = document.createElement('td');
		var actionCell = document.createElement('td');

		imageCell.className = "product-thumbnail";
		productCell.className = "product-name";
		priceCell.className = "product_price";
		quantity.className = "product_quantity";
		totalCell.className = "product_total";
		actionCell.className = "product_remove";

		imageCell.innerHTML = '<img src="images/product_1.jpg" alt="Image" class="img-fluid" style= "cursor: pointer" onclick=item_redirect(' + item_id + ')>' + '</img>';
		productCell.innerHTML = '<h2 class="h5 text-black" style= "cursor: pointer" onclick=item_redirect(' + item_id + ')>' + item_name +'</h2>';
		productCell.id = owner_id;
		priceCell.innerHTML =  price;
		priceCell.id = item_id + "_price";
		totalCell.innerHTML = quantity * price;
		total += quantity * price;
		quantityCell.innerHTML = '<input id = ' + item_id + '_quantity ;type="text", name="quantity", value=' + quantity+ '> <hr> <a href="#" class="btn btn-primary height-auto btn-sm" span onclick="update_cart(this)">Update Quantity</a>';
		actionCell.innerHTML = '<a href="#" style="background-color: red;" class="btn btn-primary height-auto btn-sm" span onclick="delete_cart(this)">Delete From Cart</a>';

		row.appendChild(imageCell);
		row.appendChild(productCell);
		row.appendChild(priceCell);
		row.appendChild(quantityCell);
		row.appendChild(totalCell);
		row.appendChild(actionCell);

		tbody.appendChild(row);

	}
	var table = document.getElementById("cart");
	table.appendChild(tbody);
	document.getElementById("Subtotal").innerHTML = "$" + total;
	document.getElementById("Total").innerHTML = "$" + total;
}


function delete_cart(obj){
	var user_id = sessionStorage.getItem("user_id");

	var url = PREFIX.URL + "removeFromShoppingCart";

	var item_id = $(obj).parent().parent()[0].id;
	$(obj).parent().parent().parent()[0].removeChild($(obj).parent().parent()[0]);
	var postData = JSON.stringify({"user_id": user_id, "item_id": item_id});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.send(postData);
	response = JSON.parse(request.responseText);
	if (response["success"]) {
		alert("Removed.");
		location.reload();
	} else {
		alert("Remove Failed. You can't remove bidded item!");
	}
}

function update_cart(obj) {
	var user_id = sessionStorage.getItem("user_id");

	var url = PREFIX.URL + "updateShoppingCart";

	var item_id = $(obj).parent().parent()[0].id;
	var quantity = document.getElementById(item_id + "_quantity").value;
	var max_quantity = sessionStorage.getItem(item_id + "_max_quantity");
	if (quantity > max_quantity) {
		alert("Can not add more than max quantity.");
		return;
	}
	var postData = JSON.stringify({"user_id": user_id, "item_id": item_id, "quantity": quantity});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.send(postData);
	response = JSON.parse(request.responseText);
	if (response["success"]) {
		location.reload();
	} else {
		alert("Update Failed. Please Try Again");
	}
}

function search_redirect() {
	var keyword = document.getElementById("searchbar").value;
	sessionStorage.setItem("search_keyword", keyword);
	window.location = "index.html";
}

function search_item()
{
	var keyword = sessionStorage.getItem("search_keyword");
	if (keyword == null) {
		keyword = document.getElementById("searchbar").value;
	} else {
		sessionStorage.removeItem("search_keyword");
	}
	if (keyword == null || keyword == '') {
		return;
	}
	var url = PREFIX.URL + "searchItem";
	var postData = JSON.stringify({"keyword": keyword});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.send(postData);
 	response = JSON.parse(request.responseText);
	if (response["success"] == false) {
		alert("No Matching Found.");
		return;
	} else {
		var payload = response["payload"];
		var tbody = document.getElementById('tbody');
		tbody.innerHTML = '';
		for (i in payload) {
			var item = payload[i];
			var item_id = item["item_id"];
			var item_name = item["item_name"];
			var buy_now_price = item["buy_now_price"];
			var auction_end_price = item["auction_end_price"];
			var price = auction_end_price == null ? buy_now_price : auction_end_price;
			var quantity = item["quantity"];

			var row = document.createElement('tr');

			var imageCell = document.createElement('td');
			var productCell = document.createElement('td');

			var priceCell = document.createElement('td');
			var quantityCell = document.createElement('td');
			imageCell.className = "product-thumbnail";
			productCell.className = "product-name";
			priceCell.className = "product_price";
			quantity.className = "produc_quantity";
			imageCell.innerHTML = '<img src="images/product_1.jpg" alt="Image" class="img-fluid" style= "cursor: pointer" onclick=item_redirect(' + item_id + ')>' + '</img>';
			productCell.innerHTML = '<h2 class="h5 text-black" style= "cursor: pointer" onclick=item_redirect(' + item_id + ')>' + item_name +'</h2>';
			priceCell.innerHTML = '$' + price;
			quantityCell.innerHTML = quantity;
			row.appendChild(imageCell);
			row.appendChild(productCell);
			row.appendChild(priceCell);
			row.appendChild(quantityCell);

			tbody.appendChild(row);
		}
		var table = document.getElementById("search_results");
		table.style.visibility = "visible";
		var container = document.getElementById("main");
		if (container != null) {
			container.parentNode.removeChild(container);
		}
	}
}

function myAccountRedirect()
{
  if (sessionStorage.getItem("user_id") != null) {
	location.href = "user_profile.html";
  } else {
	location.href = "login_signup.html";
  }
}


function checkout()
{
	var user_id = sessionStorage.getItem("user_id");

	var url = PREFIX.URL + "checkout"
	var tbody = document.getElementById("cart_body");
	for (i = 0; i < tbody.rows.length; i ++) {
		var item_id = tbody.rows[i].id;
		var owner_id = tbody.rows[i].cells[1].id;
		var product_name = tbody.rows[i].cells[1].innerText;
		var price = document.getElementById(item_id + "_price").innerHTML;
		var quantity = document.getElementById(item_id + "_quantity").value;
		var max_quantity = sessionStorage.getItem(item_id + "_max_quantity");
		var postData = JSON.stringify({"buyer_id": user_id, "seller_id": owner_id, "item_id": item_id, "item_name": product_name, "quantity": quantity, "unit_price": price, "max_quantity": max_quantity});
		var request = new XMLHttpRequest();
		var response = null;
		request.open("POST", url, false);
		request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		request.send(postData);
		response = JSON.parse(request.responseText);
		var order_id = response["order_id"];
		if (order_id == -1) {
			alert(product_name + " checkout failed. Please try again!");
			return;
		} else {
			alert(product_name + " checkout succeeded. Order_id = " + order_id + ".");
		}
	}
	window.location = "thankyou.html";
}

function item_redirect(item_id)
{
	sessionStorage.setItem("item_id", item_id);
	window.location = "single_item.html";
}

function buyNow() {

	var user_id = checkIsLoggedIn();
	var item_id = sessionStorage.getItem("item_id");
	var quantity = document.getElementById("itemAmount").value;


	// verify want-quantity is valid
	if (quantity > sessionStorage.getItem("quantity")) {
		alert("You cannnot buy more than quantity specified.");
		return;
	}

	var data = {"user_id": user_id,  "item_id": item_id, "quantity": quantity};

	var response = null;
	var url = PREFIX.URL + "addToShoppingCart";
	var shouldBeAsync = false;
	var postData = JSON.stringify(data);

	var request = new XMLHttpRequest();
	request.open("POST", url, shouldBeAsync);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	//request.setRequestHeader('Access-Control-Allow-Headers', '*');
	request.onload = function() {

		if (request.readyState == 4 && request.status == 200) {
			response = JSON.parse(request.response);
		};
	};
	request.send(postData);
	alert("Item Added into your shopping cart: " + response["success"]);

};

function flagItem() {
	var itemid = sessionStorage.getItem("item_id");
	var url = PREFIX.URL + "updateItemField";
	var postData = JSON.stringify({"item_id": itemid, "item_field": "flag", "value": 1});

	var request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	//request.setRequestHeader('Access-Control-Allow-Headers', '*');
	request.onload = function() {

		if (request.readyState == 4 && request.status == 200) {
			response = JSON.parse(request.response);
		};
	};
	request.send(postData);
	alert("Successfully flag item");

};

function addToWatchilist() {
	var user_id = sessionStorage.getItem("user_id");
	var item_id = sessionStorage.getItem("item_id");
	
	var url = PREFIX.URL + "checkWatchList";
	var postData = JSON.stringify({"user_id": user_id, "item_id": item_id});

	var request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.onload = function() {
		if (request.readyState == 4 && request.status == 200) {
			response = JSON.parse(request.response);
		};
	};

	request.send(postData);

	if (response["success"] == true) {
		document.getElementById("addToWatchilist").innerHTML = '<i class="far fa-heart" style= "cursor: pointer;"></i>';

		url = PREFIX.URL + "removeFromWatchList";
		response = null;
		request.open("POST", url, false);
		request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		request.send(postData);
		response = JSON.parse(request.responseText);
		if (response["success"]) {
			alert("Removed from watch list.");
		} else {
			alert("Remove Failed. You can't remove bidded item!");
		}
	} else {
		document.getElementById("addToWatchilist").innerHTML = '<i class="fas fa-heart" style= "cursor: pointer;"></i>';
		var expectPrice = document.getElementById("expectPrice").innerHTML;
		var data = {"user_id": user_id,  "item_id": item_id, "expectPrice": expectPrice};
		response = null;
		url = PREFIX.URL + "addToWatchList";
		var shouldBeAsync = false;
		postData = JSON.stringify(data);
		request.open("POST", url, shouldBeAsync);
		request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		//request.setRequestHeader('Access-Control-Allow-Headers', '*');
		request.onload = function() {

			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.response);
			};
		};
		request.send(postData);
		alert("Item Added into your watch list: " + response["success"]);
	}

};

// Given a userid, get its watch list.
function getWatchList()
{
	var user_id = checkIsLoggedIn();
	url = PREFIX.URL + "getWatchList";
	var getData = JSON.stringify({"user_id": user_id});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
			};
		}
	request.send(getData);

	var payload = response["payload"];

	showWatchlist(payload);

}

function showWatchlist(payload)
{
	url = PREFIX.URL + "getItem";
	var tbody = document.createElement("tbody")
	tbody.id = "watchlist_body";
	var total = 0;
	for (i in payload) {
		var entry = payload[i]
		item_id = entry["item_id"];
		expect_price = entry["expect_price"];
		var request = new XMLHttpRequest();
		var getData = JSON.stringify({"item_id": item_id})
		var response = null;
		request.open("POST", url, false);
		request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				// console.log(response);
			};
		}
		request.send(getData);
		if(response["payload"]) {
			var info = response["payload"][0];
			var owner_id = info["owner_id"];
			var item_name = info["item_name"];
			var buy_now_price = info["buy_now_price"];
			var auction_end_price = info["auction_end_price"];

			// TODO: need to change current price into real-time price
			var current_price = auction_end_price == null ? buy_now_price : auction_end_price;


			var row = document.createElement('tr');
			row.id = item_id;

			var imageCell = document.createElement('td');
			var productCell = document.createElement('td');
			var currentPriceCell = document.createElement('td');
			var expectiPriceCell = document.createElement('td');
			var actionCell = document.createElement('td');

			imageCell.className = "product-thumbnail";
			productCell.className = "product-name";
			currentPriceCell.className = "product_currentPrice";
			expectiPriceCell.className = "product_expectPrice";
			actionCell.className = "product_remove";

			imageCell.innerHTML = '<img src="images/product_1.jpg" style= "cursor: pointer;" alt="Image" class="img-fluid" onclick=item_redirect(' + item_id + ')>' + '</img>';
			productCell.innerHTML = '<h2 class="h5 text-black" style= "cursor: pointer;" onclick=item_redirect(' + item_id + ')>' + item_name +'</h2>';
			productCell.id = owner_id;
			currentPriceCell.innerHTML =  current_price;
			currentPriceCell.id = item_id + "_currentPrice";
			// totalCell.innerHTML = quantity * price;
			// total += quantity * price;
			expectiPriceCell.innerHTML = '<input id = ' + item_id + '_expectPrice ;type="text", name="expectPrice", value=' + expect_price+ '> <hr> <a href="#" class="btn btn-primary height-auto btn-sm" span onclick="update_expect_price(this)">Update Expect Price</a>';
			actionCell.innerHTML = '<a href="#" style="background-color: red;" class="btn btn-primary height-auto btn-sm" span onclick="delete_watch_list(this)">Delete From Watch List</a>';

			row.appendChild(imageCell);
			row.appendChild(productCell);
			row.appendChild(currentPriceCell);
			row.appendChild(expectiPriceCell);
			row.appendChild(actionCell);

			tbody.appendChild(row);
		}

	}
	var table = document.getElementById("watchList");
	table.appendChild(tbody);
}


function delete_watch_list(obj){
	var user_id = sessionStorage.getItem("user_id");
	var url = PREFIX.URL + "removeFromWatchList";

	var item_id = $(obj).parent().parent()[0].id;
	$(obj).parent().parent().parent()[0].removeChild($(obj).parent().parent()[0]);
	var postData = JSON.stringify({"user_id": user_id, "item_id": item_id});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.send(postData);
	response = JSON.parse(request.responseText);
	if (response["success"]) {
		location.reload();
	} else {
		alert("Remove Failed. You can't remove bidded item!");
	}
}

function update_expect_price(obj) {
	var user_id = sessionStorage.getItem("user_id");

	var url = PREFIX.URL + "updateWatchList";

	var item_id = $(obj).parent().parent()[0].id;
	var expect_price = document.getElementById(item_id + "_expectPrice").value;
	var postData = JSON.stringify({"user_id": user_id, "item_id": item_id, "expect_price": expect_price});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.send(postData);
	response = JSON.parse(request.responseText);
	if (response["success"]) {
		location.reload();
	} else {
		alert("Update Failed. Please Try Again");
	}
}

function getOrders()
{
	var user_id = checkIsLoggedIn();
	var url = PREFIX.URL + "getOrderByBuyer";

	var postData = JSON.stringify({"buyer_id": Number(user_id)});
	var request = new XMLHttpRequest();
	var response = null;
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.send(postData);
	response = JSON.parse(request.responseText);
	if (response["success"]) {
		var payload = response["payload"];
		var tbody = document.createElement('tbody')
		for (i in payload) {
			var item = payload[i];
			var item_id = item["item_id"];
			var item_name = item["item_name"];
			var order_id = item["order_id"];
			var quantity = item["quantity"];
			var unit_price = item["unit_price"];

			var row = document.createElement('tr');

			var imageCell = document.createElement('td');
			var orderCell = document.createElement('td');
			var productCell = document.createElement('td');

			var priceCell = document.createElement('td');
			var quantityCell = document.createElement('td');
			var totalCell = document.createElement('td');
			imageCell.className = "product-thumbnail";
			productCell.className = "product-name";
			priceCell.className = "product_price";
			quantityCell.className = "produc_quantity";
			totalCell.className = "product_total";

			imageCell.innerHTML = '<img src="images/product_1.jpg" alt="Image" class="img-fluid" style= "cursor: pointer" onclick=item_redirect(' + item_id + ')>' + '</img>';
			productCell.innerHTML = '<h2 class="h5 text-black" style= "cursor: pointer" onclick=item_redirect(' + item_id + ')>' + item_name +'</h2>';
			orderCell.innerHTML = order_id;
			priceCell.innerHTML = '$' + unit_price;
			quantityCell.innerHTML = quantity;
			totalCell.innerHTML = '$' + unit_price * quantity;
			row.appendChild(imageCell);
			row.appendChild(orderCell);
			row.appendChild(productCell);
			row.appendChild(priceCell);
			row.appendChild(quantityCell);
			row.appendChild(totalCell);

			tbody.appendChild(row);
		}
		var table = document.getElementById("orders");
		table.appendChild(tbody);
	} else {
		alert("Failed to get your orders. Please Try Again");
		return;
	}
}

function getFlaggedItem()
{
	var url = PREFIX.URL + "getFlaggedItem";
	var request = new XMLHttpRequest();
	var response = null;
	request.open("GET", url, false);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				response = JSON.parse(request.responseText);
				console.log(response)
			};
		}
	request.send();

	// Get Item Information
	var payload = response["payload"];

	showFlaggedItems(payload);

}

function showFlaggedItems(payload)
{
	var tbody = document.createElement("tbody")
	for (i in payload) {
		var entry = payload[i]
		item_id = entry["item_id"];
		item_name = entry["item_name"];

		quantity = entry["quantity"];
		buy_now_price = entry["buy_now_price"]
		auction_end_price = entry["auction_end_price"];
		price = auction_end_price == null ? buy_now_price : auction_end_price;

		var row = document.createElement('tr');
		row.id = item_id;

		var imageCell = document.createElement('td');
		var productCell = document.createElement('td');
		var priceCell = document.createElement('td');
		var quantityCell = document.createElement('td');

		imageCell.className = "product-thumbnail";
		productCell.className = "product-name";
		priceCell.className = "product_price";
		quantity.className = "produc_quantity";

		imageCell.innerHTML = '<img src="images/product_1.jpg" style= "cursor: pointer;" alt="Image" class="img-fluid" onclick=item_redirect(' + item_id + ')>' + '</img>';
		productCell.innerHTML = '<h2 class="h5 text-black" style= "cursor: pointer;" onclick=item_redirect(' + item_id + ')>' + item_name +'</h2>';

		priceCell.innerHTML = '$' + price;
		quantityCell.innerHTML = quantity;

		row.appendChild(imageCell);
		row.appendChild(productCell);
		row.appendChild(priceCell);
		row.appendChild(quantityCell);

		tbody.appendChild(row);

	}
	var table = document.getElementById("flaggedItems");
	table.appendChild(tbody);

}
