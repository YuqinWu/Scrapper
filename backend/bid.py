¬…≥÷from flask import jsonify
from my_sql_manager import MySQLManager


class Bid:

    # Stored Procedures in MySQL
    GET_BID = 'get_bid'
    ADD_BID = 'add_bid'
    SELECT_BID = 'select_bid'

    Table = 'ScrapperDB.BidItems'

    Fields = ['bid_id', 'user_id', 'item_id']


    # get user's bids
    @staticmethod
    def get_bid(json_bid):
        response = {'success': False}
        try:
            user_id = json_bid.get('user_id')
            res = MySQLManager.call_proc(Bid.GET_BID, [user_id])
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = Bid.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # when a user place bid, add to mysql
    @staticmethod
    def add_bid(json_bid):
        response = {'success': False, 'username': -1}
        try:
            user_id = json_bid.get('user_id')
            item_id = json_bid.get('item_id')
            res = MySQLManager.call_proc(Bid.ADD_BID, [user_id, item_id])
            bid_id = res[0][0]
            response = {'success': True, 'bid_id': bid_id}
        except:
            response = {'success': False, 'username': -1}
        finally:
            return jsonify(response)

    #select bid based on user_id and item_id
    @staticmethod
    def select_bid(json_bid):
        response = {'success': False}
        try:
            user_id = json_bid.get('user_id')
            item_id = json_bid.get('item_id')
            res = MySQLManager.call_proc(Bid.SELECT_BID, [user_id, item_id])
            if len(res) == 0:
                response['success'] = False
            else:
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # parsing to get all user info. Use this for getting user info only using user_id
    @staticmethod
    def parse(data):
        res = []
        for row in data:
            temp = {}
            for i in range(0, len(Bid.Fields)):
                cell = row[i]
                if isinstance(cell, int):
                    cell = int(cell)
                temp[Bid.Fields[i]] = cell
            res.append(temp)
        return res
