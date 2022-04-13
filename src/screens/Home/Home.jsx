import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [{ name: "toan" }, { name: "nga" }],
      index: "",
    };
  }
  show = (data) => {
    return data.map((e, index) => {
      return (
        <div>
          <span
            onClick={() => {
              this.handleClick(index);
            }}
          >
            {e.name}
          </span>
        </div>
      );
    });
  };
  handleClick = (index) => {
    this.setState({
      index: index,
    });
  };

  handleChange = (event) => {
    let name = event.target.value;
    console.log(name);
  };
  render() {
    return (
      <div>
        {this.show(this.state.arr)}
        <input
          type="text"
          onChange={this.handleChange}
          defaultValue={this.state.arr[this.state.index]?.name}
        ></input>
      </div>
    );
  }
}

export default Home;
