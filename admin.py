import urllib
import cgi
import logging

from google.appengine.api import images
from google.appengine.api import users
from google.appengine.ext import ndb

import webapp2

from model import *
from constants import *


class Upload(webapp2.RequestHandler):
    def get(self):
        message = self.request.get('message')
        error_message = self.request.get('error_message')

        template_values = {
            'all_series': get_all_series(),
            'message': message,
            'error_message': error_message
        }

        template = JINJA_ENVIRONMENT.get_template('upload.html')
        self.response.write(template.render(template_values))


class Manage(webapp2.RequestHandler):
    def get(self):
        series_name = self.request.get('series_name')
        series = get_all_series()

        if not series_name:
            series_name = series[0].name
        
        photos_query = Photo.query(Photo.series.name == series_name).order(-Photo.uploaded)

        template_values = {
            'series_name': series_name,
            'all_series': get_all_series(),
            'photos': photos_query.fetch()
        }

        template = JINJA_ENVIRONMENT.get_template('manage.html')
        self.response.write(template.render(template_values))


class Messages(webapp2.RequestHandler):
    def get(self):
        messageId = self.request.get('messageId')
        message = None
        if messageId:
            message_key = ndb.Key(urlsafe=messageId)
            message = message_key.get()

        all_messages = Message.query().fetch()

        template_values = {
            'all_messages': all_messages,
            'message': message
        }

        template = JINJA_ENVIRONMENT.get_template('messages.html')
        self.response.write(template.render(template_values))

    def delete(self):
        messageId = self.request.get('messageId')
        if messageId:
            message_key = ndb.Key(urlsafe=messageId)
            message_key.delete()

    def put(self):
        messageId = self.request.get('messageId')
        if messageId:
            message_key = ndb.Key(urlsafe=messageId)
            message = message_key.get()
            message.seen = True
            message.put()

class Admin(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('admin.html')
        user = users.get_current_user()
        template_values = {
            'user': user,
            'logout_url': users.create_logout_url('/'),
        }
        self.response.write(template.render(template_values))


app = webapp2.WSGIApplication([
    ('/admin', Admin),
    ('/admin/', Admin),
    ('/admin/upload', Upload),
    ('/admin/manage', Manage),
    ('/admin/messages', Messages),
], debug=True)