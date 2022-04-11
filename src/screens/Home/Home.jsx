import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [
        "https://codelearn.io/Upload/Blog/react-js-co-ban-phan-1-63738082145.3856.jpg",
      ],
    };
  }
  render() {
    return (
      <div>
        <img src={this.state.image[0]} alt="" />
      </div>
    );
  }
}

export default Home;
