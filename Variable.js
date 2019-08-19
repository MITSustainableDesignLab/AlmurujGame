'use strict';

const e = React.createElement;

class Variable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultName: "CO2 Emissions",
      resultVal: "0",
      units: "tons"
    };
  }

  render() {
    return e('div', null,
      e('button', {className: "dot"},
        e('img', {src: props.img}, null)
      )
    );
  }
}

const domContainer = document.querySelector('#variable');
ReactDOM.render(e(Variable), domContainer);
