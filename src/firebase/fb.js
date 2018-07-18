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
    });
};

export const getDecision = (decisionType, decision, paymentType) => {
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
                            [decisionType]: decision,
                            [paymentType]: players[state.playerMetaData.name][paymentType] + 1
                        }
                    }
                })
        })
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