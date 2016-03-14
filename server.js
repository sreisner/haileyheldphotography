var express = require('express');
var multer = require('multer');
var upload = multer({ dest : 'uploads/' });
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var jimp = require('jimp');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var handlebars = require('express-handlebars');
var Grid = require('gridfs-stream');
var uuid = require('uuid');

var app = express();

app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');

var SUPPORTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

mongoose.connect('mongodb://localhost:27017/hailey');
Grid.mongo = mongoose.mongo;
var gfs = Grid(mongoose.connection.db);

app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/admin', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
    secret: 'anything',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());

var Series = mongoose.model('Series', {
    name : String,
    order : Number
});

var Photo = mongoose.model('Photo', {
    caption : String,
    data: String,
    gfs_id: String,
    gfs_preview_id: String,
    date_uploaded : Date,
    mime_type : String,
    series : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Series
    }
});

var Message = mongoose.model('Message', {
    seen : Boolean,
    received : Date,
    name : String,
    email : String,
    comment : String
});

passport.use(new FacebookStrategy({
        clientID: '599565840191514',
        clientSecret: '5b3e6a35d3c6852f705850236bae5cf5',
        callbackURL: 'http://www.haileyheld.com/auth/facebook/callback',
        profileFields: ['id', 'name', 'emails']
    }, function(accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/api/photo', function(request, response) {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var filter = {};
    if(query.series) {
        filter.series = query.series;
    }
    Photo.find(filter).sort({ date_uploaded : -1 }).exec(function(err, photos) {
        if(err) {
            response.json({
                'error' : err
            });
            return;
        }
        response.json(photos);
    });
});

app.get('/api/photo/:photo_id', function(request, response) {
    Photo.findOne({
        _id: request.params.photo_id
    }, function(err, photo) {
        if(err) {
            response.json({
                'error' : err
            });
            return;
        }

        var gfs_id = request.query.preview ? photo.gfs_preview_id : photo.gfs_id;

        var readStream = gfs.createReadStream({
            _id: gfs_id
        });
        response.writeHead(200, {'Content-Type': photo.mime_type });
        readStream.pipe(response);
        readStream.on('close', function() {
            response.end();
        });

    });
});

app.post('/api/photo', upload.single('image_data'), function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    var photo = new Photo();
    photo.caption = request.body.caption;
    photo.date_uploaded = new Date();
    photo.series = request.body.series_id;
    if(SUPPORTED_IMAGE_MIME_TYPES.indexOf(request.file.mimetype) == -1) {
        response.json({
            'error' : 'Unsupported image file type, must be one of the following: ' + SUPPORTED_IMAGE_MIME_TYPES.join(' ')
        });
        return;
    }
    photo.mime_type = request.file.mimetype;
    var readStream = fs.createReadStream(request.file.path);
    var gridFilename = uuid.v1();
    var writeStream = gfs.createWriteStream({
        filename: gridFilename
    });

    readStream.pipe(writeStream);
    writeStream.on('close', function(file) {
        photo.gfs_id = file._id;
        jimp.read(request.file.path).then(function(src) {
            src.resize(500, jimp.AUTO)
               .quality(90)
               .write(request.file.path + '-min.jpg', function(err) {
                   if(err) {
                       response.json({
                           'error' : err
                       });
                       return;
                   }
                   var previewWriteStream = gfs.createWriteStream({
                       filename: gridFilename + '-min'
                   });
                   fs.createReadStream(request.file.path + '-min.jpg').pipe(previewWriteStream);
                   previewWriteStream.on('close', function(file) {
                       photo.gfs_preview_id = file._id;
                       photo.save(function(err, insertedPhoto, numAffected) {
                           if(err) {
                               response.json({
                                   'error' : err
                               });
                               return;
                           }
                           fs.unlink(request.file.path, function() {
                               fs.unlink(request.file.path + '-min.jpg', function() {
                                   response.json({
                                       'photo': insertedPhoto
                                   });
                               });
                           });
                       });
                   });
               });
        }).catch(function(err) {
            response.json({
                'error': err
            });
        });
    });
});

app.put('/api/photo/:photo_id', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    Photo.findOne({
        _id : request.params.photo_id
    }, function(err, photo) {
        if(err) {
            response.json({
                'error' : err
            });
            return;
        }
        photo.caption = request.body.caption;
        photo.series = request.body.series;
        photo.save();
        response.json({});
    });
});

app.delete('/api/photo/:photo_id', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    Photo.findOne({
        _id : request.params.photo_id
    }, function(err, photo) {
        if(err) {
            return;
        }

        gfs.remove({ _id: photo.gfs_id }, function() {
            gfs.remove({ _id: photo.gfs_preview_id }, function() {
                Photo.remove({
                    _id : request.params.photo_id
                }, function(err) {
                    response.json({});
                });
            });
        });
    });
});

app.get('/api/series', function(request, response) {
    Series.find().sort(Series.order).exec(function(err, results) {
        if(err) {
            response.json({
                'error' : err
            });
            return;
        }
        response.json(results);
    });
});

app.get('/api/message', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    Message.find({}).sort('-received').exec(function(err, messages) {
        if(err) {
            response.json({
                'error' : err
            });
            return;
        }
        response.json(messages);
    });
});

app.post('/api/message', function(request, response) {
    var message = new Message();
    message.seen = false;
    message.received = new Date();
    message.name = request.body.name;
    message.email = request.body.email;
    message.comment = request.body.comment;
    message.save(function(err) {
        if(err) {
            response.json({
                'error' : err
            });
            return;
        }
        response.json({});
    });
});

app.put('/api/message/:message_id', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    Message.findOne({
        _id : request.params.message_id
    }, function(err, message) {
        if(err) {
            response.json({
                'error' : err
            });
            return;
        }
        message.seen = true;
        message.save();
        response.json({});
    });
});

app.delete('/api/message/:message_id', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    Message.findOne({
        _id : request.params.message_id
    }, function(err, message) {
        if(err) {
            return;
        }
        message.remove();
        response.json({});
    });
});

app.get('/', function(request, response) {
    response.sendfile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/admin', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    response.render('admin', { user: request.user.name.givenName });
});

app.get('/login', passport.authenticate('facebook', { scope: ['email'], session: true, authType: 'reauthenticate' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/admin',
        failureRedirect: '/' }));

app.get('/admin/upload', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    response.sendfile(path.join(__dirname, 'views', 'upload.html'));
});

app.get('/admin/manage', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    response.sendfile(path.join(__dirname, 'views', 'manage.html'));
});

app.get('/admin/messages', function(request, response) {
    if(!request.user) {
        response.redirect('/login');
        return;
    }
    response.sendfile(path.join(__dirname, 'views', 'messages.html'));
});

app.get('/admin/logout', function(request, response) {
    request.logout();
    response.redirect('/');
});

var port = 5000;
app.listen(port);
console.log('App listening on port ' + port);
