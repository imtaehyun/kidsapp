var unirest = require('unirest'),
    Parse = require('node-parse-api').Parse,
    db = new Parse({
        app_id: '6nFwFeFyzD7Hs5mQDfg2SlInpEQn47x8w1GSdKyN',
        api_key: 'RwfAhKKYKYZcrQ7hMi28bgatbUy6R47zXDy1I4sc'
    });

unirest.get('https://www.googleapis.com/youtube/v3/videos')
    .query({
        id: 'gNy57oZSyX0',
        key: 'AIzaSyDroQ4NKUsnPcx_E8qkGE5rRNiYDLbzahA',
        part: 'snippet',
        fields: 'items(id,snippet)'
    })
    .end(function(response) {
        console.log(JSON.stringify(response.body));
        var video = response.body.items[0];
        db.insert('video', {
            "channelId": video.snippet.channelId,
            "description": video.snippet.description,
            "publishedAt": { __type: 'Date', iso: video.snippet.publishedAt },
            "title": video.snippet.title,
            "youtubeId": video.id
        }, function(err, response) {
            if (err) console.error(err);
            console.log(response);
        })
    });