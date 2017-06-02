let ogs = require('open-graph-scraper');

exports.discoverLink = (req, res) => {
  let link = req.query.link;

  let options = { url: link, timeout: 4000 };

  ogs(options, (err, results) => {
    return res.json(results);
  });
};