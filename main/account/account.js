const saveBtn = document.querySelectorAll('.change')
const nameInput = document.querySelector('.input-name')
const loginInput = document.querySelector('.input-login')
const emailInput = document.querySelector('.input-email')
const passwordInput = document.querySelector('.input-password')
const checkbox = document.querySelector('.checkbox')
const back = document.querySelector('.back-Home')

class Account{
    constructor(){
        this.localStorage()
    }
    localStorage(){
        const user = JSON.parse(localStorage.getItem('name')) || []
        nameInput.value = user.nm || ''
        loginInput.value = user.log || ''
        emailInput.value = user.mail || ''
        passwordInput.value = user.pass || ''
    }
    toSave(){
        const user = JSON.parse(localStorage.getItem('name')) || []
        const users = JSON.parse(localStorage.getItem('users')) || []
        const checking = users.find(u => u.id === user.id)
        if(checking){
            // checkbox.id =
            checking.nm = nameInput.value
            checking.log = loginInput.value
            checking.mail = emailInput.value
            checking.pass = passwordInput.value
        }
        localStorage.setItem('name', JSON.stringify(user))
        localStorage.setItem('users', JSON.stringify(users))
        // const obj = {
        //     id: user.id,
        //     nm: nameInput.value,
        //     log: loginInput.value,
        //     mail: emailInput.value,
        //     pass: passwordInput.value
        // }
        // localStorage.setItem('name', JSON.stringify(obj))
    }
    toButton(button){
        const input = button.previousElementSibling
        if(input.hasAttribute('readonly')){
            input.removeAttribute('readonly')
            button.textContent = 'save'
        }
        else{
            const login = loginInput.value
            const email = emailInput.value
            const password = passwordInput.value
            if(this.toChecking(login,email)){
                alert('этот логин или почта уже занят')
            }
            else if(!this.toCheckingPassword(password)){
                alert('ты не правильно заполнил пароль')
            }
            else{
                input.setAttribute('readonly',true)
                button.textContent = 'change'
                this.toSave()
            }
        }
    }
    toCheckingPassword(password){
        const toCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return toCheck.test(password)
    }
    toChecking(login,email){
        const allUsers = JSON.parse(localStorage.getItem('users'))
        return allUsers.some(user => user.log === login || user.mail === email)
    }
}
const account = new Account()
saveBtn.forEach(element => {
    element.addEventListener('click',()=> account.toButton(element))
});
checkbox.addEventListener('change',()=>{
    if(passwordInput.type == 'password'){
        passwordInput.type = 'text'
    }
    else{
        passwordInput.type = 'password'
    }
})
back.addEventListener('click',()=>{
    window.location.href ='../main/index.html'
})