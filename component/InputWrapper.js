const $template = document.createElement('template');

$template.innerHTML = `
    <div class="input-wrapper">
        <input type="text" class="input-main">
        <div class="input-error">No Username</div>
    </div>
`;



export default class InputWrapper extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        
        this.$main = this.querySelector(".input-main");
        this.$error = this.querySelector(".input-error");
    }

    static get observedAttributes() {
        return ['placeholder', 'error', 'type'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch(attrName) {
            case 'placeholder':
                this.$main.placeholder = newValue;
                break;
            case 'error':
                this.$error.innerHTML = newValue;
                break;
            case 'type':
                this.$main.type = newValue
                break;
        }
    }

    validate(condition, error) {
        let val = this.$main.value;
        if(condition(val)) {
            this.setAttribute('error', '');
            return true;
        }
        this.setAttribute('error', error);
        return false;
    }

    get value() {
        return this.$main.value;
    }
}

window.customElements.define('input-wrapper', InputWrapper);