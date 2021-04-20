const $template = document.createElement('template');

$template.innerHML = `

`;

export default class InputWrapper extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define('input-wrapper', InputWrapper);