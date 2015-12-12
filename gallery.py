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
            series_name = Series.query().fetch(1)[0].name
            photos_query = Photo.query().order(-Photo.uploaded)
        photos = photos_query.fetch()
        all_series = Series.query().fetch()

        template_values = {
            'series_name': series_name,
            'all_series': all_series,
            'photos': photos
        }

        template = JINJA_ENVIRONMENT.get_template('gallery.html')
        self.response.write(template.render(template_values))


class Upload(webapp2.RequestHandler):
  def get(self):
    self.response.out.write("""
        <form enctype="multipart/form-data"
              method="post">
          <div>
            <input type="text" name="caption" rows="3" cols="60" />
          </div>
          <div><label>Photo:</label></div>
          <div><input type="file" name="picture"/></div>
          <div><input type="submit" value="Submit"></div>
        </form>
      </body>
    </html>""")

  def post(self):
        photo = Photo()
        photo.series = Series().query().fetch()[0]
        photo.caption = self.request.get('caption')

        picture = self.request.get('picture')
        preview = images.resize(picture, 32, 32)
        photo.picture = picture
        photo.preview = preview
        photo.put()

        self.redirect('/upload')


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
    ('/img', Image),
], debug=True)