const bodyParser= require('body-parser');


module.exports = (app, db) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.set('view engine', 'ejs');

    app.get('/', (req, res) => {
      // db.collection('quotes').find().toArray((err, result) => {
      //   if (err) return console.log(err);
        res.render('index.ejs', {quotes: "hey"})
      //})
    });

    return {}
}