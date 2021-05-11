const $template = document.createElement('template');

$template.innerHTML = `
    <div class="user-actions">
        <div class="status-free">
            <button class="btn btn-flirt">Let's Flirt</button>
            <button class="btn btn-bite">Bite</button>
        </div>
        <div class="status-flirting">
            <button class="btn btn-stop-flirting">Stop Flirting</button>
        </div>
        <div class="status-chatting">
            <button class="btn btn-end-chat">End Conversation</button>
        </div>
    </div>
`;

export default class UserActions extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.appendChild(true));
    }
}

window.customElements.define('user-actions', UserActions);