
const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#"></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="game">Play Game</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="score">Score board</a>
        </li>
      </ul>
    </div>
  </nav>
);



class UI extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickScore = this.handleClickScore.bind(this);
  }

  handleClickStart() {
    window.location.replace('game');
  }

  handleClickScore() {
    window.location.replace('score');
  }

  render() {
    return (
      <div>
        <NavBar />
        <div id="app">
          <h1>Score</h1>
          <table className="table" id="scoreboard">
            <thead>
              <tr>
                <td>ชื่อ</td>
                <td>คะแนน</td>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}



ReactDOM.render(<UI />, document.getElementById('root'));

const dbconfig = {
	apiKey: 'AIzaSyAJQYVTKrPeOp0d2v6Ka03qremTflEZpmE',
	authDomain: 'notsure-e283f.firebaseapp.com',
	databaseURL: 'https://notsure-e283f.firebaseio.com',
	projectId: 'notsure-e283f',
	storageBucket: 'notsure-e283f.appspot.com',
	messagingSenderId: '168543849006'
};
	// eslint-disable-next-line
firebase.initializeApp(dbconfig);
// eslint-disable-next-line
let db = firebase.firestore();
// Disable deprecated features
db.settings({
	timestampsInSnapshots: true
});

db.collection('diff').orderBy('score', 'desc').limit(20).get().then((querySnapshot => {
	let scores = [];
	querySnapshot.forEach((doc) => {
		console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
		scores.push({ name: doc.data().name, score: doc.data().score });
	});
	const table = document.getElementById('scoreboard').getElementsByTagName('tbody')[0];
	for(let i = scores.length-1 ;i>=0;i--) {
		let row = table.insertRow(0);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		cell1.innerHTML = scores[i].name;
		cell2.innerHTML = scores[i].score;
	}
}));
