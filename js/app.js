import InputWrapper from './component/InputWrapper.js';
import RegisterForm from './component/RegisterForm.js';
import LoginForm from './component/loginForm.js';
import {authStateChanged} from './models/user.js';
import AppStat from './component/appstat.js'
import UserActions from './component/userActions.js'
authStateChanged();
// VD về CallBack
// function saysth(cb) {
//     console.log(typeof(cb));
//     /*
//         cb = function(name) {
//             return "Hmmm" + name;
//         }
//      */
//     let name = "Minh";
    
//     console.log(cb(name));
// };

// saysth(hello);
// function hello(name) {
//     return "Xin chào " + name;
// };
