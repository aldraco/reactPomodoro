var React = require('react');

var WorkDiv = React.createClass({
  render: function() {
    var total = this.props.work;
    var timerDisplay = (function() {
      
      var mins = Math.floor(total/60);
      var secs = total%60;

      if (secs < 10) {
        secs = '0' + secs.toString();
      }

      return <h1>{mins}:{secs}</h1>
    })();

    return (
        <div className="workDiv">
          {timerDisplay}
        </div>
            )
  }

});

var RestDiv = React.createClass({
  render: function() {
    var total = this.props.rest;
    var timerDisplay = (function() {
      
      var mins = Math.floor(total/60);
      var secs = total%60;

      if (secs < 10) {
        secs = '0' + secs.toString();
      }

      return <h1>{mins}:{secs}</h1>
    })();

    return (
        <div className="restDiv">
          {timerDisplay}
        </div>
            )
  }

});



var Pomodoro = React.createClass({
  getInitialState: function() {
    return {
      mode: 'work',     // opts: 'work', 'rest'
      work: 25*60,
      rest: 5*60,
      defaultWorkTime: 25*60,
      defaultRestTime: 5*60
    };
  },

  addTime: function(e) {
    var selectedTimer = e.target.value;

    if (selectedTimer === 'rest') {

      var increasedRest = this.state.rest + 60;
      this.setState({rest : increasedRest});

    } else {

      var increasedWork = this.state.work + 60;
      this.setState({work: increasedWork});

    } 
  },

  subtractTime: function(e) {
    var selectedTimer = e.target.value;

    if (selectedTimer === 'rest') {

      var decreasedRest = this.state.rest - 60;
      this.setState({rest : decreasedRest});

    } else {

      var decreasedWork = this.state.work - 60;
      this.setState({work: decreasedWork});

    }  
  },

  handleStart: function() {
    var mode =        this.state.mode,
        defaultWork = this.state.defaultWorkTime,
        defaultRest = this.state.defaultRestTime;

    this.setState({timerIsActive: true});

    if (this.timer) {
      // prevents spastic countdown of multiple intervals
      return;
    }

    function countDown(mode) {
      var workCountDown = this.state.work - 1,
          restCountDown = this.state.rest - 1;

      if (mode==='work') {
        this.setState({work: workCountDown});
      } else {
        this.setState({rest: restCountDown});
      }
    };

    this.timer = setInterval(function() {
      
      countDown.call(this, mode);

      if (this.state.work <= 0 || this.state.rest <= 0) {
        
        clearInterval(this.timer);
        delete this.timer;
        
        this.state.work = (this.state.work === 0) ? defaultWork : this.state.work;
        this.state.rest = (this.state.rest === 0) ? defaultRest : this.state.rest;

        this.switchModes();
        // automatically starts the timer for the other mode
        this.handleStart();
      }
    }.bind(this), 1000);
  },

  switchModes: function() {
    // first pause and delete the current timer

    // change the mode
    if (this.state.mode == 'work') {
      this.setState({mode: 'rest'});
    } else {
      this.setState({mode: 'work'});
    }

    this.handlePause();
    delete this.timer;
  },
  handlePause: function() {
    clearInterval(this.timer);
    //this.setState({timerIsActive: false});
    // does not delete the timer.
  },

  handleReset: function() {
    this.handlePause();
    delete this.timer; 

    // resetting brings you back to work mode
    var defaultWork = 25*60;
    var defaultRest = 5*60;
    this.setState({work: defaultWork, rest: defaultRest, mode: 'work'});
  },


  render: function() {


    return (
      <div>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handlePause}>Stop</button>
        <button onClick={this.handleReset}>Reset</button>
        <button onClick={this.switchModes}>Toggle Mode</button>
        <h2>work</h2>
        <button onClick={this.addTime} value="work"> + </button>
        <button onClick={this.subtractTime} value="work"> - </button>
        <h2>rest</h2>
        <button onClick={this.addTime} value="rest"> + </button>
        <button onClick={this.subtractTime} value="rest"> - </button>
        <WorkDiv work={this.state.work} />
        <RestDiv rest={this.state.rest} />
        <h1>Rest {this.state.rest}</h1>
        <h1>Mode: {this.state.mode}</h1>

      </div>
    );
  }
});

module.exports = Pomodoro;
