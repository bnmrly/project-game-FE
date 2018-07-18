import { db } from './config';
import store from '../redux/index';
import {
  idSetterEvent,
  invalidIdSetter,
  usernameTakenSetter,
  nameSetterEvent
} from '../redux/actions/PlayerInfoAction';

export const idCheckFirebase = id => {
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
};
export const initialisePlayer = name => {
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
    })
    .catch(err => {
      console.log(err);
    });
};

export const getDecision = (type, decision) => {
  const state = store.getState();
  db.collection('games')
    .doc(state.playerMetaData.id)
    .get()
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
        });
    });
};
