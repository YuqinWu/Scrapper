# AuctionSite


**Scrapper:** 
*This is an auction site for luxury goods, modeled on ebay.*





**How to run:**

Run `$ssh -i ~/.ssh/Scrapper.pem ubuntu@13.59.166.200`. (Be sure to put the .pem file in this path, or change the command to your path)

Run `$python3 backend.py`  `$python3 autoScript.py` `$python3 receiver.py` inside Scrapper/backend/. In browser, go to "http://13.59.166.200". (You can do a `$ps -ef |grep pythont` to check, because these files may be running in the background already)

You can use nohup to run these script to the background. e.g. `$nohup python3 backend.py &`


**How to get around:**

*  To log in or sign up: 'My Account'

*  To see all items listed on the website: 'Shop'

*  To see my user profile: 'My Account' -> 'My Account' (after logging in)

*  To edit my user profile: 'My Account' -> 'edit'

*  To see all the items I've bid on: 'My Account' -> 'My Bids'

*  To see all the items I'm selling: 'My Account' -> 'My Sales'

*  To see all my orders: 'My Account' -> 'My orders'

*  To add to watchlist: From an item page, fill in "Remind me when price below" and press heart.

*  To search an item: "magnifier"

*  To see my watchlist: "heart"



**What's working currently:**
https://docs.google.com/spreadsheets/d/1EaktUrCxqBf1x9O9aWQtLU52r6q8ZfSn7kEoT1ms6EU/edit#gid=0
Look at status column for what's currently working.



**What's not yet implemented:**
https://docs.google.com/spreadsheets/d/1EaktUrCxqBf1x9O9aWQtLU52r6q8ZfSn7kEoT1ms6EU/edit#gid=0
Look at status column for what's not yet implemented.



**Note:**

*  Our watchlist is different from what the class requires. We add a specific item (from item page) to watchlist, not by a search name. This is because we implemented ebay's watchlist (adding a specific item to watchlist), and only after implementation we realized that it's different from what the class requires.

*  We don't allow categories to be added by users. This is because if we let users create users to create categories, soon enough categories will be overflooded with same things in different names/spellings. For this reason, only admin can add categories (to be implemented).

*  We used template from online for frontend code, but only for the layout and css style, and the code is changed a lot during the development. You can see our commit history from our gitlab repo: https://gitlab.com/_scrapper/auctionsite. It may need request to see, please contact us if you can't get to see this repo! Contact yuqinwu@uchicago.edu

