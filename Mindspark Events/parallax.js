$(document).ready(function(){
    let stars = document.getElementById('stars');
    let moon = document.getElementById('moon');
    let mountain_behind=document.getElementById('mountains_behind');
    let btn=document.getElementById('btn');
    
    window.addEventListener('scroll', function(){
        let value=window.scrollY;
        stars.style.left = value*0.25 + 'px';
        moon.style.top = value*1.05 + 'px';
        mountain_behind.style.top = value*0.5 + 'px';
        text.style.marginTop= value*1.5 + 'px';
        btn.style.marginTop= value*1.5 + 'px';
    })
});