import os
import urllib

from google.appengine.api import images
from google.appengine.api import users
from google.appengine.ext import ndb

import jinja2
import webapp2


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Series(ndb.Model):
    name = ndb.StringProperty()
    order = ndb.IntegerProperty()


class Photo(ndb.Model):
    series = ndb.StructuredProperty(Series)
    caption = ndb.StringProperty(indexed=False)
    preview = ndb.BlobProperty()
    picture = ndb.BlobProperty()
    uploaded = ndb.DateTimeProperty(auto_now_add=True)


class MainPage(webapp2.RequestHandler):
    def get(self):
        series_name = self.request.get('series_name')
        all_series = Series.query().order(Series.order).fetch()
        if series_name:
            photos_query = Photo.query(Photo.series.name == series_name).order(-Photo.uploaded)
        else:
            series_name = None
            photos_query = Photo.query().order(-Photo.uploaded)
        photos = photos_query.fetch()

        template_values = {
            'series_name': series_name,
            'all_series': all_series,
            'photos': photos
        }

        template = JINJA_ENVIRONMENT.get_template('galleries.html')
        self.response.write(template.render(template_values))


class Upload(webapp2.RequestHandler):
  def get(self):
    template = JINJA_ENVIRONMENT.get_template('upload.html')
    error_message = self.request.get('error_message')
    message = self.request.get('message')
    all_series = Series.query().order(Series.order).fetch()
    template_values = {
        'all_series': all_series,
        'message': message,
        'error_message': error_message
    }
    self.response.write(template.render(template_values))

  def post(self):
        series_name = self.request.get('series_name')
        caption = self.request.get('caption')
        picture = self.request.get('picture')

        series = Series.query(Series.name == series_name)[0]
        picture = self.request.get('picture')
        preview = images.resize(picture, 32, 32)

        photo = Photo()
        photo.series = series
        photo.caption = caption
        photo.picture = picture
        photo.preview = preview
        photo.put()

        self.redirect('/admin')


class Admin(webapp2.RequestHandler):
    def get(self):
        self.response.write('Admin')


class Image(webapp2.RequestHandler):
    def get(self):
        photo_key = ndb.Key(urlsafe=self.request.get('img_id'))
        photo = photo_key.get()
        if photo.picture:
            self.response.headers['Content-Type'] = 'image/jpg'
            self.response.out.write(photo.picture)
        else:
            self.response.out.write('No image')

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/upload', Upload),
    ('/admin', Admin),
    ('/img', Image),
], debug=True)