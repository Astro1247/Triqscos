let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let process = await req.app.locals.pages.find({}).toArray(function(err, pagelist) {
    if (err) {
      res.send(err);
    } else if (pagelist.length) {
      res.render('index', {
       title: 'Triqscos', pagelist: pagelist
      });
    } else {
      res.send('No pages found');
    }
  });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
