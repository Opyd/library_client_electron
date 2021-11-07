function chooseCategory() {
    let div = document.getElementById("formContainer");
    let select = document.getElementById("table");
    console.log(select.value);
    if (select.value === "genre") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa gatunku" id='genre'><br/>
        <input type="submit" value="Dodaj gatunek" onClick="addGenre()">
        `;
    } else {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa kraju" id='country'><br/>
        <input type="submit" value="Dodaj kraj" onClick="addCountry()">
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
    let addGenreQuery = "INSERT INTO gatunek (nazwa_gatunku) VALUES('"+val+"');";
    console.log(addGenreQuery)
    client.query(addGenreQuery, (err, res) => {
        if (err) {
            return;
        }
        alert("Dodano wiersz");
    });
}

function addCountry() {
    let val = document.getElementById("country").value;
    let addCountryQuery = "INSERT INTO kraj_pochodzenia (nazwa) VALUES('"+val+"');";
    console.log(addCountryQuery)
    client.query(addCountryQuery, (err, res) => {
        if (err) {
            return;
        }
        alert("Dodano wiersz");
    });
}
