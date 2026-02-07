const monthDisplay = document.getElementById('monthDisplay');
const daysContainer = document.getElementById('calendarDays');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const modal = document.getElementById('noteModal');
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNote');
const closeModalBtn = document.getElementById('closeModal');
const modalDateText = document.getElementById('modalDateText');

let date = new Date();
let selectedDayKey = "";

function renderCalendar() {
    daysContainer.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();

    // Formatear mes en español
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
    monthDisplay.innerText = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

    // Cálculo de días
    let firstDayIndex = new Date(year, month, 1).getDay();
    firstDayIndex = (firstDayIndex === 0) ? 6 : firstDayIndex - 1; // Ajuste a Lunes

    const lastDay = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // Días vacíos del mes anterior
    for (let x = 0; x < firstDayIndex; x++) {
        daysContainer.appendChild(document.createElement('div'));
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.innerText = i;
        const dayKey = `${year}-${month}-${i}`;

        // Es hoy?
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        // ¿Tiene nota guardada?
        if (localStorage.getItem(dayKey)) {
            dayDiv.classList.add('has-note');
        }

        // Click para abrir nota
        dayDiv.onclick = () => {
            selectedDayKey = dayKey;
            modalDateText.innerText = `Nota: ${i} ${monthName}`;
            noteInput.value = localStorage.getItem(dayKey) || "";
            modal.style.display = "flex";
            noteInput.focus();
        };
        
        daysContainer.appendChild(dayDiv);
    }
}

// Guardar en LocalStorage
saveNoteBtn.onclick = () => {
    if (noteInput.value.trim() === "") {
        localStorage.removeItem(selectedDayKey);
    } else {
        localStorage.setItem(selectedDayKey, noteInput.value);
    }
    modal.style.display = "none";
    renderCalendar();
};

// Cerrar Modal
closeModalBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

// Navegación
prevBtn.onclick = () => { date.setMonth(date.getMonth() - 1); renderCalendar(); };
nextBtn.onclick = () => { date.setMonth(date.getMonth() + 1); renderCalendar(); };

renderCalendar();