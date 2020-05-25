import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = '06-state-input-multi';

  state = {
    fields: {
      name: '',
      email: ''
    },
    people: []
  };

  onFormSubmit = evt => {
    evt.preventDefault()
    const newPeople = [...this.state.people, this.state.fields]
    this.setState({people: newPeople, fields: {name: '', email: ''}})
  };

  onInputChange = evt => {
    let newFields = Object.assign({}, this.state.fields)
    newFields[evt.target.name] = evt.target.value
    this.setState({fields: newFields})
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>
        <form onSubmit={this.onFormSubmit}>
        <input type="text"
          placeholder="name"
          name="name"
          value={this.state.fields.name}
          onChange={this.onInputChange}
        />
        <input type="email"
          placeholder="Email"
          name="email"
          value={this.state.fields.email}
          onChange={this.onInputChange}
        />
        <input type="submit"/>
        </form>
        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({name, email}, i) => <li key={i}>{`${name} (${email})`}</li>) }
          </ul>
        </div>
      </div>
    );
  }
};
