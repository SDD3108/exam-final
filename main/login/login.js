const login = document.querySelector('.login')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const btn = document.querySelector('.reg-btn')

class Log{
    constructor(){
        this.arr = JSON.parse(localStorage.getItem('users')) || []
    }
    login(login,email,password){
        const found = this.arr.find(user => user.log == login && user.pass == password && user.mail == email)
        if(found){
            localStorage.setItem('name',JSON.stringify(found));
            window.location.href = '../main/index.html'
        }
        else{
            this.toMessage('пароль или логин не верный')
            // alert()
        }
    }
    valueCheck(){
        const local = JSON.parse(localStorage.getItem('name'))
        console.log(local);
        if(local){
            login.value = local.log
            email.value = local.mail
            password.value = local.pass   
        }
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
const log = new Log()
log.valueCheck()
btn.addEventListener('click',()=>{
    const one = login.value
    const two = email.value
    const three = password.value
    if(one && two && three){
        log.login(one,two,three)
    }
    else{
        // alert()
        log.toMessage('заполни все поля')
    }
})
// localStorage.removeItem('users')