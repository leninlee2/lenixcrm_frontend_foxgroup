const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(__dirname + '/dist/sakai-ng/browser'));

// Send all requests to the index.html file
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/sakai-ng/browser/index.html'));
});

// Listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port ' + (process.env.PORT || 3000));
});
