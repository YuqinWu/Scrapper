from my_sql_manager import MySQLManager
from datetime import datetime
from flask import jsonify
from decimal import Decimal
import requests

class Checkout:

    # Stored Procedures in MySQL
    CHECKOUT = 'checkout'
    GET = 'get_order'
    GET_BUYER = 'get_order_by_buyer'
    GET_SELLER = 'get_order_by_seller'

    Fields = ['order_id', 'buyer_id', 'seller_id', 'item_id', 'item_name', 'quantity', 'unit_price', 'timestamp']

    SHOPPING_CART_URL = 'http://localhost:5000/removeFromShoppingCart'
    ITEM_URL = 'http://localhost:5000/updateItemField'

    # returns an unique order id for every checkout
    @staticmethod
    def checkout(json_item):
        response = {'order_id': -1}
        try:
            buyer_id = json_item.get('buyer_id')
            seller_id = json_item.get('seller_id')
            item_id = json_item.get('item_id')
            quantity = json_item.get('quantity')
            max_quantity = json_item.get('max_quantity')
            unit_price = json_item.get('unit_price')
            item_name = json_item.get('item_name')
            timestamp = datetime.now()
            args = [buyer_id, seller_id, item_id, item_name, quantity, unit_price, timestamp]
            res = MySQLManager.call_proc(Checkout.CHECKOUT, args)
            order_id = res[0][0]
            response['order_id'] = order_id
            if order_id != -1:
                sc_payload = {'user_id': buyer_id, 'item_id': item_id}
                item_payload = {'item_id': item_id, 'item_field': 'quantity', 'value': int(max_quantity) - int(quantity)}
                requests.post(Checkout.ITEM_URL, json=item_payload)
                requests.post(Checkout.SHOPPING_CART_URL, json=sc_payload)
        except:
            response['order_id'] = -1
        finally:
            return jsonify(response)

    # Given an order_id, return all its data fields
    @staticmethod
    def get(json_item):
        response = {'success': False}
        try:
            order_id = json_item.get('order_id')
            res = MySQLManager.call_proc(Checkout.GET, [order_id])
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Checkout.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    @staticmethod
    def get_by_buyer(json_item):
        response = {'success': False}
        try:
            buyer_id = json_item.get('buyer_id')
            res = MySQLManager.call_proc(Checkout.GET_BUYER, [buyer_id])
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Checkout.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    @staticmethod
    def get_by_seller(json_item):
        response = {'success': False}
        try:
            seller_id = json_item.get('seller_id')
            res = MySQLManager.call_proc(Checkout.GET_SELLER, [seller_id])
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Checkout.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    @staticmethod
    def parse(data):
        res = []
        for row in data:
            temp = {}
            for i in range(0, len(Checkout.Fields)):
                cell = row[i]
                if isinstance(cell, datetime):
                    cell = str(cell)
                elif isinstance(cell, Decimal):
                    cell = float(cell)
                temp[Checkout.Fields[i]] = cell
            res.append(temp)
        return res
