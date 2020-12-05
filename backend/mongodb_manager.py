import pymongo, traceback
from datetime import datetime


class MongoDBManager:
    mongo_ip = '1.1.1.1.1'
    mongo_hostname = '127.0.0.1'
    mongo_port = 27017

    mongodb_name = 'ScrapperDB'
    table_name = 'Bids'

    @staticmethod
    def post(item_id, user_id, price):
        res = 0
        item_id = int(item_id)
        user_id = int(user_id)
        price = float(price)
        try:
            client = pymongo.MongoClient()
            db = client[MongoDBManager.mongodb_name]
            db = db[MongoDBManager.table_name]
            entry = db.find_one({'item_id': item_id})
            ts = datetime.now()
            if entry is None:
                new_entry = {'item_id': item_id, 'bids': [{'user_id': user_id, 'bid': price, 'timestamp': ts}]}
                db.insert_one(new_entry)
                res = 1
            else:
                bids = entry.get('bids')
                last_bid = bids[len(bids) - 1]
                last_bid_price = last_bid['bid']
                if price > last_bid_price:
                    entry.get('bids').append({'user_id': user_id, 'bid': price, 'timestamp': ts})
                    db.update_one({"item_id": item_id}, {'$set': entry})
                    res = 1
                else:
                    res = 0
            client.close()
        except:
            res = 0
        finally:
            return res

    @staticmethod
    def get(item_id):
        item_id = int(item_id)
        res = None
        client = pymongo.MongoClient()
        db = client[MongoDBManager.mongodb_name]
        db = db[MongoDBManager.table_name]
        entry = db.find_one({'item_id': int(item_id)})
        if entry is None:
            res = None
        else:
            bids = entry['bids']
            res = bids[len(bids) - 1]
        client.close()
        return res


