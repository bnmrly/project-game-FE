import { db } from './config';
import store from '../redux/index';

export const initialisePlayer = (name, id) => {
    const state = store.getState();
    const addPlayers = db.collection('games').doc(state.playerMetaData.id);

    addPlayers.get().then(docSnapShot => {
        if (docSnapShot.exists) {
            const setWithMerge = addPlayers.set(
                {
                    players: {
                        [name]: {
                            rating: [0], // progress through chapters
                            creditAvail: [0], // progress through chapters
                            cashAvail: [0], // progress through chapters
                            chapterCount: 0,
                            billPostpones: 0, // count
                            cashSpends: 0, // count
                            cardSpends: 0, // count
                            result: null,
                            decisions: {
                                card: null, // low/med/high
                                phone: null, // high/sim-only/second-hand
                                clothing: null, // shopping choice
                                night: null, // eve entertainment choice
                                careerProgression: null // boolean - career progression (true) vs holiday (false)
                            }
                        }
                    }
                },
                { merge: true }
            );

            return setWithMerge;
        }
    });
};

export const getDecision = (type, decision) => {
    const state = store.getState();
    db.collection('games')
        .doc(state.playerMetaData.id).get()
        .then(gameDoc => {
            const players = gameDoc.data().players;
            db.collection('games')
                .doc(state.playerMetaData.id)
                .update({
                    players: {
                        ...players,
                        [state.playerMetaData.name]: {
                            ...players[state.playerMetaData.name],
                            decisions: {
                                ...players[state.playerMetaData.name].decisions,
                                [type]: decision
                            }
                        }
                    }
                })
        })
}
