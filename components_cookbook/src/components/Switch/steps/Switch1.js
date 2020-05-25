import React from "react";

const BTC = "Bitcoin"
const CC = "Creditcard"

class Switch extends React.Component {
  state = {
    payWith: BTC
  };

  select = value => {
    const payMethod = value
    return (
      e => this.setState({payWith: payMethod})
    )
  }

  renderOption = (value) => {
    const cssClasses = []
    if(value === this.state.payWith) {
      cssClasses.push("active")
    }
    return(
    <option value={value}
      className={cssClasses.join(' ')}
      onClick={this.select(value)}
    >{value}</option>
    )}

  render() {
    return (
      <div>
        <radio>
          {this.renderOption(BTC)}
          {this.renderOption(CC)}
        </radio>
        <p>Pay with: {this.state.payWith}</p>
      </div>
    );
  }
}

export default Switch;
