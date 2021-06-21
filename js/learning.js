// create -> add

import { getDataFromDocs } from "./utils.js";

// read
// - lấy 1 document thông qua id
async function getDocById(id) {
    let response = await firebase.firestore().collection("users").doc(id).get();
    console.log(response.data());
}

// getDocById("SyMuv3EPK1bNZVwKVL9h");

// - lấy tất cả documents có trong collection

async function getAllDocs() {
    let response = await firebase.firestore().collection("users").get();
    console.log(response.docs);

    console.log(getDataFromDocs(response.docs));
}

// getAllDocs();

// - lấy các document thỏa mãn điều kiện cho trước: age > 30, có favorite là sport
async function getDocsByCondition() {
    let response = await firebase.firestore().collection("users").where("age", ">=", 25).get();
    console.log(getDataFromDocs(response.docs));
}

getDocsByCondition();

// update, delete, onSnapshot