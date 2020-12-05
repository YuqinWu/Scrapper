from checkout import Checkout
from flask import Flask, request
from flask_cors import CORS
from item import Item
from log_system import LogSystem
from shopping_cart import ShoppingCart
from watchlist import WatchList
from bid import Bid
from send_email import Email
from auction import Auction

app = Flask(__name__)
CORS(app)


########################################################################################################################
# LogSystem
########################################################################################################################
@app.route('/addUser', methods=['GET', 'POST'])
def add_user():
    return LogSystem.add_user(request.json)


@app.route('/removeUser', methods=['GET', 'POST'])
def remove_user():
    return LogSystem.remove_user(request.json)


@app.route('/updateUser', methods=['GET', 'POST'])
def update_user():
    return LogSystem.update_user(request.json)


@app.route('/getUser', methods=['GET', 'POST'])
def get_user():
    return LogSystem.get_user(request.json)


@app.route('/loginUser', methods=['GET', 'POST'])
def login_user():
    return LogSystem.login_user(request.json)


@app.route('/suspendUser', methods=['GET', 'POST'])
def suspend_user():
    return LogSystem.suspend_user(request.json)


@app.route('/reactivateUser', methods=['GET', 'POST'])
def reactivate_user():
    return LogSystem.reactivate_user(request.json)


########################################################################################################################
# Items
########################################################################################################################
@app.route('/addItem', methods=['POST'])
def add_item():
    result = Item.add(request.json)
    return result


@app.route('/removeItem', methods=['POST'])
def remove_item():
    return Item.remove(request.json)


@app.route('/getItem', methods=['GET', 'POST'])
def get_item():
    return Item.get(request.json)

@app.route('/getAllItems', methods=['GET', 'POST'])
def getAllItems():
    return Item.getAllItems()

@app.route('/getFlaggedItem', methods=['GET', 'POST'])
def getFlaggedItem():
    return Item.getFlaggedItem()

@app.route('/getItemByOwner', methods=['GET', 'POST'])
def get_item_by_owner():
    return Item.get_by_owner(request.json)


# This is a generic method to update all fields of the item.
@app.route('/updateItem', methods=['POST'])
def update_item():
    print(request.json)
    return Item.update(request.json)


# Update a certain field of an item.
@app.route('/updateItemField', methods=['POST'])
def update_item_field():
    return Item.update_field(request.json)


@app.route('/searchItem', methods=['POST'])
def search_item():
    return Item.search(request.json)


########################################################################################################################
# Shopping Cart
########################################################################################################################
@app.route('/addToShoppingCart', methods=['POST'])
def add_to_shopping_cart():
    return ShoppingCart.add(request.json)


@app.route('/removeFromShoppingCart', methods=['POST'])
def remove_from_shopping_cart():
    return ShoppingCart.remove(request.json)


@app.route('/getShoppingCart', methods=['GET', 'POST'])
def get_shopping_cart():
    return ShoppingCart.get(request.json)


@app.route('/updateShoppingCart', methods=['POST'])
def update_shopping_cart():
    return ShoppingCart.update(request.json)


########################################################################################################################
# Bid
########################################################################################################################
@app.route('/getBid', methods=['GET', 'POST'])
def get_bid():
    return Bid.get_bid(request.json)


@app.route('/addBid', methods=['GET', 'POST'])
def add_bid():
    return Bid.add_bid(request.json)

@app.route('/selectBid', methods=['GET','POST'])
def select_bid():
    return Bid.select_bid(request.json)


########################################################################################################################
# Watch List
########################################################################################################################
@app.route('/addToWatchList', methods=['POST'])
def add_to_watch_list():
    return WatchList.add(request.json)


@app.route('/removeFromWatchList', methods=['POST'])
def remove_from_watch_list():
    return WatchList.remove(request.json)


@app.route('/getWatchList', methods=['GET', 'POST'])
def get_watch_list():
    return WatchList.get(request.json)

@app.route('/updateWatchList', methods=['POST'])
def update_watch_list():
    return WatchList.update(request.json)

@app.route('/checkWatchList', methods=['POST'])
def check_watch_list():
    return WatchList.check(request.json)

########################################################################################################################
# Checkout
########################################################################################################################
@app.route('/checkout', methods=['POST'])
def checkout():
    return Checkout.checkout(request.json)


@app.route('/getOrder', methods=['GET', 'POST'])
def get_order():
    return Checkout.get(request.json)


@app.route('/getOrderByBuyer', methods=['GET', 'POST'])
def get_order_by_buyer():
    return Checkout.get_by_buyer(request.json)


@app.route('/getOrderBySeller', methods=['GET', 'POST'])
def get_order_by_seller():
    return Checkout.get_by_seller(request.json)


########################################################################################################################
# Auction
########################################################################################################################
@app.route('/placeBid', methods=['POST'])
def place_bid():
    return Auction.add_bid(request.json)


@app.route('/getHighestBid', methods=['POST'])
def get_highest_bid():
    return Auction.get_last_bid(request.json)

########################################################################################################################
# Communication
########################################################################################################################
@app.route('/emailBelowExpectPrice', methods=['POST'])
def email_below_expect_price():
    return Email.emailBelowExpectPrice(request.json)


@app.route('/alertSellerWhenBid', methods=['POST'])
def alert_seller_when_bid():
    return Email.alertSellerWhenBid(request.json)


if __name__ == '__main__':
    # Ask for port listening
    app.run(host='0.0.0.0', port=5000, debug=True)
