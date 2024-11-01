const userName = document.querySelector('.name')
const login = document.querySelector('.login')
const email = document.querySelector('.email')
const passwordOne = document.querySelector('.passwordOne')
const passwordTwo = document.querySelector('.passwordTwo')
const btn = document.querySelector('.reg-btn')
const checkbox = document.querySelector('.checkbox')

class Reg{
    constructor(){
        this.arr = JSON.parse(localStorage.getItem('users')) || []
    }
    person(name,login,email,password){
        const obj = {
            id: Math.floor(Math.random() * 1000),
            nm: name,
            log:login,
            mail: email,
            pass: password,
        }
        this.arr.push(obj)
        this.localStorage()
        localStorage.setItem('name',JSON.stringify(obj))
        window.location.href = '../login/login.html'
        console.log(this.arr);
    }
    checking(password){
        const toCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return toCheck.test(password)
    }
    checkingLogin(login,email){
        return this.arr.some(user => user.log === login || user.mail === email)
    }
    localStorage(){
        localStorage.setItem('users',JSON.stringify(this.arr))
    }
    toMessage(sms){
        const container = document.querySelector('.reg__notification-container')
        const notification = document.createElement('div')
        notification.classList.add('reg__notification')
        notification.textContent = sms
        container.append(notification)
        setTimeout(() => {
            notification.classList.add('show')
        },100);
        setTimeout(()=>{
            notification.classList.remove('show')
            notification.addEventListener('transitionend',()=>{
                notification.remove()
            })
        },3000);
    }
}
const reg = new Reg()
btn.addEventListener('click',()=>{
    console.log(JSON.parse(localStorage.getItem('users')));
    const one = login.value
    const two = email.value
    const four = userName.value
    const lol = passwordOne.value
    const lel = passwordTwo.value
    console.log(lol);    
    let  three = ``
    if(lol == lel){
        three = `${lol}`
        console.log(three);
        if(!reg.checking(three)){
            reg.toMessage('ты не правильно заполнил пароль')
            return
        }
    }
    else {
        reg.toMessage('пароли не совпадают')
        return
    }
    if(!one || !two || !lol || !lel || !four){
        reg.toMessage('заполни все поля')
        return
    }
    else if(reg.checkingLogin(one,two)){
        reg.toMessage('этот логин занят')
        return
    }
    reg.person(four,one,two,three)
})
checkbox.addEventListener('change',()=>{
    if(passwordOne.type == 'password' && passwordTwo.type == 'password'){
        passwordOne.type = 'text'
        passwordTwo.type = 'text'
    }
    else{
        passwordOne.type = 'password'
        passwordTwo.type = 'password'
    }
})
// reg.person()
// P@ssw0rd2024!
// Aa1@bcde