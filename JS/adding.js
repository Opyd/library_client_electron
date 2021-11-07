function chooseCategory() {
    let div = document.getElementById("formContainer");
    let select = document.getElementById("table");
    console.log(select.value);
    if (select.value === "genre") {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa gatunku" class="form-control" id='genre' required><br/>
        <button onClick="addGenre()" class="btn btn-primary">Dodaj gatunek</button>
        `;
    } else {
        div.innerHTML = `
        <input type="text" placeholder="Nazwa kraju" id='country' class="form-control" required><br/>
        <button onClick="addCountry()" class="btn btn-primary">Dodaj kraj</button>
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
