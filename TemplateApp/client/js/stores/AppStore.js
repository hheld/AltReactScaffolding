import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
    constructor() {
        this.counter = 0;

        this.bindListeners({
            handleUpdateCounter: AppActions.UPDATE_COUNTER
        });
    }

    handleUpdateCounter(counterValue) {
        this.counter = counterValue;
    }
}

export default alt.createStore(AppStore, 'AppStore');
