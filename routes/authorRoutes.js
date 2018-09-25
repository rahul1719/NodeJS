const express = require('express');

const authorRouter = express.Router();

function router(nav) {
  authorRouter.route('/').get((req, res) => {
    res.send('Author test render');
  });
  return authorRouter;
}
module.exports = router;
