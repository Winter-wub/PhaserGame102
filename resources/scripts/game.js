const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#"></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/">Home </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="game">Play Game <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="score">Score board</a>
        </li>
      </ul>
    </div>
  </nav>
);

class UI extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div id="app">
          <div id="game"></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<UI />, document.getElementById('root'));

const config = {
	// eslint-disable-next-line
	type: Phaser.AUTO,
	width: 1480,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		}
	},
	scene:{
		preload: preload,
		create: create,
		update: update,
	},
	title: 'diffimage',
	version: '0.1a',
	parent: 'game',
};
// eslint-disable-next-line
let game = new Phaser.Game(config);

let stateNo = 1;
let reminingText;
let remining = 0;
let reminingMax = [5];
let buttonNext;
let timeText;
let img1;
let img2;
let timeEvent;
const delay = 45000;
let score = 0;
let circle;

const level = {
  state1:[
    {x: [204,270],y: [122,161]},
    {x: [268,300],y: [260,286]},
    {x: [404,448],y: [301,337]},
    {x: [224,254],y: [351,399]},
    {x: [508,556],y: [389,432]}
  ],
  state2:[
    {x: [498,551],y: [483,528]},
    {x: [178,212],y: [483,532]},
    {x: [426,470],y: [250,280]},
    {x: [428,467],y: [73,115]},
    {x: [194,240],y: [66,126]},
  ],
  state3:[
    {x:[374,400],y:[188,215]},
    {x:[219,249],y:[211,242]},
    {x:[104,156],y:[379,421]},
    {x:[452,484],y:[248,279]},
    {x:[613,635],y:[284,320]},
  ]
}

function preload() {
  this.load.image('1-1', '/resources/images/1-1.png');
  this.load.image('1-2', '/resources/images/1-2.png');
  this.load.image('2-1', '/resources/images/2-1.png');
  this.load.image('2-2', '/resources/images/2-2.png');
  this.load.image('3-1', '/resources/images/3-1.png');
  this.load.image('3-2', '/resources/images/3-2.png');
  this.load.image('circle', '/resources/images/circle.png');

}

function create() {
  circle = this.add.group();
  reminingText = this.add.text(16,16, 'เหลืออีก '+reminingMax, { font: '15px Courier', fill: '#ffffff' });
  reminingText.setText(`เหลืออีก ${remining}/${reminingMax}`);
  timeText = this.add.text(16,50, '', { font: '15px Courier', fill: '#ffffff' });
  // buttonNext = this.add.text(16,500, 'ด่านถัดไป', { font: '15px Courier', fill: '#ffffff' })
  //   .setInteractive({ useHandCursor: true })
  //   .on('pointerdown',() => nextState(this));
  img1 = this.add.image(350,300, '1-1');
  img2 = this.add.image(1125,300, '1-2');
  timeEvent = this.time.addEvent({ delay, callback: gameover, callbackscope: this});
  console.log(level);
  this.input.on('pointerdown', pointer => {
    console.log(`x: ${pointer.x} y: ${pointer.y}`)
      if((pointer.x >= level[`state${stateNo}`][0].x[0] && pointer.x <= level[`state${stateNo}`][0].x[1])) {
        if(pointer.y >= level[`state${stateNo}`][0].y[0] && pointer.y <= level[`state${stateNo}`][0].y[1]) {
          remining++;
          level[`state${stateNo}`].splice(0,1);
          circle.create(pointer.x, pointer.y, 'circle')
          // console.log(level);
          score++;
        }
      }
      if( level[`state${stateNo}`][1] &&(pointer.x >= level[`state${stateNo}`][1].x[0] && pointer.x <= level[`state${stateNo}`][1].x[1])) {
        if(pointer.y >= level[`state${stateNo}`][1].y[0] && pointer.y <= level[`state${stateNo}`][1].y[1]) {
          remining++;
          reminingText.setText(`เหลืออีก ${remining}/${reminingMax}`);
          level[`state${stateNo}`].splice(1,1);
          circle.create(pointer.x, pointer.y, 'circle')
          // console.log(level);
          score++;

        }
      }
      if(level[`state${stateNo}`][2] &&(pointer.x >= level[`state${stateNo}`][2].x[0] && pointer.x <= level[`state${stateNo}`][2].x[1])) {
        if(pointer.y >= level[`state${stateNo}`][2].y[0] && pointer.y <= level[`state${stateNo}`][2].y[1]) {
          remining++;
          level[`state${stateNo}`].splice(2,1);
          circle.create(pointer.x, pointer.y, 'circle')
          console.log(level);
        }
      }
      if(level[`state${stateNo}`][3] &&(pointer.x >= level[`state${stateNo}`][3].x[0] && pointer.x <= level[`state${stateNo}`][3].x[1])) {
        if(pointer.y >= level[`state${stateNo}`][3].y[0] && pointer.y <= level[`state${stateNo}`][3].y[1]) {
          remining++;
          level[`state${stateNo}`].splice(3,1);
          circle.create(pointer.x, pointer.y, 'circle')
          score++;

          // console.log(level);
        }
      }
      if(level[`state${stateNo}`][4] && (pointer.x >= level[`state${stateNo}`][4].x[0] && pointer.x <= level[`state${stateNo}`][4].x[1])) {
        if(pointer.y >= level[`state${stateNo}`][4].y[0] && pointer.y <= level[`state${stateNo}`][4].y[1]) {
          remining++;
          level[`state${stateNo}`].splice(4,1);
          circle.create(pointer.x, pointer.y, 'circle')
          score++;

          // console.log(level);
        }
      }
      

  })

}

function update() {
  reminingText.setText(`เหลืออีก ${remining}/${reminingMax}`);
  timeText.setText(`${timeEvent.getProgress().toString().substring(0,0)}${ timeEvent.getProgress().toString().substring(2,4)}/100`);
  nextState(this);
  // console.log(level);

}

function nextState(e) {
  if(level[`state${stateNo}`].length === 0){
    alert('ด่านต่อไป');
    circle.destroy(true);
    img1.destroy();
    img2.destroy();
    timeEvent.destroy();
    stateNo++;
    img1 = e.add.image(350,300, `${stateNo}-1`);
    img2 = e.add.image(1125,300, `${stateNo}-2`);
    timeEvent = e.time.addEvent({ delay, callback: gameover, callbackscope: this});
    remining = 0;
    circle = e.add.group();
  }

  if(stateNo > 3){
    gameover();
  }
}

function gameover() {
  const name = prompt('โปรดกรอกชื่อ');
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
  db.collection('diff').add({
    name,
    score,
  }).then(()=> {
    alert('บันทึกคะแนนสำเร็จ');
    window.location.href = "/";
  }).catch(error => {
    alert(error);
    window.location.href = "/";
  });
}


