import { db } from './config';
import store from '../redux/index';
import {
    idSetterEvent,
    invalidIdSetter,
    usernameTakenSetter,
    nameSetterEvent
} from '../redux/actions/PlayerInfoAction';

export const idCheckFirebase = id => {
    if (navigator.onLine) {
        const checkForValidId = db.collection('games').doc(id);
        checkForValidId
            .get()
            .then(docSnapShot => {
                if (docSnapShot.exists) {
                    store.dispatch(idSetterEvent(id));
                } else {
                    store.dispatch(invalidIdSetter());
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        store.dispatch(idSetterEvent(id))
    }
};

export const initialisePlayer = name => {
    if (navigator.onLine) {
        const state = store.getState();
        const addPlayers = db.collection('games').doc(state.playerMetaData.id);
        addPlayers
            .get()
            .then(docSnapShot => {
                if (docSnapShot.data().players.hasOwnProperty(name)) {
                    store.dispatch(usernameTakenSetter());
                } else {
                    store.dispatch(nameSetterEvent(name));
                    const setWithMerge = addPlayers.set(
                        {
                            players: {
                                [name]: {
                                    rating: [0], // progress through chapters
                                    creditAvail: [0], // progress through chapters
                                    cashAvail: [0], // progress through chapters
                                    billPostpones: 0, // count
                                    cashSpends: 0, // count
                                    creditSpends: 0, // count
                                    result: null,
                                    cardDecision: null, // low/med/high
                                    phoneDecision: null, // high/sim-only/second-hand
                                    clothingDecision: null, // shopping choice
                                    nightDecision: null, // eve entertainment choice
                                    careerProgressionDecision: null // boolean - career progression (true) vs holiday (false)
                                }
                            }
                        },
                        { merge: true }
                    );
                    return setWithMerge;
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        store.dispatch(nameSetterEvent(name))
    }
};

export const getDecision = (decisionType, decision, paymentType, updateWallet) => {
    if (navigator.onLine) {
        const state = store.getState();
        const { wallet } = state.playerFinancialInfo;
        db.collection('games')
            .doc(state.playerMetaData.id).get()
            .then(gameDoc => {
                const players = gameDoc.data().players;
                const player = players[state.playerMetaData.name];
                const newWallet = updateWallet ? {
                    cashAvail: [...player.cashAvail, wallet.cash],
                    creditAvail: [...player.creditAvail, wallet.credit.available],
                    rating: [...player.rating, wallet.rating]
                } : {};
                db.collection('games')
                    .doc(state.playerMetaData.id)
                    .update({
                        players: {
                            ...players,
                            [state.playerMetaData.name]: {
                                ...player,
                                [decisionType]: decision,
                                [paymentType]: player[paymentType] + 1,
                                ...newWallet
                            }
                        }
                    })
            })
    }
}

// export const incrementDecision = (type) => {
//     const state = store.getState();
//     db.collection('games')
//         .doc(state.playerMetaData.id).get()
//         .then(gameDoc => {
//             const players = gameDoc.data().players;
//             db.collection('games')
//                 .doc(state.playerMetaData.id)
//                 .update({
//                     players: {
//                         ...players,
//                         [state.playerMetaData.name]: {
//                             ...players[state.playerMetaData.name],
//                             [type]: players[state.playerMetaData.name][type] + 1
//                         }
//                     }
//                 })
//         })
// }

// export const getCashorCredit = () => {
//     const state = store.getState();
//     const check = decision.match(/[a-z]+$/)[0];
// }

