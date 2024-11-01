const back = document.querySelector('.home')
const blocks = document.querySelector('.basket-blocks')
const buy = document.querySelector('.buy')
const sum = document.querySelector('.sum')
const accountBtn = document.querySelector('.account')
const empty = document.createElement('div')
const menuItems = document.querySelectorAll('.menu-item')
const burgerCheckbox = document.getElementById('burger-checkbox')
const menuList = document.querySelector('.menu-list')
const hello = document.querySelector('.hello')
const nick = document.querySelector('.nick')
const accountBtnLink = document.querySelector('.account-btn')
const accountItemsBtn = document.querySelector('.account-items-btn')
const sound = document.getElementById('sound')

const currentUser = JSON.parse(localStorage.getItem('name'))
const key = `key-${currentUser.id}`
const arr = JSON.parse(localStorage.getItem(key)) || []

class Basket{
    constructor(){
        // this.currentUserName = JSON.parse(localStorage.getItem('name'))
        // this.users = JSON.parse(localStorage.getItem('products'))
        // this.currentUser = this.users.find(user => user.name === this.currentUserName)
        // this.basketKey = `basket_${this.currentUser?.log}`
        // this.arr = JSON.parse(localStorage.getItem(this.basketKey)) || []
        this.currentUser = JSON.parse(localStorage.getItem('name')) || []
        this.key = `key-${this.currentUser.id}`
        this.arr = JSON.parse(localStorage.getItem(this.key)) || []
    }
    basketItems(){
        const basketPieces = this.arr.length
        // localStorage.setItem('')
        console.log(basketPieces);
    }
    render(){
        console.log(this.arr);
        blocks.innerHTML = ''
        this.arr.forEach(element => {
            const block = document.createElement('div')
            block.id = `basket-block-${element.ids}`
            block.classList.add('basket__block')
            blocks.append(block)
            const blockOne = document.createElement('div')
            const blockTwo = document.createElement('div')
            blockOne.classList.add('block__one')
            blockTwo.classList.add('block__two')
            block.append(blockOne,blockTwo)
            blockOne.innerHTML += `
            <img class="images" src="${element.img}">
            `
            const information = document.createElement('div')
            information.classList.add('information')
            // block.append(information)
            blockOne.append(information)
            information.innerHTML += `
            <h2> ${element.title} </h2>
            <h2> Brand: ${element.brand} </h2>
            <h2 class="basket__rating"><img src="/img/basket/star.png" class="star" alt="star"> ${element.rating} </h2>
            <h2> ${element.price}$ </h2>
            `
            const toPieces = document.createElement('div')
            information.append(toPieces)
            toPieces.classList.add('pieces')
            toPieces.innerHTML += `
            <button class="minus btns" data-ids="${element.ids}"> - </button>
            <h2> ${element.pieces} </h2>
            <button class="plus btns" data-ids="${element.ids}"> + </button>
            `
            const description = document.createElement('div')
            description.classList.add('block__description')
            blockTwo.append(description)
            description.innerHTML += `
            <div class="accordion-basket">
                <button class="accordion-header-${element.ids} accordion-header">description</button>
                <div class="accordion-content-${element.ids} accordion-content">
                    <p>описание: ${element.description}</p>
                    <h3>категория: ${element.category} </h3>
                </div>
            </div>
            `
            const delate = document.createElement('div')
            delate.classList.add('delete')
            blockTwo.append(delate)
            delate.innerHTML += `
            <button id="delete-${element.ids}" class="delete__btn"> Удалить </button>
            `
            this.toDescription(element.ids)
            this.toDeleteBtn(element.ids)            
        });
        this.toHello()
        this.plus()
        this.minus()
        this.updateTotalSum()
    }
    toDeleteBtn(id){
        const delateBtn = document.getElementById(`delete-${id}`)
        delateBtn.addEventListener('click',()=> this.toDelete(id));
    }
    toDescription(id){
        const accordionHeader = document.querySelector(`.accordion-header-${id}`)
        const accordionContent = document.querySelector(`.accordion-content-${id}`)
        accordionHeader.addEventListener('click',()=>{
            if(accordionContent.classList.contains('active')){
                accordionContent.style.height = 0
                accordionContent.classList.remove('active')
            }
            else{
                accordionContent.style.height = 160 + 'px'
                accordionContent.classList.add('active')
            }
        })
    }
    plus(){
        const plus = document.querySelectorAll('.plus')
        plus.forEach(element=>{
            element.addEventListener('click',(e)=>{
                const ids = e.target.getAttribute('data-ids')
                const index = this.arr.findIndex(item => item.ids == ids)
                if(index !== -1){
                    this.arr[index].pieces++
                    this.localStorage()
                    this.render()
                }
            })
        })
    }
    minus(){
        const minus = document.querySelectorAll('.minus')
        minus.forEach(element=>{
            element.addEventListener('click',(e)=>{
                const ids = e.target.getAttribute('data-ids')
                // const deleteBlock = document.getElementById(`basket-block-${ids}`)
                const index = this.arr.findIndex(item => item.ids == ids)
                if(index !== -1){
                    if(this.arr[index].pieces > 1){
                        this.arr[index].pieces--
                        console.log(this.arr[index].pieces);
                        this.localStorage()
                        this.render()
                        // this.localStorage()
                        // this.render()
                        // if(this.arr[index].pieces == 0){
                        //     this.toDelete(ids)
                        // }
                        // else{
                        //     this.localStorage()
                        // }
                        // 
                    } 
                }
            })
        })
    }
    toDelete(id){
        const deleteBlock = document.getElementById(`basket-block-${id}`)
        if(deleteBlock){
            deleteBlock.remove()
        }
        this.arr = this.arr.filter(note => note.ids !== id)
        this.localStorage()
    }
    vvvv(){
        const currentUser = JSON.parse(localStorage.getItem('name'))
        const key = `key-${currentUser.id}`
        localStorage.removeItem(key)
    }
    localStorage(){
        // localStorage.setItem('products',JSON.stringify(this.arr))
        const currentUser = JSON.parse(localStorage.getItem('name'))
        const key = `key-${currentUser.id}`
        if(this.arr.length > 0){
            localStorage.setItem(key, JSON.stringify(this.arr))
        }
        else{
            localStorage.removeItem(key)
        }
        // localStorage.setItem(key, JSON.stringify(this.arr))
        console.log(this.arr);
    }
    toBuy(){
        blocks.innerHTML = ''
        this.arr = []
        this.localStorage()
    }
    calculateTotalSum(){
        return this.arr.reduce((sum, item) => sum + (item.price * item.pieces),0)
    }
    updateTotalSum(){
        const totalSum = this.calculateTotalSum()
        sum.innerHTML = `Итоговая Сумма: ${Math.ceil(totalSum)}$`
    }
    toHello(){
        const user = JSON.parse(localStorage.getItem('name'))
        if(user){
            hello.textContent = `Hi ${user.nm}`
        }
        else if(!user || user == undefined){
            hello.textContent = 'Hi гость'
        }
    }
    noAccountOrEmpty(){
        empty.classList.add('empty')
        if(!this.currentUser){
            blocks.append(empty)
            empty.innerHTML = `
            <h2> чтоб добавить товар в корзину вам нужно авторизоваться </h2>
            `
        }
        else if(this.arr.length == 0){
            blocks.append(empty)
            empty.innerHTML = `
            <h2> корзина пуста </h2>
            `
        }
    }
    toMessage(sms){
        const container = document.querySelector('.basket__notification-container')
        const notification = document.createElement('div')
        notification.classList.add('basket__notification')
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
    toMenu(){
        if(burgerCheckbox.checked){
          menuList.style.transform = 'translateX(0)'
        }
        else{
          menuList.style.transform = 'translateX(100%)'
        }
    }
    toNick(){
        if(currentUser && currentUser.nm){
            nick.textContent = `${currentUser.log.toUpperCase()}`
        }
        else{
            nick.textContent = 'NICK'
        }
    }
    toBasketItems(){
        accountItemsBtn.textContent = `number of items in the basket: ${this.arr.length}`
        if(this.arr.length == 0){
            accountItemsBtn.textContent = 'basket is empty'
        }
    }
    toSound(){
        sound.volume = 1;
        if (sound.paused) {
            sound.play();
        }
        else {
            sound.pause();
        }
    }
}
const basket = new Basket()
basket.render()
basket.updateTotalSum()
basket.noAccountOrEmpty()
basket.toNick()
basket.toBasketItems()
back.addEventListener('click',()=>{
    window.location.href = '../main/index.html'
})
buy.addEventListener('click',()=>{
    if(arr.length !== 0){
        basket.toBuy()
        window.location.href = '../buying/buying.html'
    }
    else{
        basket.toMessage('сначала добавьте товар в корзину')
    }
})
accountBtn.addEventListener('mouseover',()=>{
    const user = JSON.parse(localStorage.getItem('name'))
    if(user && user.nm){
        hello.textContent = 'выйти'
    }
    else{
        hello.textContent = 'войти'
        // window.location.href = '.registration.html'
    }
})
accountBtn.addEventListener('mouseout',()=>{
    const user = JSON.parse(localStorage.getItem('name'))
    if(user && user.nm){
        hello.textContent = `Hi ${user.nm}`
    }
    else{
        hello.textContent = 'Hi гость'
    }
})
accountBtn.addEventListener('click',()=>{
    const user = JSON.parse(localStorage.getItem('name'));
    if(user && user.nm){
        localStorage.removeItem('name')
        // alert('Вы вышли из аккаунта') // change
        basket.toMessage('Вы вышли из аккаунта')
        hello.textContent = 'Hi гость'
        window.location.href = '../main/index.html'
    }
    else{
        window.location.href = '../registration/registration.html'
    }
})
menuItems.forEach(element =>{
    element.addEventListener('click',()=>{
        burgerCheckbox.checked = false
        basket.toMenu()
    })
})
accountBtnLink.addEventListener('click',()=>{
    if(currentUser && currentUser.nm){
        window.location.href = '../account/account.html'
    }
    else{
        basket.toMessage('Сначало надо Зарегистрироваться или Войти')
        setTimeout(() => {
            window.location.href = '../registration/registration.html'
        }, 4000);
    }
})
burgerCheckbox.addEventListener('change', basket.toMenu)
hello.addEventListener('click',()=>{
    basket.toSound()
})

// const currentUser = JSON.parse(localStorage.getItem('name'))
// const key = `key-${currentUser.id}`
// const arr = JSON.parse(localStorage.getItem(key)) || []
// if(arr.length == 0){
//     const empty = document.createElement('div')
//     empty.classList.add('empty')
//     blocks.append(empty)
//     empty.innerHTML = `
//     <h2> корзина пуста </h2>
//     `
// }
// document.getElementById(`delete-${id}`).addEventListener('click',()=>{
//     basket.toDelete()
// })
// document.addEventListener("DOMContentLoaded",()=>{
//     const accordionHeader = document.querySelector('.accordion-header')
//     const accordionContent = document.querySelector('.accordion-content')
//     accordionHeader.addEventListener('click',()=>{
//         if(accordionContent.classList.contains('active')){
//           accordionContent.style.height = 0
//           accordionContent.classList.remove('active')
//         }
//         else{
//           accordionContent.style.height = accordionContent.scrollHeight + "px"
//           accordionContent.classList.add('active')
//         }
//     })
// })