import os
import urllib
import pdb

from google.appengine.api import images
from google.appengine.api import users
from google.appengine.ext import ndb

import jinja2
import webapp2


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def get_all_series():
    return Series.query().order(Series.order).fetch()


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

class Admin(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('admin.html')
        self.response.write(template.render({}))


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
        if(is_preview and photo.preview):
            self.response.out.write(photo.preview)
        if photo.picture:
            self.response.out.write(photo.picture)

    def post(self):
        try:
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

        self.redirect('/upload?%s' % query_params)

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
        if img_id:
            photo_key = ndb.Key(urlsafe=img_id)
            photo_key.delete()

    def put(self):
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
    ('/', MainPage),
    ('/upload', Upload),
    ('/manage', Manage),
    ('/admin', Admin),
    ('/img', Image),
], debug=True)