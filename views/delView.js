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
        case "gatunkiView":
            delQuery = `DELETE FROM ${selected} WHERE id_gatunku=${id} `;
            break;
        case "krajView":
            delQuery = `DELETE FROM ${selected} WHERE id_kraju=${id} `;
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