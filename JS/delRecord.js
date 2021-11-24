const { Client } = require("pg");
const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    database: "baza",
    user: "user",
    password: "password",
});
client.connect();

function del_record() {
    let id = document.getElementById("del").value;
    let selected = document.getElementById("table").value;
    let delQuery = null;
    switch (selected) {
        case "gatunek":
            delQuery = `DELETE FROM ${selected} WHERE id_gatunku=${id} `;
            break;
        case "kraj_pochodzenia":
            delQuery = `DELETE FROM ${selected} WHERE id_kraju=${id} `;
            break;
        case "wydawca":
            delQuery = `DELETE FROM ${selected} WHERE id_wydawcy=${id} `;
            break;
        case "uzytkownik":
            delQuery = `DELETE FROM ${selected} WHERE id_uzytkownika=${id} `;
            break;
        case "wykonawca":
            delQuery = `DELETE FROM ${selected} WHERE id_wykonawcy=${id} `;
            break;
        case "lista_uzytkownika":
            delQuery = `DELETE FROM ${selected} WHERE id_listy=${id} `;
            break;
        case "utwor":
            delQuery = `DELETE FROM ${selected} WHERE id_utworu=${id} `;
            break;
        case "album":
            delQuery = `DELETE FROM ${selected} WHERE id_albumu=${id} `;
            break;
    }
    if (delQuery != null) {
        client.query(delQuery, (err, res) => {
            if (err) {
                return;
            }
            if (res["rowCount"] == 0) {
                alert("Nie istnieje rekord o takim ID");
            } else {
                alert(`Pomyślnie usznięto rekord o ID: ${id}`);
            }
        });
    } else {
        alert("Wprowadź poprawne dane");
    }
}

function change_id_count() {
    // Funckja słujżąca do ustawienia odpowiednich zakresów
    // do wybrania w inpucie (żeby nie nastąpiło przekroczenie zakresów)
    let selected = document.getElementById("table").value;
    let id = document.getElementById("del");
    if (selected === "gatunek") {
        let query = `SELECT * FROM ${selected}`;
        let min = 0,
            max = 0;
        client.query(query, (err, res) => {
            if (err) {
                return;
            }
            min = res["rows"][0]["id_gatunku"];
            max = res["rows"][res["rows"].length - 1]["id_gatunku"];
            // console.log({min}, {max});
            id.setAttribute("min", min);
            id.setAttribute("max", max);
        });
    } else if (selected === "kraj_pochodzenia") {
        let query = `SELECT * FROM ${selected}`;
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
    }
}
