import express from 'express'

const app = express();

// Serve static files from the 'public' directory
// Now a GET request to '/filename.ext' will serve 'public/filename.ext'
app.use(express.static('public'));

app.listen(process.env.PORT || 8080);
