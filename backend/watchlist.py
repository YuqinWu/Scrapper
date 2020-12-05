from flask import jsonify
from my_sql_manager import MySQLManager
from datetime import datetime


class WatchList:

    # Stored Procedures in MySQL
    ADD = 'add_to_watch_list'
    REMOVE = 'remove_from_watch_list'
    GET = 'get_watch_list'
    UPDATE = 'update_watch_list'
    CHECK = 'check_watch_list'

    # add an item to a user's watch list
    @staticmethod
    def add(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            item_id = json_item.get('item_id')
            expect_price = json_item.get('expectPrice')
            timestamp = datetime.now()
            args = [user_id, item_id, expect_price, timestamp]
            res = MySQLManager.call_proc(WatchList.ADD, args)
            response = {'success': res[0][0] == 1}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # remove and item from a user's watch lists
    @staticmethod
    def remove(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            item_id = json_item.get('item_id')
            args = [user_id, item_id]
            res = MySQLManager.call_proc(WatchList.REMOVE, args)
            response = {'success': res[0][0] == 1}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # get a user's watch list, return all item ids
    @staticmethod
    def get(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            res = MySQLManager.call_proc(WatchList.GET, [user_id])
            payload = []
            for row in res:
                payload.append({'item_id': row[0], 'expect_price': row[1]})
            response['payload'] = payload
            response['success'] = True
            for row in response['payload']:
                row['expect_price'] = float(row['expect_price'])
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # update watch list expect price
    @staticmethod
    def update(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            item_id = json_item.get('item_id')
            expect_price = json_item.get('expect_price')
            timestamp = datetime.now()
            args = [user_id, item_id, expect_price, timestamp]
            res = MySQLManager.call_proc(WatchList.UPDATE, args)
            response['success'] = res[0][0] == 1
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # check whether in watch list
    @staticmethod
    def check(json_item):
        response = {'success': False}
        try:
            user_id = json_item.get('user_id')
            item_id = json_item.get('item_id')
            args = [user_id, item_id]
            res = MySQLManager.call_proc(WatchList.CHECK, args)
            response['success'] = len(res) >= 1
        except:
            response = {'success': False}
        finally:
            return jsonify(response)