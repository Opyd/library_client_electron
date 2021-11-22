function chooseCategory() {
    let div = document.getElementById("formContainer");
    let select = document.getElementById("table");
    console.log(select.value);
    if (select.value === "genre") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa gatunku" class="form-control" id='genre' required><br/>
        <button onClick="addGenre()" class="btn btn-primary">Dodaj gatunek</button>
        `;
    } else if (select.value === "country") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa kraju" id='country' class="form-control" required><br/>
        <button onClick="addCountry()" class="btn btn-primary">Dodaj kraj</button>
        `;
    } else if (select.value === "publisher") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa wydawcy" id='publisher' class="form-control" required><br/>
        <button onClick="addPublisher()" class="btn btn-primary">Dodaj wydawcę</button>
        `;
    } else if (select.value === "user") {
        div.innerHTML = `
        <input type="number" placeholder="ID listy" id='listId' class="form-control" required><br/>
        <input type="text" placeholder="Login użytkownika" id='userLogin' class="form-control" required><br/>
        <input type="password" placeholder="Hasło użytkwonika" id='userPassword' class="form-control" required><br/>
        <button onClick="addUser()" class="btn btn-primary">Dodaj użytkownika</button>
        `;
    } else if (select.value === "performer") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa wykonawcy" id='performerName' class="form-control" required><br/>
        <input type="text" placeholder="Opis wykonawcy" id='performerDesc' class="form-control" required><br/>
        <button onClick="addPerformer()" class="btn btn-primary">Dodaj wykonawcę</button>
        `;
    } else if (select.value === "user_list") {
        div.innerHTML = `
    <input type="text" placeholder="ID Utworu" id="trackID" class="form-control" required><br/>
    <button onClick="addList()" class="btn btn-primary">Dodaj utwór do listy</button>
    `;
    } else if (select.value === "track") {
        div.innerHTML = `
      <input type="text" placeholder="ID Autora" id="performerID" class="form-control" required><br/>
      <input type="text" placeholder="Tytuł utworu" id="trackTitle" class="form-control" required><br/>
      <input type="text" placeholder="Czas trwania" id="trackDuration" class="form-control" required><br/>
      <input type="text" placeholder="ID Albumu" id="albumID" class="form-control" required><br/>
      <button onClick="addTrack()" class="btn btn-primary">Dodaj utwór</button>
      `;
    } else if (select.value === "album") {
        div.innerHTML = `
    <input type="text" placeholder="Tytuł albumu" id="albumTitle" class="form-control" required><br/>
    <input type="text" placeholder="ID Wydawcy" id="publisherID" class="form-control" required><br/>
    <input type="text" placeholder="ID Kraju pochodzenia" id="countryID" class="form-control" required><br/>
    <input type="text" placeholder="ID Gatunku" id="genreID" class="form-control" required><br/>
    <input type="date" placeholder="Data wydania" id="releaseDate" class="form-control" required><br/>
    <button onClick="addAlbum()" class="btn btn-primary">Dodaj album</button>
    `;
    }
}
const { Client } = require("pg");
const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    database: "baza",
    user: "user",
    password: "password",
});
client.connect();
function addGenre() {
    let val = document.getElementById("genre").value;
    let addGenreQuery =
        "INSERT INTO gatunek (nazwa_gatunku) VALUES('" + val + "');";
    console.log(addGenreQuery);
    client.query(addGenreQuery, (err, res) => {
        if (err) {
            return;
        }
        alert("Dodano wiersz");
    });
}

function addPublisher() {
    let val = document.getElementById("publisher").value;
    let addPublisherQuery = `INSERT INTO Wydawca (Nazwa_wydawcy) VALUES ('${val}');`;
    client.query(addPublisherQuery, (err, res) => {
        if (err) {
            return;
        }
        alert("Dodano wiersz");
    });
}

function addUser() {
    let listId = document.getElementById("listId").value;
    let userLogin = document.getElementById("userLogin").value;
    let userPassword = document.getElementById("userPassword").value;

    let addUserQuery = `INSERT INTO Uzytkownik (ID_listy_uzytkownika, Login_uzytkownika, Haslo_uzytkownika) VALUES ('${listId}','${userLogin}','${userPassword}');`;
    client.query(addUserQuery, (err, res) => {
        if (err) return;
        alert("Dodano wiersz");
    });
}

function addPerformer() {
    let performerName = document.getElementById("performerName").value;
    let performerDesc = document.getElementById("performerDesc").value;
    let regex = new RegExp("[a-zA-Z]{2,}");
    if (!regex.test(performerName)) {
        alert("Wprowadź poprawne dane");
    } else {
        let addPerformerQuery = `INSERT INTO Wykonawca (Nazwa_wykonawcy, Opis) VALUES ('${performerName}','${performerDesc}');`;

        client.query(addPerformerQuery, (err, res) => {
            if (err) return;
            alert("Dodano wiersz!");
        });
    }
}
function addCountry() {
    let val = document.getElementById("country").value;
    let addCountryQuery =
        "INSERT INTO kraj_pochodzenia (nazwa) VALUES('" + val + "');";
    console.log(addCountryQuery);
    client.query(addCountryQuery, (err, res) => {
        if (err) {
            return;
        }
        alert("Dodano wiersz");
    });
}
function addList() {
    let val = document.getElementById("trackID").value;
    let addListQuery = `INSERT INTO lista_uzytkownika (utworu) VALUES('${val}');`;
    let regexp = new RegExp("^\\d{1,}$");
    if (!regexp.test(val)) {
        alert("Wprowadź poprawne dane");
    } else {
        client.query(addListQuery, (err, res) => {
            if (err) {
                alert("Błąd! Czy utwór o podanym ID istnieje?");
                return;
            }
            alert("Dodano wiersz");
        });
    }
}
function addTrack() {
    let albumID = document.getElementById("albumID").value;
    let trackTitle = document.getElementById("trackTitle").value;
    let trackDuration = document.getElementById("trackDuration").value;
    let performerID = document.getElementById("performerID").value;
    let addTrackQuery = `INSERT INTO utwor (id_autora,id_albumu,tytul_utworu,czas_trwania) VALUES('${performerID}','${albumID}','${trackTitle}','${trackDuration}');`;

    let regexp = new RegExp("^\\d{1,}$");
    if (!regexp.test(albumID) || !regexp.test(performerID)) {
        alert("Wprowadź poprawne dane");
    } else {
        client.query(addTrackQuery, (err, res) => {
            if (err) {
                alert("Błąd!");
                return;
            }
            alert("Dodano wiersz!");
        });
    }
}
function addAlbum() {
    let albumTitle = document.getElementById("albumTitle").value;
    let publisherID = document.getElementById("publisherID").value;
    let countryID = document.getElementById("countryID").value;
    let genreID = document.getElementById("genreID").value;
    let releaseDate = document.getElementById("releaseDate").value;

    let addAlbumQuery = `INSERT INTO album (tytul_albumu, id_wydawcy, id_kraj_pochodzenia, id_gatunku, data_wydania) VALUES('${albumTitle}',${publisherID},${countryID},${genreID},'${releaseDate}');`;
    let regexp = new RegExp("^\\d{1,}$");
    if (
        !regexp.test(publisherID) ||
        !regexp.test(countryID) ||
        !regexp.test(genreID)
    ) {
        alert("Wprowadź poprawne dane");
    } else {
        client.query(addAlbumQuery, (err, res) => {
            if (err) {
                alert("Wystąpił błąd " + err);
                return;
            } else {
                alert("Dodano wiersz!");
            }
        });
    }
}
