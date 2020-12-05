#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='email')

def sendNotification(args):
	args = args.split(',')
	item_id = args[0]
	owner_id = args[1]
	user_id = args[2]
	item_name = args[3]
	seller_email_query = "SELECT email FROM Users WHERE user_id = " + str(owner_id) + ";"
	seller_email_res = MySQLManager.query(seller_email_query, MySQLManager.SELECT)
	buyer_email_query = "SELECT email FROM Users WHERE user_id = " + str(user_id) + ";"
	buyer_email_res = MySQLManager.query(buyer_email_query, MySQLManager.SELECT)
	EmailManager.send_email(seller_email_res[0][0], item_name + " Selled Successfully", "You have selled " + item_name + " !", "User")
	EmailManager.send_email(buyer_email_res[0][0], item_name + " Bought Successfully", "You have bought " + item_name + " !", "User")


def callback(ch, method, properties, body):
	print(" [x] Received %r" % body)
	sendNotification(body)


channel.basic_consume(
	queue='email', on_message_callback=callback, auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()

