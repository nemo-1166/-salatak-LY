const all_count = document.querySelectorAll(".count")

all_count.forEach(count => {
    count.addEventListener('click', ()=> {
        let currentCount = parseInt(count.innerHTML);
        if(currentCount > 0) {
            currentCount-- ;
            count.innerHTML = currentCount
            if (currentCount === 0){
                count.classList.add('finish');
            }
        }
    })
})