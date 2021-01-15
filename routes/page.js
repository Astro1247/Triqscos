let express = require('express');
let router = express.Router();
let createError = require('http-errors');

async function pageExist(pageName, app) {
    let page = await app.locals.pages.find({'name': pageName})
    if (page == undefined || page == null) return false;
    else return true;
}

/* Main pages router for Triqscos. */
router.get('/:name', async function(req, res, next) {
    let exist = await pageExist(req.params.name, req.app)
    if(!exist) res.render('error', createError(404));
    let app = req.app;
    let pageName = req.params.name;
    let process = await app.locals.content.find({'pageName': pageName}).toArray(function(err, pageContent) {
        if (err) {
            res.send(err);
        } else if (pageContent.length) {
            res.render('pages', {
                'pagelist': pageContent,
            });
        } else {
            res.send('No content found');
        }
    });
    //res.send('Select page:');
});

module.exports = router;
