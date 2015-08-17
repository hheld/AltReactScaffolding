import React from 'react';
import AltContainer from 'alt/AltContainer';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import CounterComp from './CounterComp';

class AppControllerView extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AltContainer store={AppStore}>
                <p>This is the AppControllerView</p>
                <CounterComp onIncrementCounter={this._onIncrementCounter} />
            </AltContainer>
        );
    }

    _onIncrementCounter() {
        AppActions.updateCounter(AppStore.getState().counter + 1);
    }
}

export default AppControllerView;
