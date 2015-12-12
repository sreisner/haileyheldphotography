class Upload(webapp2.RequestHandler):
  def get(self):
    self.response.out.write("""
        <form enctype="multipart/form-data"
              method="post">
          <div>
            <textarea name="content" rows="3" cols="60"></textarea>
          </div>
          <div><label>Avatar:</label></div>
          <div><input type="file" name="img"/></div>
          <div><input type="submit" value="Sign Guestbook"></div>
        </form>
        <hr>
        <form>Guestbook name: <input value="%s" name="guestbook_name">
        <input type="submit" value="switch"></form>
      </body>
    </html>""" % (urllib.urlencode({'guestbook_name': guestbook_name}),
                  cgi.escape(guestbook_name)))

  def post(self):
        guestbook_name = self.request.get('guestbook_name')
        greeting = Greeting(parent=guestbook_key(guestbook_name))

        if users.get_current_user():
            greeting.author = users.get_current_user().nickname()

        greeting.content = self.request.get('content')

        avatar = self.request.get('img')
        avatar = images.resize(avatar, 32, 32)
        greeting.avatar = avatar
        greeting.put()

        self.redirect('/upload')