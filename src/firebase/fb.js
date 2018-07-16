import { db } from './config';

export const initialisePlayer = (name, id) => {
    const addPlayers = db
        .collection('games')
        .doc(id);

    addPlayers.get()
        .then(docSnapShot => {
            console.log(docSnapShot)
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