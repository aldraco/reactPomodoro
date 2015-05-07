var React = require('react');

var Pomodoro = React.createClass({
  getInitialState: function() {
    return {
      mode: 'work',     // opts: 'work', 'rest'
      interval : {
        work: 25*60,
        rest: 5*60
      },
      restInterval: 5*60,
      defaultWorkTime: 25*60,
      defaultRestTime: 5*60
    };
  },

  componentDidMount: function() {
    console.log('hello world');
  },

  addTime: function(e) {
    var selectedTimer = e.target.value;
    // will be workInterval or restInterval
    if (selectedTimer === 'rest') {
      this.setState({interval: {
        rest: this.state.interval.rest + 60,
        work: this.state.interval.work}
      });
    } else {
      this.setState({interval: {
        work: this.state.interval.work + 60,
        rest: this.state.interval.rest}
      });
    }  // adds a minute
  },

  subtractTime: function(e) {
    var selectedTimer = e.target.value;
    // will be workInterval or restInterval
    if (selectedTimer === 'rest') {
      this.setState({interval: {
        rest: this.state.interval.rest - 60,
        work: this.state.interval.work}
      });
    } else {
      this.setState({interval: {
        work: this.state.interval.work - 60,
        rest: this.state.interval.rest}
      });
    }  // adds a minute
  },

  handleStart: function(e) {

    this.timer = setInterval(function() {
      this.setState({seconds: this.state.seconds - 1});
      if (this.state.seconds <= 0) {
        // when the countdown stops, clear the timer
        clearInterval(this.timer);
        // ... and switch modes
        this.switchModes();
        this.handleStart();
      }
    }.bind(this), 1000);
  },

  switchModes: function() {
    // there is a toggle key available to switch modes

    // first pause the current timer


    // change the state
    if (this.state.mode === 'work') {
      this.setState({mode: 'rest', seconds: this.state.restInterval});

    } else {
      this.setState({mode: 'work', seconds: this.state.workInterval});
    }

    // then start a new timer on the new mode
  },
  handlePause: function() {
    console.log("should pause");
    clearInterval(this.timer);
  },

  handleReset: function() {
    this.handlePause();
    // resetting brings you back to work mode
    this.setState({interval: {work: 25*60, rest: 5*60}, mode: 'work'});
  },


  render: function() {


    var timeVal = this.state.seconds;

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
        <h1>Work {this.state.interval.work}</h1>
        <h1>Rest {this.state.interval.rest}</h1>

      </div>
    );
  }
});

module.exports = Pomodoro;
