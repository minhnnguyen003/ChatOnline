import InputWrapper from "./components/InputWrapper.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginForm.js";
import AppStat from "./components/AppStat.js";
import UserActions from "./components/UserActions.js";
import MessageContainer from "./components/MessageContainer.js";
import MessageList from "./components/MessageList.js";
import SendMessageForm from "./components/sendMessageForm.js"

import AuthScreen from "./screens/AuthScreen.js";
import ChatScreen from "./screens/ChatScreen.js";

import { authStateChanged } from "./models/user.js";

authStateChanged();