import { db } from './config';
import store from '../redux/index';

export const initialisePlayer = (name, id) => {
    const state = store.getState();
    const addPlayers = db
        .collection('games')
        .doc(state.playerMetaData.id);

    addPlayers.get()
        .then(docSnapShot => {
            if (docSnapShot.exists) {
                const setWithMerge = addPlayers.set({
                    players: {
                        [name]: {
                            rating: 0,
                            creditSpent: 0,
                            creditMax: 0,
                            cash: 0,
                            decisions: {
                                testDecision: 'test'
                            }
                        }
                    }
                }, { merge: true });

                return setWithMerge;
            }
        })
};