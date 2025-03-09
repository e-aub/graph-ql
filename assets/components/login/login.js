class Login {
    constructor() {
        document.querySelector("link[rel='stylesheet']").href = "/assets/styles/login.css";
        this.render();
    }
    async login(event, errorMessage){
        try{
            const response = await fetch("https://learn.zone01oujda.ma/api/auth/signin",{
                method: "POST",
                headers: {
                    "Authorization": `Basic ${btoa(event.target[0].value + ":" + event.target[1].value)}`
                }
            })
            const data = await response.json();
            if (!response.ok){
                throw new Error(data.error);
            }
            localStorage.setItem("token", data);
        }catch(error){
            console.log(error);
            errorMessage.style.display = "block";
        }
      }

    async render() {
        // Create container
        const loginContainer = document.createElement('div');
        loginContainer.className = 'login-container';
        
        // Create header
        const loginHeader = document.createElement('div');
        loginHeader.className = 'login-header';
        const heading = document.createElement('h1');
        heading.textContent = 'Login';
        loginHeader.appendChild(heading);
        
        // Create form
        const form = document.createElement('form');
        form.id = 'login-form';
        
        // Create username/email field
        const identifierGroup = document.createElement('div');
        identifierGroup.className = 'form-group';
        
        const identifierLabel = document.createElement('label');
        identifierLabel.htmlFor = 'identifier';
        identifierLabel.textContent = 'Username or Email';
        
        const identifierInput = document.createElement('input');
        identifierInput.type = 'text';
        identifierInput.id = 'identifier';
        identifierInput.name = 'identifier';
        identifierInput.required = true;
        
        identifierGroup.appendChild(identifierLabel);
        identifierGroup.appendChild(identifierInput);
        
        // Create password field
        const passwordGroup = document.createElement('div');
        passwordGroup.className = 'form-group';
        
        const passwordLabel = document.createElement('label');
        passwordLabel.htmlFor = 'password';
        passwordLabel.textContent = 'Password';
        
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        passwordInput.name = 'password';
        passwordInput.required = true;
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.id = 'error-message';
        errorMessage.textContent = 'Invalid credentials. Please try again.';
        
        passwordGroup.appendChild(passwordLabel);
        passwordGroup.appendChild(passwordInput);
        passwordGroup.appendChild(errorMessage);
        
        // Create submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'login-btn';
        submitButton.textContent = 'Sign In';
        
        // Create toggle section
        const toggleForm = document.createElement('div');
        toggleForm.className = 'toggle-form';
        
        
        // Assemble the form
        form.appendChild(identifierGroup);
        form.appendChild(passwordGroup);
        form.appendChild(submitButton);
        
        // Assemble the container
        loginContainer.appendChild(loginHeader);
        loginContainer.appendChild(form);
        loginContainer.appendChild(toggleForm);
        
        // Add event listeners
        form.addEventListener('submit', async function(event) {
          event.preventDefault();
          const identifier = identifierInput.value;
          const password = passwordInput.value;
          
          // Example validation - replace with your actual authentication logic
          if (identifier && password) {
            console.log('Login attempt:', { identifier, password });
            await this.login(event, errorMessage);
          } else {
            errorMessage.style.display = 'block';
          }
        }.bind(this));
    
        
        document.body.appendChild(loginContainer);
      }

     
}

export { Login };