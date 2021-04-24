const $template = document.createElement('template');

$template.innerHTML = `
    <form class="login-form">
    <h4 class="title">Create an account</h4>
    <div class="sub-title">Sign in to use app</div>

    <input-wrapper class="email" placeholder="Your Email" type="email" error = ""></input-wrapper>
    <input-wrapper class="pass" placeholder="Password" type="password" error = ""></input-wrapper>

    <button class="reg-btn">Register</button>
    </form>
`;

export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        
        this.$loginForm = this.querySelector('.login-form');
        this.$email = this.querySelector('.email');
        this.$password = this.querySelector('.pass');
    }

    connectedCallback() {
        this.$loginForm.onsubmit = (event) => {
            event.preventDefault();
            console.log("Register form submitted");
            
            let isPassed = true;

           
            this.$email.validate(value => {
                return value != '';
            }, "Invalid Email") &

            this.$password.validate(value => {
                return value != '';
            }, "Invalid Password");

            if(isPassed) {
                let data = {
                    email: this.$email.value,
                    password: this.$password.value,
                };
            }
        }
    }
}

window.customElements.define('login-form', LoginForm);