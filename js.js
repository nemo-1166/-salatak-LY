let fixedNav = document.querySelector('.header');
window.addEventListener("scroll",()=>{
    window.scroll > 100 ? fixedNav.classList.add('active'): fixedNav.classList.remove('active');
})


let SurahsCont = document.querySelector('.s-cont')
getSurahs()
function getSurahs(){
    fetch("https://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data=>{
        let surahs = data.data.surahs.references;
        let number = 114;
        SurahsCont.innerHTML = "";
        for (let i = 0; i < number; i++){
            SurahsCont.innerHTML +=
            `<div class="surah">
                    <p> ${surahs[i].name}</p>
                    <p>${surahs[i].englishName}</p>
                </div>`
        }

        let SurahsName = document.querySelectorAll('.surah');
        console.log(SurahsName)
        let popup = document.querySelector('.surahpopup'),
             AyatContainer = document.querySelector('.ayat-quran');
        SurahsName.forEach((name,index)=>{
            name.addEventListener('click',()=>{
                fetch(`https://api.alquran.cloud/v1/surah/${index+1}`)
                .then(response => response.json())
                .then(data=>{
                    AyatContainer.innerHTML = "";
                    let Ayat = data.data.ayahs;
                    Ayat.forEach(a=>{
                        popup.classList.add('active');
                        AyatContainer.innerHTML +=`
                        <p>(${a.numberInSurah}) - ${a.text}</p>
                        `
                    })
                })
            })
        })

        let closePopup = document.querySelector('.close');
        closePopup.addEventListener('click',()=>{
        popup.classList.remove('active');
        })
     })
}


let cards = document.querySelector('.cards');
getTime();
function getTime(){
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Ajdabiya&country=libya&method=3")
    .then(response => response.json())
    .then(data =>{
        let timings = data.data.timings
        fillTime("fajr-time",timings.Fajr);
        fillTime("sunrise-time",timings.Sunrise);
        fillTime("dhuhr-time",timings.Dhuhr);
        fillTime("asr-time",timings.Asr);
        fillTime("maghrib-time",timings.Maghrib);
        fillTime("isha-time",timings.Isha);
           // khawla edit
        const city = 'Ajdabiy'; // اسم المدينة
        const country = 'Libya'; // اسم الدولة
        const method = 3; // طريقة رابطة العالم الإسلامي
        updatePrayerTimes();
        function updatePrayerTimes() {
            const today = new Date();
            // const we = today.getDate();
            const day = today.getDate();
            const month = today.getMonth() + 1; // الأشهر تبدأ من 0 في JavaScript
            const year = today.getFullYear();

            // URL لـ API مع البارامترات
            const url = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=${method}&month=${month}&year=${year}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const timings = data.data[day - 1].timings; // أوقات الصلاة لليوم الحالي
                    
                    const gregorianDate = data.data[day - 1].date.gregorian.date; // التاريخ الميلادي
                    const wek = data.data[day - 1].date.gregorian.weekday.en;

                    const hijriDated = data.data[day - 1].date.hijri.day; // التاريخ الهجري
                    const hijriDatem = data.data[day - 1].date.hijri.month.ar; // التاريخ الهجري
                    const hijriDatey = data.data[day - 1].date.hijri.year; // التاريخ الهجري
                    const wekk = data.data[day - 1].date.hijri.weekday.ar;

                    let mmm = wek + " " + gregorianDate;
                    let hhh = wekk + " " + hijriDated + " " + hijriDatem + " " + hijriDatey;
                    // تحديث التاريخ الميلادي والهجري في الصفحة
                    document.getElementById('m').textContent += mmm;
                    document.getElementById('h').textContent += hhh;



                })
                .catch(error => console.error('Error:', error));
        }

document.addEventListener('DOMContentLoaded', updatePrayerTimes);

// تحديث أوقات الصلاة تلقائيًا عند منتصف الليل
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        updatePrayerTimes();
    }
}, 60000); // فحص كل دقيقة

    })
}
    function fillTime(id,time){
        document.getElementById(id).innerHTML = time;
    }