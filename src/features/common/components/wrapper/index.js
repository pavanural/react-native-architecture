import React from "react";

const Wrapper = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      terminals: [],
      searchModalVisible: false
    };
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return HOC;
};

export default Wrapper;
