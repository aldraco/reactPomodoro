var React = require('react');

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
    var mode = this.state.mode,
        defaultWork = this.state.defaultWorkTime,
        defaultRest = this.state.defaultRestTime,
        workCountDown = this.state.work - 1,
        restCountDown = this.state.rest - 1;


    if (this.timer) {
      // prevents spastic countdown of multiple intervals
      return;
    }

    function countDown(mode) {

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
        
        this.state.work = (this.state.work === 0)? defaultWork : this.state.work;
        this.state.rest = (this.state.rest === 0)? defaultRest : this.state.rest;

        this.switchModes();
        // automatically starts the timer for the other mode
        this.handleStart();
      }
    }.bind(this), 1000);
  },

  switchModes: function() {
    // first pause and delete the current timer
    this.handlePause();
    delete this.timer;

    // change the mode
    if (this.state.mode === 'work') {
      this.setState({mode: 'rest'});
    } else {
      this.setState({mode: 'work'});
    }
  },
  handlePause: function() {
    clearInterval(this.timer);
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
        <h1>Work {this.state.work}</h1>
        <h1>Rest {this.state.rest}</h1>
        <h1>Mode: {this.state.mode}</h1>

      </div>
    );
  }
});

module.exports = Pomodoro;
