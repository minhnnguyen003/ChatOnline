import { listenConversation } from "../models/conversation.js";
import { listenCurrentUser } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="chat-screen">
        <div class="aside-left">
            <app-stat></app-stat>
            <user-actions></user-actions>
        </div>

        <div class="chat-container">
            <message-list></message-list>
            <send-message-form></send-message-form>
            <!-- Form gửi tin nhắn -->
            
        </div>
    </div>
`;

let fakeMessages = [
    { content: 'Hello', userId: 'id người gửi 1', dateModified: '2021/06/01' },
    { content: 'Hi', userId: 'id người gửi 2', dateModified: '2021/06/01' },
    { content: 'How are you?', userId: 'id người gửi 1', dateModified: '2021/06/01' },
    { content: 'Quà 1/6 đâu?', userId: 'id người gửi 2', dateModified: '2021/06/01' }
];

export default class ChatScreen extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$userActions = this.querySelector('user-actions');
        this.$messageList = this.querySelector('message-list');
        this.$sendMessageForm = this.querySelector('send-message-form');
    }

    connectedCallback() {
        listenCurrentUser((data) => {
            this.$userActions.setAttribute('status', data.status);
            this.$sendMessageForm.setAttribute('conversation-id', data.currentConversationId)

            if(data.status == 'chatting') {
                listenConversation(data.currentConversationId, (data) => {
                    this.$messageList.setAttribute('messages', JSON.stringify(data.messages));
                });
            }
        });
    }
}

window.customElements.define('chat-screen', ChatScreen);