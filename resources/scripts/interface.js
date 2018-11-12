
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
          <h1>เกมจับผิดภาพ</h1>
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={() => this.handleClickStart()}>เริ่มเกม</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-info" onClick={() => this.handleClickScore()}>Score</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



ReactDOM.render(<UI />, document.getElementById('root'));
