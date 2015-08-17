import alt from '../alt';

class AppActions {
    constructor() {
        // simply define data-pass-through-actions here like this; multiple args possible
        this.generateActions('updateCounter');
    }

    // This is the more elaborate version of the simple data-pass-through action generation from above
    // It calls this.dispatch(counterValue).
    // updateCounter(counterValue) {
    //     return counterValue;
    // }
}

export default alt.createActions(AppActions);
