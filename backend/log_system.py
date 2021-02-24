from flask import Flask, request, jsonify, render_template, redirect, url_for
from my_sql_manager import MySQLManager


# status: 1=active, 2=suspend(user), 3=block(admin)
class LogSystem:

    # Stored Procedures in MySQL
    ADD_USER = 'add_user'
    UPDATE_USER = 'update_user'
    REMOVE_USER = 'remove_user'
    SUSPEND_USER = 'suspend_user'
    REACTIVATE_USER = 'reactivate_user'
    GET_USER = 'get_user'
    LOGIN = 'login'

    Table = 'ScrapperDB.Users'

    Fields = ['user_id', 'username', 'password', 'email', 'status', 'description', 'role', 'rating']

    # Given the user information in json, returns the username. Returns -1 if the insert fails
    @staticmethod
    def add_user(json_user_info):
        response = {'success': False, 'username': -1}
        try:
            args = [
                json_user_info.get('username'),
                json_user_info.get('password'),
                json_user_info.get('email'),
                1,
                '',
                'Customer']
            res = MySQLManager.call_proc(LogSystem.ADD_USER, args)
            username = res[0][0]
            response = {'success': True, 'username': username}
        except:
            response = {'success': False, 'username': -1}
        finally:
            return jsonify(response)

    # Given a user_id, remove it from database
    @staticmethod
    def remove_user(json_user_info):
        response = {'success': False}
        try:
            user_id = json_user_info.get('user_id')
            res = MySQLManager.call_proc(LogSystem.REMOVE_USER, [user_id])
            response = {'success': res[0][0] == 1}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given a user_id, suspend(deactivate) it from database
    @staticmethod
    def suspend_user(json_user_info):
        response = {'success': False}
        try:
            user_id = json_user_info.get('user_id')
            res = MySQLManager.call_proc(LogSystem.SUSPEND_USER, [user_id])
            response = {'success': res[0][0] == 1}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given a user_id, reactivate it from database
    @staticmethod
    def reactivate_user(json_user_info):
        response = {'success': False}
        try:
            user_id = json_user_info.get('user_id')
            res = MySQLManager.call_proc(LogSystem.REACTIVATE_USER, [user_id])
            response = {'success': res[0][0] == 1}
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given a user_id, get all the user data fields from database
    @staticmethod
    def get_user(json_user_info):
        response = {'success': False}
        try:
            user_id = json_user_info.get('user_id')
            res = MySQLManager.call_proc(LogSystem.GET_USER, [user_id])
            if len(res) == 0:
                response['success'] = False
            else:
                response['payload'] = LogSystem.parse(res)
                response['success'] = True
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # Given a username and a password, check if the pair exists in the database
    # return user_id (note: not username) if success
    @staticmethod
    def login_user(json_user_info):
        response = {'success': False}
        try:
            username = json_user_info.get('username')
            password = json_user_info.get('password')
            res = MySQLManager.call_proc(LogSystem.LOGIN, [username, password])
            if len(res) == 1:
                response['success'] = True
                response['payload'] = LogSystem.parse(res)
            else:
                response['success'] = False
        except:
            response = {'success': False}
        finally:
            return jsonify(response)

    # This is a generic method to update any field of a user
    # IN: user_id, password, email, description (only password, email, and/or description can be changed)
    @staticmethod
    def update_user(json_user_info):
        response = {'success': False}
        try:
            args = [
                json_user_info.get('user_id'),
                json_user_info.get('email'),
                json_user_info.get('password'),
                json_user_info.get('description')]

            res = MySQLManager.call_proc(LogSystem.UPDATE_USER, args)
            response = {'success': res[0][0] == 1}
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
            for i in range(0, len(LogSystem.Fields)):
                cell = row[i]
                if isinstance(cell, int):
                    cell = int(cell)
                temp[LogSystem.Fields[i]] = cell
            res.append(temp)
        return res
