export async function register(name, email, password) {
    
    try {
    let user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.updateProfile({
        displayName: name
    });
    console.log(firebase.auth().currentUser);
    console.log("Create account successfully");
    }
    catch(error) {
        console.log('An error has occured');
        console.error(error.message);
        alert(error.message);
    };
   
    console.log('this code must be executed');
};

export async function login(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        alert("login sucessfully");
    }
    catch(error) {
        console.error(error.message);
    }
};

export function authStateChanged() {

    // trạng thái thay đổi khi: Đăng kí, đăng nhập, đăng xuất
    firebase.auth().onAuthStateChanged(function(user) {
        if(user != null) { // tiến hành chuyển trang
            console.log(user);
        }
        else
        {
            console.log("User logged out");
        }
    });
}