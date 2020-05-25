import React from "react";

/* eslint-disable no-unused-vars */
const CREDITCARD = "Creditcard";
const BTC = "Bitcoin";

const Choice = ({active, onClick, label}) => {
  const cssClasses = ['choice'];

  if(active) {
    cssClasses.push("active");
  }

  return(
    <div className={cssClasses.join(' ')}
    onClick={onClick}>
      {label}
    </div>
  )
}

class Switch extends React.Component {
  state = {
    payMethod: BTC
  };
  select = payment => {
    return e => {
      this.setState({
        payMethod: payment
      })
    }
  }

  render() {
    return (
      <div className="switch">
        <Choice 
          onClick={this.select(CREDITCARD)}
          label={CREDITCARD}
          active={this.state.payMethod == CREDITCARD}
        />
        <Choice 
          onClick={this.select(BTC)}
          label={BTC}
          active={this.state.payMethod == BTC}
        />
        Pay with: {this.state.payMethod}
      </div>
    );
  }
}

export default Switch;
