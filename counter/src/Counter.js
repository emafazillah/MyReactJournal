import React from 'react';
import { INCREMENT, DECREMENT } from './action';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        count: state.count
    };
}

class Counter extends React.Component {
    increment = () => {
        this.props.dispatch({ type: 'INCREMENT' });
    };

    decrement = () => {
        this.props.dispatch({ type: 'DECREMENT' });
    };

    render() {
        return (
            <div className='counter'>
                <h2>Counter</h2>
                <div>
                    <button onClick={this.decrement}>-</button>
                    <span>{this.props.count}</span>
                    <button onClick={this.increment}>+</button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Counter);