let timeCont = document.querySelector("#timeCont") as HTMLDivElement;
window.onload = () => {

    setInterval(curTime, 1000);
    
    function curTime() {
        const date = new Date();
        let time = date.toLocaleTimeString();
        timeCont.innerHTML = `<span class="tracking-widest">${time}</span>`;
    }
};