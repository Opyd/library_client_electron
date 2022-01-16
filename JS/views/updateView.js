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
    }
}