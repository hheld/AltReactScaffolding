import React from 'react';

class CounterComp extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <p>Counter value: {this.props.counter}
                <button onClick={this.props.onIncrementCounter}>Increment</button>
            </p>
        );
    }
}

CounterComp.propTypes = {
    counter: React.PropTypes.number,
    onIncrementCounter: React.PropTypes.func.isRequired
};

CounterComp.defaultProps = {
    counter: 0
};

export default CounterComp;
