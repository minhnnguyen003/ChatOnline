const $template = document.createElement('template');

$template.innerHTML = `
    <div class="app-stat">
        <div class="stat">    
            <i class="fas fa-users"></i>
            <span class="free-user-count"></span>
        </div>
        <div class="stat">    
            <i class="fas fa-comment-dots"></i>
            <span class="chatting-user-count">20</span>
        </div>
        <div class="stat">    
            <i class="far fa-comments"></i>
            <span class="flirting-user-count">50</span>
        </div>
    </div>
`;

export default class AppStat extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
    }


}

window.customElements.define('app-stat', AppStat);