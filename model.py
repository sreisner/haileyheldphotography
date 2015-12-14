from google.appengine.ext import ndb


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


class Message(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    email = ndb.StringProperty(indexed=False)
    comment = ndb.StringProperty(indexed=False)
    seen = ndb.BooleanProperty()
    received = ndb.DateTimeProperty(auto_now_add=True)