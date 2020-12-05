import unittest
import requests
import json

url = 'http://13.59.166.200:5000/'


class TestStringMethods(unittest.TestCase):
    def test_user_log_in(self):
        r = requests.post(url + 'loginUser', json={'username': 'wayne', 'password': 'wayne'})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_admin_log_in(self):
        r = requests.post(url + 'loginUser', json={'username': 'admin', 'password': 'admin'})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)
        self.assertTrue(json.loads(r.text)['payload'][0]['role'] == 'Admin')

    def test_log_in_fail(self):
        r = requests.post(url + 'loginUser', json={'username': 'wayne', 'password': 'abcde'})
        self.assertFalse(json.loads(r.text)['success'])

        r = requests.post(url + 'loginUser', json={'username': 'ABC', 'password': 'wayne'})
        self.assertFalse(json.loads(r.text)['success'])

    def test_get_user(self):
        r = requests.post(url + 'getUser', json={'user_id': 30})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_item(self):
        r = requests.post(url + 'getItem', json={'item_id': 144})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_search_item(self):
        r = requests.post(url + 'searchItem', json={'keyword': 'Bag'})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_all_items(self):
        r = requests.post(url + 'getAllItems')
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_item_by_owner(self):
        r = requests.post(url + 'getItemByOwner', json={"owner_id": 30})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_flagged_item(self):
        r = requests.post(url + 'getFlaggedItem')
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_shopping_cart(self):
        r = requests.post(url + 'getShoppingCart', json={'user_id': 30})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_watch_list(self):
        r = requests.post(url + 'getWatchList', json={'user_id': 30})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_highest_bid(self):
        r = requests.post(url + 'getHighestBid', json={'item_id': 144})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_bid(self):
        r = requests.post(url + 'getBid', json={'user_id': 30})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)

    def test_get_order_by_buyer(self):
        r = requests.post(url + 'getOrderByBuyer', json={'buyer_id': 30})
        self.assertTrue(json.loads(r.text)['success'])
        self.assertTrue(json.loads(r.text)['payload'] is not None)


if __name__ == '__main__':
    unittest.main()