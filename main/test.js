// // const burgerCheckbox = document.getElementById('burger-checkbox')
// // const menuList = document.querySelector('.menu-list')
// // const burger = document.querySelector('.burger')
// // const menuItems = document.querySelectorAll('.menu-item')

// // function toggleMenu() {
// //   if(burgerCheckbox.checked){
// //     menuList.style.transform = 'translateX(0)'
// //   }
// //   else{
// //     menuList.style.transform = 'translateX(100%)'
// //   }
// // }
// // menuItems.forEach(item =>{
// //   item.addEventListener('click',()=>{
// //     burgerCheckbox.checked = false
// //     toggleMenu()
// //   })
// // })
// // burgerCheckbox.addEventListener('change', toggleMenu)

// $(document).ready(function(){
//   $('#toggleContent').click(function(){
//       $('.content__content').slideToggle(500)
//   })
//   $('#fadeIn').click(function(){
//       $('.content__content').fadeIn(500)
//   })
//   $('#fadeOut').click(function(){
//       $('.content__content').fadeOut(500)
//   })
// })

$(document).ready(function() {
    const $carouselTrack = $('.carousel-track');
    const $carouselItems = $('.carousel-items');
    const itemWidth = $carouselItems.outerWidth();
    let currentIndex = 0;

    $('#next').on('click', function() {
        if (currentIndex < $carouselItems.length - 1) {
            currentIndex++;
            $carouselTrack.css('transform', `translateX(-${itemWidth * currentIndex}px)`);
        }
    });

    $('#prev').on('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            $carouselTrack.css('transform', `translateX(-${itemWidth * currentIndex}px)`);
        }
    });
});