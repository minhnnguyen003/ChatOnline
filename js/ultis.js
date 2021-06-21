export function getDataFromDoc(doc) {
    return doc.data();
};
/**
* @param {Array} docs
* @return {Array}
*/
export function getDataFromDocs(docs) {
    // let result = [];
    // for(let doc of docs) {
    //     result.push(getDataFromDocs());
    // }
    
    return docs.map(function(doc) {
        return getDataFromDoc(doc);
    });
}

async function getDocsByCondition() {
    let response = await firebase.firestore().collection("users").where("age", ">=", 25).get();
    console.log(getDataFromDocs(response.docs));
}

getDocsByCondition();

//update

//delete