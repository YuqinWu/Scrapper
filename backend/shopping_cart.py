from flask import jsonify
from my_sql_manager import MySQLManager
from datetime import datetime


class ShoppingCart:

    # Stored Procedures in MySQL
    ADD = 'add_to_shopping_cart'
    REMOVE = 'remove_from_shopping_cart'
    GET = 'get_shopping_cart'
    UPDATE = 'update_shopping_cart'

    Table = 'ScrapperDB.Carts'

    Fields = ['user_id', 'item_id', 'quantity', 'time_stamp']

    # Add item to user's shopping cart
    @staticmethod
    def add(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            item_id = json_item.get('item_id')
            quantity = json_item.get('quantity')
            timestamp = datetime.now()
            args = [user_id, item_id, quantity, timestamp]
            res = MySQLManager.call_proc(ShoppingCart.ADD, args)
            response = {'success': res[0][0]}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # remove item from user's shopping cart
    @staticmethod
    def remove(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            item_id = json_item.get('item_id')
            args = [user_id, item_id]
            res = MySQLManager.call_proc(ShoppingCart.REMOVE, args)
            response = {'success': res[0][0]}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # get user's shopping cart
    @staticmethod
    def get(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            res = MySQLManager.call_proc(ShoppingCart.GET, [user_id])
            payload = []
            for row in res:
                payload.append({'item_id': row[0], 'quantity': row[1]})
            response['payload'] = payload
            response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # update shopping cart quantity and timestamp
    @staticmethod
    def update(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            item_id = json_item.get('item_id')
            quantity = json_item.get('quantity')
            timestamp = datetime.now()
            args = [user_id, item_id, quantity, timestamp]
            print(args)
            res = MySQLManager.call_proc(ShoppingCart.UPDATE, args)
            response['success'] = res[0][0]
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

