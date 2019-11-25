function createTeam(event) {
    event.preventDefault();
    var data = JSON.stringify({
        "name": document.getElementById('name').value,
        "nationality": document.getElementById('nationality').value,
        "cup": document.getElementById('cup').value
    });

    create(data, "http://localhost:3000/teams/create");
}


function createSoccer(event) {
    event.preventDefault();
    var data = JSON.stringify({
        "name": document.getElementById('name').value,
        "age": document.getElementById('age').value,
        "team": document.getElementById('team').value,
    })

    create(data, "http://localhost:3000/soccer-players/create");
}

function create(data, url) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhr.send(data);
}

function createRow(data) {
    var element = document.createElement("tr");
    var nameColumn = document.createElement("td");
    nameColumn.innerHTML = data.name;
    element.appendChild(nameColumn);
    var ageColumn = document.createElement("td");
    element.appendChild(ageColumn);
    ageColumn.innerHTML = data.age || data.nationality;
    var teamColumn = document.createElement("td");
    element.appendChild(teamColumn);
    teamColumn.innerHTML = data.team || data.cup;
    return element;
}


function populateTable(url, elementId) {
    var data = [];
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            data = JSON.parse(this.responseText);
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                document.getElementById(elementId).appendChild(createRow(data[i]));
            }
            return;
        }
    });

    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhr.send();
    return data;
}

function populateSoccerPlayerList() {
    if (document.getElementById('soccer_players_list')) {
        populateTable("http://localhost:3000/soccer-players/list", "soccer_players_list");
    }
}

function populateTeamList() {
    if (document.getElementById('teams_list')) {
        populateTable("http://localhost:3000/teams/list", "teams_list");
    }
}

window.addEventListener('load', function () {
    if (document.getElementById('register_teams')) {
        document.getElementById('register_teams').addEventListener('submit', createTeam);
    }
    if (document.getElementById('register_soccers')) {
        document.getElementById('register_soccers').addEventListener('submit', createSoccer);
    }
    populateSoccerPlayerList();
    populateTeamList();
});