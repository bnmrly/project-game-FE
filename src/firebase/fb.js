import { db } from './config';
import store from '../redux/index';

export const initialisePlayer = (name) => {
    const state = store.getState();
    const addPlayers = db
        .collection('games')
        .doc(state.playerMetaData.id);

    addPlayers.get()
        .then(docSnapShot => {
            console.log(docSnapShot)
            if (docSnapShot.exists) {
                const setWithMerge = addPlayers.set({
                    players: {
                        [name]: {
                            rating: 0,
                            creditAvailable: 0,
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

// export const updateWallet = () => {
//     const state = store.getState();
//     const updateWallet = db
//         .collection('games')
//         .doc(state.playerMetaData.id)
//         .update({
//             [`players.${state.playerMetaData.name}.cash`]: state.playerFinancialInfo.wallet.cash,
//             [`players.${state.playerMetaData.name}.creditMax`]: state.playerFinancialInfo.wallet.credit.max,
//             [`players.${state.playerMetaData.name}.creditAvailable`]: state.playerFinancialInfo.wallet.credit.available,
//             [`players.${state.playerMetaData.name}.rating`]: state.playerFinancialInfo.wallet.rating
//         })
//     return updateWallet;
// }

export const cardDecision = (cd) => {
    const state = store.getState();
    const addCd = db
        .collection('games')
        .doc(state.playerMetaData.id)
        .update({
            [`players.${state.playerMetaData.name}`]: {
                decisions: {
                    cardDecision: cd
                }
            }
        });
    return addCd;
}