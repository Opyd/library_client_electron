const { Client } = require("pg");
const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    database: "baza",
    user: "user",
    password: "password",
});
client.connect();

function choose_category() {
    let div = document.getElementById("formContainer");
    let selected = document.getElementById("table");
    console.log(selected.value);
    if (selected.value === "gatunek") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa gatunku" class="form-control" id='genre' required><br/>
        <button onClick="update()" class="btn btn-primary">Aktualizuj</button>
        `;
        let query = `SELECT * FROM ${selected} ORDER BY id_gatunku`;
        let min = 0,
            max = 0;
        client.query(query, (err, res) => {
            if (err) {
                return;
            }
            min = res["rows"][0]["id_gatunku"];
            max = res["rows"][res["rows"].length - 1]["id_gatunku"];
            id.setAttribute("min", min);
            id.setAttribute("max", max);
            id.setAttribute("value", min);
            // console.log({min}, {max});
        });
    } else if (selected.value === "kraj_pochodzenia") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa kraju" id='country' class="form-control" required><br/>
        <button onClick="update()" class="btn btn-primary">Aktualizuj</button>
        `;
        let query = `SELECT * FROM ${selected} ORDER BY id_kraju`;
        let min = 0,
            max = 0;
        client.query(query, (err, res) => {
            if (err) {
                return;
            }
            min = res["rows"][0]["id_kraju"];
            max = res["rows"][res["rows"].length - 1]["id_kraju"];
            // console.log({min}, {max});
            id.setAttribute("min", min);
            id.setAttribute("max", max);
            id.setAttribute("value", min);

        });
    } else if (selected.value === "wydawca") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa wydawcy" id='publisher' class="form-control" required><br/>
        <button onClick="update()" class="btn btn-primary">Dodaj wydawcę</button>
        `;
        let query = `SELECT * FROM ${selected} ORDER BY id_wydawcy`
        let min = 0, max = 0;
        client.query(query, (err, res) => {
            if (err) return;
            min = res["rows"][0]["id_wydawcy"]
            max = res["rows"][res["rows"].length - 1]["id_kraju"];
            id.setAttribute("min", min);
            id.setAttribute("max", max);
            id.setAttribute("value", min);

        })
    } else if (selected.value === "uzytkownik") {
        div.innerHTML = `
        <input type="number" placeholder="ID listy" id='listId' class="form-control" required><br/>
        <input type="text" placeholder="Login użytkownika" id='userLogin' class="form-control" required><br/>
        <input type="password" placeholder="Hasło użytkwonika" id='userPassword' class="form-control" required><br/>
        <button onClick="update()" class="btn btn-primary">Dodaj użytkownika</button>
        `;
    } else if (selected.value === "wykonawca") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa wykonawcy" id='performerName' class="form-control" required><br/>
        <input type="text" placeholder="Opis wykonawcy" id='performerDesc' class="form-control" required><br/>
        <button onClick="update()" class="btn btn-primary">Dodaj wykonawcę</button>
        `;
    } else if (selected.value === "lista_uzytkownika") {
        div.innerHTML = `
    <input type="text" placeholder="ID Utworu" id="trackID" class="form-control" required><br/>
    <button onClick="update()" class="btn btn-primary">Dodaj utwór do listy</button>
    `;
    } else if (selected.value === "utwor") {
        div.innerHTML = `
        <input type="text" placeholder="ID Autora" id="performerID" class="form-control" required><br/>
        <input type="text" placeholder="Tytuł utworu" id="trackTitle" class="form-control" required><br/>
        <input type="text" placeholder="Czas trwania" id="trackDuration" class="form-control" required><br/>
        <input type="text" placeholder="ID Albumu" id="albumID" class="form-control" required><br/>
        <button onClick="update()" class="btn btn-primary">Dodaj utwór</button>
        `;
    } else if (selected.value === "album") {
        div.innerHTML = `
    <input type="text" placeholder="Tytuł albumu" id="albumTitle" class="form-control" required><br/>
    <input type="text" placeholder="ID Wydawcy" id="publisherID" class="form-control" required><br/>
    <input type="text" placeholder="ID Kraju pochodzenia" id="countryID" class="form-control" required><br/>
    <input type="text" placeholder="ID Gatunku" id="genreID" class="form-control" required><br/>
    <input type="date" placeholder="Data wydania" id="releaseDate" class="form-control" required><br/>
    <button onClick="update()" class="btn btn-primary">Dodaj album</button>
    `;
    }
}

function update() {
    let selected = document.getElementById("table").value;
    let id = document.getElementById("upd").value;
    let updQuery = null;
    let val = null;
    switch (selected) {
        case "gatunek":
            val = document.getElementById("genre").value;
            updQuery = `UPDATE ${selected} SET nazwa_gatunku='${val}' WHERE id_gatunku=${id}`;
            break;
        case "kraj_pochodzenia":
            val = document.getElementById("country").value;
            updQuery = `UPDATE ${selected} SET nazwa='${val}' WHERE id_kraju=${id}`;
            break;
        case "wydawca":
            val = document.getElementById("publisher").value;
            updQuery = `UPDATE ${selected} SET nazwa_wydawcy='${val}' WHERE id_wydawcy=${id}`;
            break;
        case "uzytkownik":
            let valListID = document.getElementById("listID").value;
            let valLogin = document.getElementById("userLogin").value;
            let valPass = document.getElementById("userPassword").value;
            updQuery = `UPDATE ${selected} SET ID_listy_uzytkownika='${valListID}', Login_uzytkownika='${valLogin}', Haslo_uzytkownika='${valPass}' WHERE ` //todo
            break;
        case "wykonawca":
            let valName = document.getElementById("performerName").value;
            let valDesc = document.getElementById("performerDesc").value;
            updQuery = `UPDATE ${selected} SET nazwa_wykonawcy='${valName}',opis='${valDesc}' WHERE`;//todo
            break;
        case "lista_uzytkownika":
            val = document.getElementById("trackID").value;
            updQuery = `UPDATE ${selected} SET utwor='${val} WHERE`; //todo
            break;
        case "utwor":
            let albumID = document.getElementById("albumID").value;
            let trackTitle = document.getElementById("trackTitle").value;
            let trackDuration = document.getElementById("trackDuration").value;
            let performerID = document.getElementById("performerID").value;
            updQuery = `UPDATE ${selected} SET id_autora='${performerID}', id_albumu='${albumID}',tytul_utworu='${trackTitle}',czas_trwania='${trackDuration}' WHERE` //todo;
            break;
        case "album":
            let albumTitle = document.getElementById("albumTitle").value;
            let publisherID = document.getElementById("publisherID").value;
            let countryID = document.getElementById("countryID").value;
            let genreID = document.getElementById("genreID").value;
            let releaseDate = document.getElementById("releaseDate").value;
            updQuery = `UPDATE ${selected} SET tytul_albumu='${albumTitle}', id_wydawcy='${publisherID}',id_kraj_pochodzenia='${countryID}', id_gatunku='${genreID}', data_wydania='${releaseDate}' WHERE ` //todo
            break;
        }
    if (updQuery != null) {
        console.log(updQuery);
        client.query(updQuery, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            if (res["rowCount"] == 0) {
                alert("Nie istnieje rekord o takim ID");
            } else {
                alert(`Pomyślnie zaktualizowano rekord o ID: ${id}`);
            }
        });
    } else {
        alert("Wprowadź poprawne dane");
    }
}
