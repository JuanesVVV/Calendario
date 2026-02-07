const monthDisplay = document.getElementById('monthDisplay');
const daysContainer = document.getElementById('calendarDays');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let date = new Date();

function renderCalendar() {
    daysContainer.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();

    // Nombre del mes
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
    monthDisplay.innerText = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

    // Primer día del mes (0 = domingo, 1 = lunes...)
    let firstDayIndex = new Date(year, month, 1).getDay();
    // Ajuste para que la semana empiece en Lunes
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const lastDay = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // Espacios vacíos para los días antes del día 1
    for (let x = 0; x < firstDayIndex; x++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    // Dibujar los días
    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.innerText = i;
        
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }
        
        daysContainer.appendChild(dayDiv);
    }
}

prevBtn.addEventListener('click', () => { date.setMonth(date.getMonth() - 1); renderCalendar(); });
nextBtn.addEventListener('click', () => { date.setMonth(date.getMonth() + 1); renderCalendar(); });

renderCalendar();