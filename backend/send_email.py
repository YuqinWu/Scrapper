from flask import jsonify
from my_sql_manager import MySQLManager
from email_manager import EmailManager


class Email:

    @staticmethod
    def emailBelowExpectPrice(json_item):
        response = {'success': False}
        try:
            item_id = json_item.get('item_id')
            item_name = json_item.get('item_name')
            buy_now_price = json_item.get('buy_now_price')

            ## find all the users which the buy now price below their expectation price
            query = "SELECT user_id FROM WatchList WHERE item_id = " + item_id + " and expect_price > " + buy_now_price + ";"
            res = MySQLManager.query(query, MySQLManager.SELECT)
            for user in res:
                user_id = user[0]
                user_email_query = "SELECT email FROM Users WHERE user_id = " + str(user_id) + ";"
                user_email_res = MySQLManager.query(user_email_query, MySQLManager.SELECT)
                EmailManager.send_email(user_email_res[0][0], item_name + " Meet Expectation Price", "Congratulation!", "User")
            response = {'success': True}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    @staticmethod
    def alertSellerWhenBid(json_item):
        response = {'success': False}
        try:
            item_id = json_item.get('item_id')
            ## find the item owner email
            query = "SELECT email FROM Users WHERE user_id = (SELECT owner_id FROM Items WHERE item_id = " + item_id + ");"
            res = MySQLManager.query(query, MySQLManager.SELECT)
            EmailManager.send_email(res[0][0], "Your item have been bid on", "Congratulation!", "User")
            response = {'success': True}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)