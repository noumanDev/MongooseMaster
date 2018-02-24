var standup = require('../models/standup.server.model');


exports.list = function (req, res) {

    var query = standup.find();
    query.sort({ 'createdOn': 'desc' })
        .limit(12)
        .exec((err, results) => {

            res.render('index', { title: 'Standup - List', notes: results });

        });

}

exports.filterByMember = function (req, res) {
    var filter = req.body.memberName;
    var query = standup.find();

    query.sort({ 'createdOn': 'desc' });
    if (filter.length > 0) {
        query.where({ memberName: filter });
    }
    query.exec((err, results) => {
        res.render('index', { title: 'Standup - List', notes: results });
    });

}


exports.create = function (req, res) {
    var entry = new standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment

    });

    entry.save((err) => {
        if (err) {
            var errMsg = 'Sorry, there was an error saving the stand-up meeting note. ' + err;
            res.render('newnote', { title: 'Standup - New note error', message: errMsg });
        }
        else {
            console.log('Standup meeting note saved successfully');
            //redirect to homepage...
            res.redirect(301, '/');
        }
    });



}

exports.getNote = function (req, res) {

    res.render('newnote', { title: 'Standup - New Note' });
}