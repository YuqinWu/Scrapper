from mongodb_manager import MongoDBManager
from flask import jsonify

class Auction:
    @staticmethod
    def add_bid(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            item_id = json_item.get('item_id')
            bid = json_item.get('bid')
            res = MongoDBManager.post(item_id, user_id, bid)
            response['success'] = res == 1
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    @staticmethod
    def get_last_bid(json_item):
        response = {'success': False}
        try:
            item_id = json_item.get('item_id')
            bid = MongoDBManager.get(item_id)
            response['payload'] = bid
            response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)
