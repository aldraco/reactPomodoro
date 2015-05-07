var React = require('react');

var Pomodoro = React.createClass({
  getInitialState: function() {
    return {
      seconds: 25*60,
      minutes: 25,
      mode: 'work',     // opts: 'work', 'rest'
      workInterval: 25*60,
      restInterval: 5*60,
      defaultWorkTime: 25*60,
      defaultRestTime: 5*60
    };
  },

  addTime: function(e) {
    var selectedTimer = e.target.value;
    // will be workInterval or restInterval
    if (selectedTimer === 'rest') {
      this.setState({restInterval: restInterval + 60});
    } else {
      this.setState({workInterval: workInterval + 60});
    }  // adds a minute
  },

  subtractTime: function(e) {
    var selectedTimer = e.target.value;
    // will be workInterval or restInterval
    if (selectedTimer === 'rest') {
      this.setState({restInterval: restInterval - 60});
    } else {
      this.setState({workInterval: workInterval - 60});
    }  // adds a minute
  },

  handleStart: function(e) {
    console.log("event is",e);
    var selectedMode = e.target.value;
    this.timer = setInterval(function() {
      this.setState({seconds: this.state.seconds - 1});
      if (this.state.seconds <= 0) {
        // when the countdown stops, clear the timer
        clearInterval(this.timer);
        // switch modes
        this.switchModes();
        this.handleStart();
      }
    }.bind(this), 1000);
  },

  switchModes: function() {
    // there is a toggle key available to switch modes
    if (this.mode === 'work') {
      this.setState({mode: 'rest', seconds: this.restInterval});

    } else {
      this.setState({mode: 'work', seconds: this.workInterval});
    }
  },
  handlePause: function() {
    clearInterval(this.timer);
  },

  handleReset: function() {
    this.handlePause();
    // resetting brings you back to work mode
    this.setState({seconds: this.state.defaultWorkTime, mode: 'work'});
  },


  render: function() {


    var timeVal = this.state.seconds;

    return (
      <div>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handlePause}>Stop</button>
        <button onClick={this.handleReset}>Reset</button>
        <h1>{this.state.seconds}</h1>

      </div>
    );
  }
});

module.exports = Pomodoro;
