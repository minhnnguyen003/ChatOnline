import {getDataFromDoc} from '../utils.js'

export default async function createConversation(users) {
    let response = await firebase.firestore().collection('conversations').add({
        users: users,
        messages: [],
    });

    return response;
}

export function listenConversation(id, callback) {
    firebase.firestore().collection('conversations').doc(id).onSnapshot((response) => {
        let data = getDataFromDoc(response);
        callback(data);
    });
}


export async function sendMessage(conversationId, messageContent) {
    let message = {
        content: messageContent,
        userId: firebase.auth().currentUser.uid,
        dateModified: new Date().toISOString(),
    };

    await firebase.firestore().collection('conversations').doc(conversationId).update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    });
}