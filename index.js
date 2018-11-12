const fastify = require('fastify');
const path = require('path');
const app = fastify();
const port = process.env.PORT || 3000;

app.register(require('point-of-view'), { engine: { ejs: require('ejs') }})
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'resources'),
    prefix: '/resources'
  });

app.get('/', (req, reply) => {
  reply.view('views/index.ejs', {text: 'text'});
});

app.get('/game', (req, reply) => {
  reply.view('views/game.ejs', {text: 'text'});
});

app.get('/score', (req, reply) => {
  reply.view('views/score.ejs', {text: 'text'});
});

app.listen(port, () => {
  console.log('Start server at ', port);
});

app.ready(() => {
  console.log(app.printRoutes());
})
