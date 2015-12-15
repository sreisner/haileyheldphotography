import urllib
import cgi
import logging

from google.appengine.api import images
from google.appengine.api import users
from google.appengine.ext import ndb

import webapp2

from model import *
from constants import *


class LandingPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('landing.html')
        self.response.write(template.render({}))


class Gallery(webapp2.RequestHandler):
    def get(self):
        series_name = self.request.get('series_name')

        if series_name:
            photos_query = Photo.query(Photo.series.name == series_name).order(-Photo.uploaded)
        else:
            photos_query = Photo.query().order(-Photo.uploaded)

        template_values = {
            'series_name': series_name,
            'all_series': get_all_series(),
            'photos': photos_query.fetch()
        }

        template = JINJA_ENVIRONMENT.get_template('galleries.html')
        self.response.write(template.render(template_values))


class About(webapp2.RequestHandler):
    def get(self):
        thanks = self.request.get('thanks')
        template_values = {
            'all_series': get_all_series(),
            'thanks': thanks
        }

        template = JINJA_ENVIRONMENT.get_template('about.html')
        self.response.write(template.render(template_values))

    def post(self):
        name = cgi.escape(self.request.get('name'))
        email = cgi.escape(self.request.get('email'))
        comment = cgi.escape(self.request.get('comment'))
        if name and email and comment:
            message = Message()
            message.name = name
            message.email = email
            message.comment = comment
            message.seen = False
            message.put()
        query_params = urllib.urlencode({ 'thanks': 'Message sent.  Thanks!' })
        self.redirect("/about?%s" % query_params)


class Image(webapp2.RequestHandler):
    def get(self):
        try:
            photo_key = ndb.Key(urlsafe=self.request.get('img_id'))
            photo = photo_key.get()
        except Exception, e:
            self.redirect('http://dummyimage.com/600x400/000000/ffffff.jpg&text=image+not+found')
            return

        is_preview = self.request.get('is_preview')

        self.response.headers['Content-Type'] = 'image/jpg'
        self.response.headers['Cache-Control'] = 'max-age=2592000, public'
        if(is_preview and photo.preview):
            self.response.out.write(photo.preview)
        if photo.picture:
            self.response.out.write(photo.picture)

    def post(self):
        try:
            if users.is_current_user_admin():
                self.validate_post(self.request)

                series_name = self.request.get('series_name')
                caption = self.request.get('caption')
                picture = self.request.get('picture')

                series = Series.query(Series.name == series_name).fetch()[0]
                preview = images.resize(picture, 400)

                photo = Photo()
                photo.series = series
                photo.caption = caption
                photo.picture = picture
                photo.preview = preview
                photo.put()

                query_params = urllib.urlencode({'message': 'Image uploaded successfully.'})
        except Exception, e:
            query_params = urllib.urlencode({'error_message': e})

        self.redirect('/admin/upload?%s' % query_params)

    def validate_post(self, request):
        series_name = self.request.get('series_name')
        caption = self.request.get('caption')
        picture = self.request.get('picture')

        if not picture:
            raise Exception('You must select a photo to upload.')

        if not series_name:
            raise Exception('Each photo must have a series.')

        if not caption:
            raise Exception('Each photo must have a caption.')

    def delete(self):
        img_id = self.request.get('img_id')
        if img_id and users.is_current_user_admin():
            photo_key = ndb.Key(urlsafe=img_id)
            photo_key.delete()

    def put(self):
        if users.is_current_user_admin():
            img_id = self.request.get('img_id')
            series_name = self.request.get('series_name')
            caption = self.request.get('caption')

            series = Series.query(Series.name == series_name).fetch()[0]

            photo_key = ndb.Key(urlsafe=img_id)
            photo = photo_key.get()
            photo.series = series
            photo.caption = caption
            photo.put()


app = webapp2.WSGIApplication([
    ('/', LandingPage),
    ('/gallery', Gallery),
    ('/about', About),
    ('/img', Image),
], debug=True)