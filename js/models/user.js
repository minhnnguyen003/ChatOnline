import { getDataFromDocs, getDataFromDoc } from "../utils.js";

export async function register(name, email, password) {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.auth().currentUser.updateProfile({
            displayName: name
        });

        // console.log(firebase.auth().currentUser);

        let currentUser = firebase.auth().currentUser;

        await firebase.firestore().collection("users").doc(currentUser.uid).set({
            status: 'free',
            currentConversationId: ''
        }); // tự sinh 1 id 

        alert("Create account successfully");
    } catch (error) {
        alert(error.message);
    }

    console.log("This code must be executed");
}

export async function login(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        alert("Login successfully");
    } catch (error) {
        alert(error.message)
    }
}

export function authStateChanged() {
    // đăng kí, đăng nhập, đăng xuất
    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            document.getElementById('app').innerHTML = '<chat-screen></chat-screen>';
        } else {
            document.getElementById('app').innerHTML = '<auth-screen></auth-screen>';
        }
    });
}

export async function listenAllUsers(callback) {

    // get
    // let response = await firebase.firestore().collection("users").get();
    // let usersData = getDataFromDocs(response.docs);
    // callback(usersData);

    // onSnapshot
    firebase.firestore().collection("users").onSnapshot((response) => {
        let usersData = getDataFromDocs(response.docs);
        callback(usersData);
    });
}

export async function updateCurrentUser(data) {
    let currentUser = firebase.auth().currentUser;
    await firebase.firestore().collection("users").doc(currentUser.uid).update(data);
}

export function listenCurrentUser(callback) {
    let currentUser = firebase.auth().currentUser;
    firebase.firestore().collection('users').doc(currentUser.uid).onSnapshot((response) => {
        console.log(response);
        let data = getDataFromDoc(response);
        callback(data);
    });
}

export async function getFlirtingUsers() {
    let response = await firebase.firestore().collection('users').where('status', '==', 'flirting').get();
    return getDataFromDocs(response.docs);
}

export async function updateUser(id, data) {
    await firebase.firestore().collection('users').doc(id).update(data);
}

export 