export function getDataFromDoc(doc) {
    let data = doc.data();
    data.id = doc.id;
    return data;
}

/**
 * 
 * @param {Array} docs 
 * @return {Array}
 */
export function getDataFromDocs(docs) {
    // let result = [];
    // for(let doc of docs) {
    //     result.push(getDataFromDoc(doc));
    // }
    // return result;

    return docs.map(function(doc) {
        return getDataFromDoc(doc);
    });

}