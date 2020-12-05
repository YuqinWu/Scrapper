import pymysql


class MySQLManager:

    SELECT = 1
    UPDATE = 2
    DELETE = 3

    sql_hostname = '127.0.0.1'
    sql_username = 'Scrapper'
    sql_password = 'Scrapper@2019'
    sql_main_database = 'ScrapperDB'
    sql_port = 3306
    sql_ip = '1.1.1.1.1'

    @staticmethod
    def call_proc(proc, args):
        res = []
        try:
            conn = pymysql.connect(
            host='127.0.0.1',
            user=MySQLManager.sql_username,
            passwd=MySQLManager.sql_password,
            db=MySQLManager.sql_main_database,
            port=MySQLManager.sql_port,
            )
            cursor = conn.cursor()
            print(args)
            cursor.callproc(proc, args)
            conn.commit()
            res = cursor.fetchall()
            cursor.close()
            conn.close()
            return res
        except:
            return res

    # SELECT query returns all the selected data.
    # UPDATE query returns rows affected.
    @staticmethod
    def query(query, query_type):
        try:
            conn = pymysql.connect(
                host='127.0.0.1',
                user=MySQLManager.sql_username,
                passwd=MySQLManager.sql_password,
                db=MySQLManager.sql_main_database,
                port=MySQLManager.sql_port,
             )
            cursor = conn.cursor()
            cursor.execute(query)
            conn.commit()
            if query_type == MySQLManager.SELECT:
                res = cursor.fetchall()
            elif query_type == MySQLManager.UPDATE:
                res = cursor.rowcount
            cursor.close()
            conn.close()
            return res
        except:
            return []




