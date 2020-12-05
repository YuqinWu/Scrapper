function getAllItems()
{
	var url = PREFIX.URL + "getAllItems";
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

	showAllItems(payload);

}

function showAllItems(payload)
{
	url = PREFIX.URL + "getItem";
	var tbody = document.createElement("tbody")
	for (i in payload) {
		var entry = payload[i]
		status = entry["status"];
		// Only show valid items
		if (status != 2){
			console.log(entry);
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
	}
	var table = document.getElementById("allItems");
	table.appendChild(tbody);

}