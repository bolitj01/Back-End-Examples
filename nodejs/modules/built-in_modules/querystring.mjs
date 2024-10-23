import { createServer } from 'http';
import { parse } from 'url';

createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const q = parse(req.url, true).query;
  //Expecting a name and class attribute in the query string
  const txt = q.name + " " + q.class;
  console.log(txt);
  res.end(txt);
}).listen(8080);
console.log("waiting to parse query");