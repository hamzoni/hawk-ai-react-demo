import {all, call, fork, put, select, takeEvery} from 'redux-saga/effects';

export interface ActionSaga {
    type: string;
    callback: Function;
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
