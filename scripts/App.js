var React = require('react');

var Pomodoro = React.createClass({
  getInitialState: function() {
    return {
      userSubmittedTime: 0,
      time: 10,
      timerRunning: false,
      timerCompleted: false
    };
  },

  handleInput: function(e) {
    var value = e.target.value;
    if (value.match(/\D/)) {
      console.log('Invalid Input');
    } else {
      this.setState({userSubmittedTime: value, time: value});
    }

  },

  handleStart: function() {
    this.setState({timerRunning: true, timerCompleted: false});
    this.interval = setInterval(function() {
      this.setState({time: this.state.time - 1});
      if (this.state.time <= 0) {
        clearInterval(this.interval);
        this.setState({timerCompleted: true, timerRunning: false, time: this.state.userSubmittedTime});
      }
    }.bind(this), 1000);
  },

  handleStop: function() {
    clearInterval(this.interval);
    this.setState({timerRunning: false});
  },

  handleReset: function() {
    this.handleStop();
    this.setState({timerCompleted: false, timerRunning: false, time: this.state.userSubmittedTime});
  },


  render: function() {
    var completed = this.state.timerCompleted ?
      <h1>Time is up chump</h1> :
      <h1/>;

    var timeVal = this.state.userSubmittedTime || this.state.time;

    return (
      <div>
        <input type="text"
          onChange={this.handleInput}
          value={timeVal}
        />{' '}
        <button onClick={this.handleStart}>Start</button>{' '}
        <button onClick={this.handleStop}>Stop</button>{' '}
        <button onClick={this.handleReset}>Reset</button>
        <h1>{this.state.time}</h1>
        {completed}
      </div>
    );
  }
});

module.exports = Pomodoro;
