import React, {Component} from 'react'
const counterStyle = {
  width: 50,
  backgroundColor: "#fafafa",
  textAlign: "center"
}

class CounterBuild extends Component {
  constructor(props) {
    super(props);

    this.state = {count: this.props.initialValue}

    this.handleDecrementClick = this.handleDecrementClick.bind(this)
    this.handleIncrementClick = this.handleIncrementClick.bind(this)
  }

  handleIncrementClick() {
    this.setState((currState) => ({count: currState.count +1}))
  }
  handleDecrementClick() {
    this.setState((currState) => ({count: currState.count -1}))
  }

  render() {
    return (
      <div style={counterStyle}>
        <h3>{this.state.count}</h3>
        <button onClick={this.handleDecrementClick}>-</button>
        <button onClick={this.handleIncrementClick}>+</button>
      </div>
    )
  }
}

CounterBuild.defaultProps = {
  initialValue: 150
}
export default CounterBuild