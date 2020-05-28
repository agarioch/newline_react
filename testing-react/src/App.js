import React from "react";

class App extends React.Component {
  state = {
    item: "",
    items: [],
  };

  onInputChange = (evt) => {
    this.setState({ item: evt.target.value });
  };

  onItemSubmit = (evt) => {
    console.log("submit");
    this.setState((state) => {
      return { items: [...state.items, state.item], item: "" };
    });
    evt.preventDefault();
  };

  render() {
    const formDisabled = !this.state.item;
    return (
      <div className="ui text container" id="App">
        <table className="ui selectable structured large table">
          <thead>
            <tr>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((itm, index) => (
              <tr key={index}>
                <td>{itm}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>
                <form className="ui form" onSubmit={this.onItemSubmit}>
                  <div className="field">
                    <input
                      className="prompt"
                      placeholder="Add item"
                      type="text"
                      onChange={this.onInputChange}
                      value={this.state.item}
                    />
                  </div>
                  <button
                    className="ui button"
                    type="submit"
                    disabled={formDisabled}
                  >
                    Submit
                  </button>
                </form>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;

// ui text container id: app
//    ui selectable structured large table
//      footer
//        ui form
//        field
//          input
//        ui button
