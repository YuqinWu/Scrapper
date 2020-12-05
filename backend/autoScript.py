from item import Item
from shopping_cart import ShoppingCart
from my_sql_manager import MySQLManager
from mongodb_manager import MongoDBManager
from decimal import Decimal
import datetime
from email_manager import EmailManager
from time import sleep
import requests
import pika



def parse(data):
        res = []
        for row in data:
            temp = {}
            for i in range(2):
                cell = row[i]
                if isinstance(cell, datetime.datetime):
                    cell = str(cell)
                elif isinstance(cell, Decimal):
                    cell = float(cell)
                temp[Item.Fields[i]] = cellshopping_cart
            res.append(temp)
        return res

def check_endtime(rabbitChannel):
    response = {'success': False}
    query = "SELECT item_id, owner_id, item_name, quantity, end_time, email_sent FROM Items;"
    res = MySQLManager.query(query, MySQLManager.SELECT)
    for element in res:
        item_id = element[0]
        owner_id = element[1]
        item_name = element[2]
        quantity = element[3]
        end_time = element[4]
        email_sent = element[5]
        if end_time:
            # If auction is ended.
            if end_time < datetime.datetime.now() + datetime.timedelta(hours=-5) and email_sent == None:
                bid = MongoDBManager.get(item_id)
                print("end_time:" + str(end_time))
                print("datetime_now: " + str(datetime.datetime.now() + datetime.timedelta(hours=-6)))
                print(str(item_id) + " :end_time is arrived")
                if bid != None:
                    user_id = bid['user_id']
                    update_email_sent = "UPDATE Items SET email_sent = 1 WHERE item_id = " + str(item_id)
                    MySQLManager.query(update_email_sent, MySQLManager.UPDATE)

                    # Add to shopping cart
                    MySQLManager.call_proc("add_to_shopping_cart", [item_id, user_id, quantity, datetime.datetime.now()])

                    # RabbitMQ send email to owner and winner
                    body_message = str(item_id) + ',' + str(owner_id) + ',' + str(user_id) + ',' + item_name
                    print(body_message)
                    rabbitChannel.basic_publish(exchange='', routing_key='email', body=body_message)

if __name__ == '__main__':
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='email')

    while(True):
        check_endtime(channel)
        sleep(1)

    connection.close()

