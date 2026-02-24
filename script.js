let currentSeason = "s1";
let players = [];
let sortDirection = 1;

const seasonSelect = document.getElementById("seasonSelect");
const statsBody = document.getElementById("statsBody");

seasonSelect.addEventListener("change", () => {
    currentSeason = seasonSelect.value;
    loadSeason();
});

async function loadSeason(){
    const res = await fetch(`data/${currentSeason}.json`);
    players = await res.json();
    renderTable();
}

function renderTable(){
    statsBody.innerHTML = "";

    players.forEach(p=>{
        let row = `
        <tr>
            <td>
                <a href="player.html?id=${p.id}&season=${currentSeason}">
                    ${p.name}
                </a>
            </td>
            <td>${p.GP}</td>
            <td>${p.G}</td>
            <td>${p.A}</td>
            <td>${p.P}</td>
        </tr>
        `;

        statsBody.innerHTML += row;
    });
}

function sortTable(key){
    players.sort((a,b)=>{
        if(a[key] > b[key]) return 1 * sortDirection;
        if(a[key] < b[key]) return -1 * sortDirection;
        return 0;
    });

    sortDirection *= -1;
    renderTable();
}

loadSeason();
setInterval(loadSeason, 60000);
