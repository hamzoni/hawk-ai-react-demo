import {all, fork, takeEvery} from 'redux-saga/effects';

export interface ActionSaga {
    type: any;
    callback: any;
}

export const createSagas = (actions: ActionSaga[]) => {
    const watches = actions.map((action: ActionSaga) => {
        function* watch() {
            yield takeEvery(action.type, action.callback);
        }

        return watch;
    });

    function* saga() {
        const forks = watches.map(watch => fork(watch));
        yield all(forks);
    }

    return saga;
};
