const blocks = document.querySelector('.blocks')
const basket = document.querySelector('.basket')
const accountBtn = document.querySelector('.account')
const btn = document.querySelector('.btn')
const search = document.querySelector('.search')
const select = document.querySelector('.select')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const burgerCheckbox = document.getElementById('burger-checkbox')
const menuList = document.querySelector('.menu-list')
const burger = document.querySelector('.burger')
const menuItems = document.querySelectorAll('.menu-item')
const leaveBtn = document.querySelector('.leave')
const nick = document.querySelector('.nick')
const accountBtnLink = document.querySelector('.account-btn')
const accountItemsBtn = document.querySelector('.account-items-btn')
const items = document.querySelector('.item')
const carouselContainer = document.querySelector('.carousel-track')
const hello = document.querySelector('.hello')
const home = document.querySelector('.home')
const sectionFirst = document.querySelector('.section-first')
const sound = document.getElementById('sound')

class Main{
    constructor(){
        // this.normName = JSON.parse(localStorage.getItem('name'))
        // this.users = JSON.parse(localStorage.getItem('arr'))
        // this.normUser = this.users.find(user => user.name == this.normName)
        // this.basketKey = `basket_${this.normUser?.log}`
        this.arr = JSON.parse(localStorage.getItem('products')) || []
        this.currentPage = 1
        this.itemsPerPage = this.toAdaptive()
        this.filteredArr = [...this.arr]
        this.totalPages = Math.ceil(this.filteredArr.length / this.itemsPerPage)
        // this.prices = []
    }
    toApi(){
        // fetch(`https://fakestoreapi.com/products`)
        fetch(`https://dummyjson.com/products`)
        .then(response => response.json())
        .then(answer => {
            console.log(answer.products);
            this.arr = answer.products
            this.toLocalStorage()
            this.render(this.arr)
            // this.toSlider(answer.product.images[0])
        })
    }
    render(answer = this.filteredArr){
        blocks.innerHTML = ''
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        // const paginated = this.arr.slice(start,end) || answer
        // const paginated = this.filteredArr.slice(start,end)
        let imgArr = []
        const paginated = answer.slice(start,end)
        paginated.forEach(element => {
            const block = document.createElement('div')
            // const imgArr = []
            block.classList.add('block')
            blocks.append(block)
            block.innerHTML += `
                <img src="${element.images[0]}" class="imgs" alt="${element.title}">
                <h2 class="product__title">${element.title}</h2>
            `, imgArr.push(element.images[0]);
            // block.innerHTML += imgArr.push(element.images[0])
            const priceAndBasket = document.createElement('div')
            priceAndBasket.classList.add('priceAndBasket')
            block.append(priceAndBasket)
            priceAndBasket.innerHTML += `
                <h2 class="product__price">${Math.ceil(element.price)}$</h2>
                <button class="basket-btn" id="btn-${element.id}">В Корзину</button>
            `
            
            // console.log(imgArr);
            this.toSlider(imgArr)
            this.toPush(element.id,element.images[0],element.title,element.brand,element.rating,element.price,element.description,element.category)
        });
        this.toPagination()
    }
    toSlider(images){
        console.log(images.length);
        
        carouselContainer.innerHTML = ''
        const totalImg = images.slice(0,6)
        totalImg.forEach((image, index) => {
            const itemDiv = document.createElement('img')
            carouselContainer.append(itemDiv)
            itemDiv.className = `carousel-items item${index + 1}`
            itemDiv.src = image
            // console.log(index);
        })
    }
    toUp(){
        // const sort = [...this.arr].sort((a, b) => a.price - b.price)
        // this.render(sort)
        this.filteredArr.sort((a, b) => a.price - b.price)
        this.currentPage = 1
        this.totalPages = Math.ceil(this.filteredArr.length / this.itemsPerPage)
        this.render()
    }
    toDefault(){
        // this.render(this.arr)
        this.currentPage = 1
        this.render(this.arr)
        console.log(this.currentPage);
        
    }
    toDown(){
        // const sort = [...this.arr].sort((a, b) => b.price - a.price)
        // this.render(sort)
        this.filteredArr.sort((a, b) => b.price - a.price)
        this.currentPage = 1
        this.totalPages = Math.ceil(this.filteredArr.length / this.itemsPerPage)
        this.render()
    }
    toSearch(value){
        // // почемуто код правильный,вроде. но при этом он не работает
        // const filtered = this.arr.filter(element => element.title.startsWith(value) || element.title.includes(value))
        // // const filtered = this.arr.filter(element => element.title.includes(value))
        // console.log(this.filteredArr);
        // this.render(filtered)
        // this.filteredArr = this.arr.filter(element => element.title.startsWith(value) || element.title.includes(value))
        this.filteredArr = this.arr.filter(element => element.title.toLowerCase().includes(value.toLowerCase()))
        this.currentPage = 1
        this.totalPages = Math.ceil(this.filteredArr.length / this.itemsPerPage)
        this.render()
        if(this.filteredArr.length == 0){
            const text = document.createElement('div')
            text.classList.add('empty-search')
            blocks.append(text)
            text.innerHTML = `
            <h1> ничего не найдено </h1>
            `
            // text.textContent = 'ничего не найдено'
        }
        console.log(this.filteredArr);
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
    toPush(id,img,title,brand,rating,price,description,category){
        const btn = document.getElementById(`btn-${id}`)
        btn.addEventListener('click',()=>{
            const user = JSON.parse(localStorage.getItem('name'))
            if(!user){
            // alert('сначала нужно войти в аккаунт, чтобы добавить в корзину') // change
            this.toMessage('сначала нужно войти в аккаунт, чтобы добавить в корзину')
            window.location.href = '../registration/registration.html'
            }
            else{
                const leel = 1
                const obj = {
                        ids: id,
                        img: img,
                        title: title,
                        pieces: leel,
                        brand: brand,
                        rating: rating,
                        price: price,
                        description: description,
                        category:category,
                }
                const basketKey = `key-${user.id}`
                let basketArr = JSON.parse(localStorage.getItem(basketKey)) || []
                const checking = basketArr.find(element => element.ids == obj.ids)
                if(checking){
                    console.log(this.arr);
                    checking.pieces += leel
                    this.toMessage(`now ${title} addded untill ${checking.pieces}`)
                    // showNotification(`now ${title} addded untill ${checking.pieces}`)
                }
                else{
                    console.log(this.arr);
                    basketArr.push(obj)
                    this.toMessage(`product ${title} added to the basket`)
                    // showNotification(`product ${title} added to the basket`)
                }
                localStorage.setItem(basketKey, JSON.stringify(basketArr))
                // }
                // this.toLocalStorage()
            }
        })
    }
    toMessage(sms){
        const container = document.querySelector('.notification-container')
        const notification = document.createElement('div')
        notification.classList.add('notification')
        notification.textContent = sms
        container.append(notification)
        setTimeout(()=>{
            notification.classList.add('show')
        },100);
        setTimeout(()=>{
            notification.classList.remove('show')
            notification.addEventListener('transitionend',()=>{
                notification.remove()
            })
        },3000);
    }
    toLocalStorage(){
        localStorage.setItem('products',JSON.stringify(this.arr))
    }
    toAdaptive(){
        return window.innerWidth < 769 ? 6 : 6
    }
    toPagination() {
        const pageInfo = document.querySelector('.page-info')
        const prevButton = document.querySelector('.prev')
        const nextButton = document.querySelector('.next')
        pageInfo.textContent = `Страница ${this.currentPage} из ${this.totalPages}`
        prevButton.disabled = this.currentPage == 1
        nextButton.disabled = this.currentPage == this.totalPages
    }
    prevPage(){
        if(this.currentPage > 1){
            this.currentPage--
            this.render()
        }
    }
    nextPage(){
        if(this.currentPage < this.totalPages){
            this.currentPage++
            this.render()
        }
    }
    updatePage(){
        const newItemsPerPage = this.toAdaptive()
        if(newItemsPerPage !== this.itemsPerPage){
            this.itemsPerPage = newItemsPerPage
            this.totalPages = Math.ceil(this.arr.length / this.itemsPerPage)
            this.currentPage = 1
            this.render()
        }
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
        const user = JSON.parse(localStorage.getItem('name'))
        if(user && user.log){
            nick.textContent = `${user.log.toUpperCase()}`
        }
        else{
            nick.textContent = 'NICK'
        }
    }
    basketItems(){
        const currentUser = JSON.parse(localStorage.getItem('name')) || []
        const key = `key-${currentUser.id}`
        const arr = JSON.parse(localStorage.getItem(key)) || []
        // accountItemsBtn.textContent = 'basket is empty'
        console.log(currentUser);
        if(currentUser.length == 0){
            accountItemsBtn.textContent = 'basket is empty'
        }
        else if(currentUser && currentUser !== Array){
            accountItemsBtn.textContent = `number of items in the basket: ${arr.length}`
        }
    }
    toAccountRegLeave(){
        const user = JSON.parse(localStorage.getItem('name'));
        if(user && user.nm){
            leaveBtn.textContent = 'leave'
        }
        else{
            leaveBtn.textContent = 'login / registration'
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
const main = new Main()
main.toApi()
// main.render(JSON.parse(localStorage.getItem('products')) || [])
main.render()
main.toHello()
main.toNick()
main.basketItems()
main.toAccountRegLeave()

basket.addEventListener('click',()=>{
    // basket/basket.js
    window.location.href = '../basket/basket.html'  
})
accountBtn.addEventListener('mouseover',()=>{
    const user = JSON.parse(localStorage.getItem('name')) || []
    if(user && user.nm){
        hello.textContent = 'выйти'
        // localStorage.removeItem('name')
        // main.toMessage('Вы вышли из аккаунта') 
        // window.location.href = '.index.html'
    }
    else if(user && user !== Array){
        hello.textContent = 'войти'
        // window.location.href = '.registration.html'
    }
})
// mouse
accountBtn.addEventListener('mouseout',()=>{
    main.toHello()
})
accountBtn.addEventListener('click',()=>{
    const user = JSON.parse(localStorage.getItem('name')) || []
    if(user && user.nm){
        // hello.textContent = 'выйти'
        localStorage.removeItem('name')
        main.toMessage('Вы вышли из аккаунта')
        setTimeout(() => {
            window.location.href = '../main/index.html'
        }, 4000);
    }
    else{
        // hello.textContent = 'войти'
        window.location.href = '../registration/registration.html'
    }
})
leaveBtn.addEventListener('click',()=>{
    const user = JSON.parse(localStorage.getItem('name'));
    if(user && user.nm){
        localStorage.removeItem('name')
        main.toMessage('Вы вышли из аккаунта') 
        // hello.textContent = 'Hi гость'
        window.location.href = '../main/index.html'
    }
    else{
        window.location.href = '../registration/registration.html'
    }
})
select.addEventListener('change',(e)=>{
    console.log(e);
    console.log(select.value);
    const trueValue = select.value
    if(trueValue == 'По Нарастанию цены'){
        main.toUp()
    }
    else if(trueValue == 'По Убыванию цены'){
        main.toDown()
    }
    else if(trueValue == 'По Умолчанию'){
        main.toDefault()
    }
    // main.toFilter(select.value)
})
btn.addEventListener('click',()=>{
    const value = search.value
    main.toSearch(value)
})
menuItems.forEach(item =>{
    item.addEventListener('click',()=>{
        burgerCheckbox.checked = false
        main.toMenu()
    })
})
burgerCheckbox.addEventListener('change', main.toMenu)
accountBtnLink.addEventListener('click',()=>{
    const user = JSON.parse(localStorage.getItem('name'));
    if(user && user.nm){
        window.location.href = '../account/account.html'
    }
    else{
        main.toMessage('Сначало надо Зарегистрироваться или Войти')
        setTimeout(() => {
            window.location.href = '../registration/registration.html'
        }, 4000);
        
    }
})
home.addEventListener('click',()=>{
    sectionFirst.scrollIntoView({behavior: 'smooth'})
})
hello.addEventListener('click',()=>{
    main.toSound()
})

prev.addEventListener('click',()=> main.prevPage());
next.addEventListener('click',()=> main.nextPage());
window.addEventListener('resize',()=> main.updatePage())

//     
//     // 
//     // blocks.innerHTML = ''
//     lol.forEach(element => {
//         const title = element.title
//         if(title.includes(value)){
//             const block = document.createElement('div')
//             block.classList.add('block')
//             blocks.append(block)
//             block.innerHTML += `
//             <img src="${element.images[0]}">
//             <button id="btn-${element.id}">basket</button>
//             `
//             this.toPush(element.id,element.images[0],element.title)
//         }
//     })
// })
// localStorage.removeItem('undefined')

// localStorage.removeItem('notes')
// P@ssw0rd2024!

// $(document).ready(function(){
//     function showNotification(sms){
//         const notification = $(`<div class="notification"></div>`).text(sms)
//         $('.notification-container').append(notification)
//         notification.addClass('show')
//         setTimeout(() => {
//             notification.removeClass('show')
//             setTimeout(() => {
//                 notification.remove()
//             },500)
//         },3000);
//     }
// })

$(function(){
    $('.footer-links-holder h3').click(function(){
        $(this).parent().toggleClass('active')
    })
})
$(document).ready(function(){
    $(".accordion-titel").click(function(){
        $(this).parent(".accordion-item").find(".accordion-contant").slideToggle()
        $(this).parent(".accordion-item").prevAll(".accordion-item").find(".accordion-contant").slideUp()
        $(this).parent(".accordion-item").nextAll(".accordion-item").find(".accordion-contant").slideUp()
    })
})

// $(document).ready(function(){
//     console.log('lol');
//     $('.basket-btn').addClass('pulse')
//     $('.basket-btn').on('click',function(){
//         $('.basket-btn').removeClass('pulse')
//         console.log('Button clicked, removing pulse class')
//         setTimeout(()=>{
//             $('.basket-btn').addClass('pulse')
//             console.log('Re-adding pulse class')
//         },2000)
//     })
// })

$(document).ready(function(){
    setInterval(function(){
        $('.basket-btn').css({
            transform: 'scale(1.1)',
        })
        $('.btn').css({
            transform: 'scale(1.1)',
        })
        setTimeout(function(){
            $('.basket-btn').css({
                transform: 'scale(1)',
            })
            $('.btn').css({
                transform: 'scale(1)',
            })
        }, 300)
    }, 600)
    $('.basket-btn' && '.btn').click(function(){
        $('.basket-btn').css({
            transform: 'scale(0)'
        })
    })
})

// $(document).ready(function(){
//     function pulse(){
//       $('.basket-btn').animate({
//         width: '+=10px',
//         height: '+=10px',
//         opacity: 0.8
//       },500).animate({
//         width: '-=10px',
//         height: '-=10px',
//         opacity: 1
//       }, 500, pulse)
//     }
//     pulse()
// })

// $(document).ready(function(){
//     // console.log('lol');
//     // const $left= $('#left')
//     // const $right= $('#right')
//     // const $items= $('.carousel__item')
//     const $items= $('.carousel__item')
//     let index = 0
//     function show(){
//         $items.each(function(id,value){
//             $(value).toggleClass('active',id == index)
//             // console.log(value);
//             console.log(`item ${id} active: ${$(value).hasClass('active')}`);
//             if($(value).hasClass('active') == true){
//                 // $(`item${id}`).show()
//                 $('.carousel__item').show()
//                 // $(value).removeClass('active')
//                 // console.log('lel');
                
//             }
//         })
//     }
//     $('#left').click(function(){
//         if(index > 0){
//             index--
//             show()
//         }
//     })
//     $('#right').click(function(){
//         if(index < $items.length - 1){
//             index++
//             show()
//         }
//     })
//     show()
// })

$(document).ready(function(){
    const $carouselItems = $('.carousel-items')
    const width = $carouselItems.outerWidth()
    console.log(width);
    console.log($carouselItems.length);
    
    let num = 0

    $('#next').on('click',function(){
        if(num < $carouselItems.length - 1){
            num++
            console.log(num);
            $('.carousel-track').css('transform',`translateX(-${width * num}px)`)
        }
        else{
            num = 0
            $('.carousel-track').css('transform', `translateX(0px)`)
        }
        // $carouselTrack.css('transform',`translateX(-${width * num}px)`)
    })
    $('#prev').on('click',function(){
        if(num > 0){
            num--
            console.log(num);
            $('.carousel-track').css('transform',`translateX(-${width * num}px)`)
        }
        else{
            num = $carouselItems.length - 1
            console.log(num);
            
            $('.carousel-track').css('transform', `translateX(-${width * num}px)`)
        }
        // $carouselTrack.css('transform',`translateX(-${width * num}px)`)
    })
})

$(document).ready(function() {
    let numbed = 0
    const width = $('.carousel-items').outerWidth()
    const itemsLength = $('.carousel-items').length

    function showSlide(index) {
        // const translateX = -index * width
        $('.carousel-track').css('transform', `translateX(${-index * width}px)`)
    }
    function autoScroll(){
        numbed = (numbed + 1) % itemsLength
        showSlide(numbed)
    }
    setInterval(autoScroll, 3000)
})

// $(document).ready(function() {
//     let currentIndex = 0;
//     const items = $('.slider__item');
//     const itemCount = items.length;
//     $(items[currentIndex]).addClass('active').show();

//     $('#next').click(function() {
//         $(items[currentIndex]).removeClass('active').slideUp(400, function() {
//             currentIndex = (currentIndex + 1) % itemCount; // Увеличиваем индекс
//             $(items[currentIndex]).addClass('active').slideDown(400);
//         });
//     });

//     $('#prev').click(function() {
//         $(items[currentIndex]).removeClass('active').slideUp(400, function() {
//             currentIndex = (currentIndex - 1 + itemCount) % itemCount; // Уменьшаем индекс
//             $(items[currentIndex]).addClass('active').slideDown(400);
//         });
//     });
// });
