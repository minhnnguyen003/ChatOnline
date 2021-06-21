import { updateCurrentUser, getFlirtingUsers, updateUser} from "../models/user.js";
import createConversation from "../models/conversation.js"

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="user-actions">
        <div class="status-free">
            <button class="btn btn-flirt">Let's flirt</button>
            <button class="btn btn-bite">Bite</button>
        </div>

        <div class="status-flirting">
            <button class="btn btn-stop-flirting">Stop flirting</button>
        </div>
            
        <div class="status-chatting">
            <button class="btn btn-end-chat">End conversation</button>
        </div>
    </div>
`;

export default class UserActions extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.partnerId = 

        this.$statusFree = this.querySelector('.status-free');
        this.$statusFlirting = this.querySelector('.status-flirting');
        this.$statusChatting = this.querySelector('.status-chatting');

        this.$flirtBtn = this.querySelector('.btn-flirt');
        this.$biteBtn = this.querySelector('.btn-bite');
        this.$stopFlirtingBtn = this.querySelector('.btn-stop-flirting');
        this.$endChatBtn = this.querySelector('.btn-end-chat');

    }

    connectedCallback() {
        this.$flirtBtn.onclick = () => {
            updateCurrentUser({ status: 'flirting' });
        }

        this.$biteBtn.onclick = async () => {

            // console.log(this)
            // getFlirtingUsers()
            
            let flirtingUsers = await getFlirtingUsers();

            if(flirtingUsers.length == 0) {
                alert("There are no flirting users");
                return;
            }


            let index = Math.floor(Math.random() * flirtingUsers.length);
            let randomUser = flirtingUsers[index];
            let currentUser = firebase.auth().currentUser;

            this.partnerId = randomUser.id;


            await createConversation([randomUser.id, currentUser.uid]);

            let conversation = await createConversation([randomUser.id, currentUser.uid])

            updateCurrentUser({status: 'chatting', currentConversationId: conversation.id});
            updateUser(randomUser.id, {status: 'chatting', currentConversationId: conversation.id})
        }


        this.$stopFlirtingBtn.onclick = () => {
            updateCurrentUser({ status: 'free' });
        }

        this.$endChatBtn.onclick = () => {
            updateCurrentUser({ status: 'free', currentConversationId: '' });
            updateUser({partnerId, status:"free"});
        }
    }

    static get observedAttributes() {
        return ['status'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'status') {
            this.$statusFree.style.display = 'none';
            this.$statusChatting.style.display = 'none';
            this.$statusFlirting.style.display = 'none';

            if (newValue == 'free') {
                this.$statusFree.style.display = 'block';
            } else if (newValue == 'chatting') {
                this.$statusChatting.style.display = 'block';
            } else if (newValue == 'flirting') {
                this.$statusFlirting.style.display = 'block';
            }
        }
    }
}

window.customElements.define('user-actions', UserActions);