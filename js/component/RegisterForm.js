import { register } from "../models/user.js";

const $template = document.createElement('template');

$template.innerHTML = `
    <form class="register-form">
    <h4 class="title">Create an account</h4>
    <div class="sub-title">Create a new account and start to use our app</div>

    <input-wrapper class="name" placeholder="Your name" type="text" error = ""></input-wrapper>
    <input-wrapper class="email" placeholder="Your Email" type="email" error = ""></input-wrapper>
    <input-wrapper class="pass" placeholder="Password" type="password" error = ""></input-wrapper>
    <input-wrapper class="passcf" placeholder="Password Confirmation" type="password" error = ""></input-wrapper>

    <button class="reg-btn">Register</button>
    </form>
`;

export default class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        
        this.$regForm = this.querySelector('.register-form');
        this.$name = this.querySelector('.name');
        this.$email = this.querySelector('.email');
        this.$password = this.querySelector('.pass');
        this.$passwordCf = this.querySelector('.passcf');
    }

    connectedCallback() {
        this.$regForm.onsubmit = (event) => {
            event.preventDefault();
            console.log("Register form submitted");
            
            let isPassed =  this.$name.validate(value => {
                return value != '';
            }, "Invalid Name") &

            this.$email.validate(value => {
                return value != '';
            }, "Invalid Email") &

            this.$password.validate(value => {
                return value != '';
            }, "Invalid Password") &
            
            this.$passwordCf.validate(value => {
                return value != '';
            }, "Invalid Password Confirmation") && 

            this.$passwordCf.validate(value => {
                return value == this.$password.value;
            }, "Password is not match");
            
            let data = {
                name: this.$name.value,
                email: this.$email.value,
                password: this.$password.value,
            };

            if(isPassed) {
                register(data.name, data.email, data.password);  
            }
        }
    }
}

window.customElements.define('register-form', RegisterForm);