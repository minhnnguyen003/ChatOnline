import MessageContainer from "./MessageContainer.js"


const $template = document.createElement('template');
$template.innerHTML = `
    <div class="message-list">
        <message-container content="Hello" owned="true"></message-container>
        <message-container content="Hi there" owned="false"></message-container>
        <message-container content="How are you?" owned="true"></message-container>
        <message-container content="I'm khỏe" owned="false"></message-container>
    </div>
`;

export default class MessageList extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        
        this.currentUser = firebase.auth().currentUser;
        this.$list = this.querySelector('.message-list')
    }

    static get observedAttributes() {
        return ['messages'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'messages') {
            console.log(JSON.parse(newValue));
            this.$list.innerHTML = '';
            let messages = JSON.parse(newValue);

            for(let message of messages) {
                let $messageContainer = new MessageContainer();
                $messageContainer.setAttribute("content", message.content);
                $messageContainer.setAttribute("owned", message.userId == this.currentUser.uid)
                this.$list.appendChild($messageContainer);
            }
        }
        
    }
}

window.customElements.define('message-list', MessageList);