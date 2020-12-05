from my_sql_manager import MySQLManager
from flask import jsonify
from datetime import datetime
from decimal import Decimal


class Item:

    # Stored Procedures in MySQL
    ADD = 'add_item'
    GET = 'get_item'
    GET_BY_OWNER = 'get_item_by_owner'
    REMOVE = 'remove_item'
    UPDATE = 'update_item'
    SEARCH = 'search_item'

    Table = 'ScrapperDB.Items'

    Fields = ['item_id', 'owner_id', 'item_name', 'item_description', 'status', 'quantity', 'sale_option', 'start_time',
              'end_time', 'buy_now_price', 'auction_start_price', 'auction_end_price', 'category', 'image_link', 'flag']
    updateFields = ['item_id', 'item_name', 'item_description','quantity', 'buy_now_price', 'auction_start_price', 'start_time',
              'end_time','sale_option', 'category']

    # Add an Item to Database and return its item_id
    @staticmethod
    def add(json_item):
        response = {'item_id': -1}
        try:
            args = []
            for i in range(1, len(Item.Fields)):
                args.append(json_item.get(Item.Fields[i]))
            res = MySQLManager.call_proc(Item.ADD, args)
            item_id = res[0][0]
            response = {'item_id': item_id}
        except:
            response = {'item_id': -1}
        finally:
            return jsonify(response)

    # Given an item_id, get all its data fields from database
    @staticmethod
    def get(json_item):
        response = {'success': False}
        try:
            item_id = json_item.get('item_id')
            res = MySQLManager.call_proc(Item.GET, [item_id])
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Item.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given an item_id, get all items from database
    @staticmethod
    def getAllItems():
        response = {'success': False}
        try:
            query = "SELECT * FROM Items;"
            res = MySQLManager.query(query, MySQLManager.SELECT)
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Item.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Get all flagged items from database
    @staticmethod
    def getFlaggedItem():
        response = {'success': False}
        try:
            query = "SELECT * FROM Items WHERE flag=1;"
            res = MySQLManager.query(query, MySQLManager.SELECT)
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Item.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given user_id, return all listed items
    @staticmethod
    def get_by_owner(json_item):
        response = {'success': False}
        try:
            owner_id = json_item.get('owner_id')
            res = MySQLManager.call_proc(Item.GET_BY_OWNER, [owner_id])
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Item.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given an item_id, remove it from database
    @staticmethod
    def remove(json_item):
        response = {'success': False}
        try:
            item_id = json_item.get('item_id')
            res = MySQLManager.call_proc(Item.REMOVE, [item_id])
            response = {'success': res[0][0] == 1}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given an item_id, update its data fields in database
    @staticmethod
    def update(json_item):
        response = {'success': False}
        try:
            args = []
            for i in range(0, len(Item.updateFields)):
                args.append(json_item.get(Item.updateFields[i]))
            res = MySQLManager.call_proc(Item.UPDATE, args)
            response = {'success': res[0][0] == 1}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given an item id and item_field, update the corresponding field in the table.
    @staticmethod
    def update_field(json_item):
        response = {'success': False}
        try:
            item_id = json_item.get('item_id')
            field = json_item.get('item_field')
            value = json_item.get('value')
            query = "UPDATE {} SET {} = {} WHERE item_id = {};".format(Item.Table, field, value, item_id)
            res = MySQLManager.query(query, MySQLManager.UPDATE)
            response = {'success': res == 1}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    @staticmethod
    def search(json_item):
        response = {'success': False}
        try:
            keyword = json_item.get('keyword')
            res = MySQLManager.call_proc(Item.SEARCH, [keyword])
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Item.parse(res)
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
            for i in range(0, len(Item.Fields)):
                cell = row[i]
                if isinstance(cell, datetime):
                    cell = str(cell)
                elif isinstance(cell, Decimal):
                    cell = float(cell)
                temp[Item.Fields[i]] = cell
            res.append(temp)
        return res
