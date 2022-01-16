const { Client } = require("pg");
const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    database: "baza",
    user: "user",
    password: "password",
});
client.connect();

function displayOption() {
    let div = document.getElementById("display");
    let select = document.getElementById("table");
    let query = "";
    if (select.value === "genres") {
        query = "SELECT * FROM gatunkiView ORDER BY id_gatunku;";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>ID</th><th scope='col'>Nazwa gatunku</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["id_gatunku"] +
                        "</td><td>" +
                        res["rows"][i]["nazwa_gatunku"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    } else if (select.value === "countries") {
        query = "SELECT * FROM krajView ORDER BY id_kraju;";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>ID</th><th scope='col'>Kraj</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["id_kraju"] +
                        "</td><td>" +
                        res["rows"][i]["nazwa"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
        //dwie role - tylko dla salecta, druga insert-select
    }else if(select.value==='tytul_gatunek'){
        query = "SELECT * FROM tytul_gatunek;";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>Tytuł</th><th scope='col'>Gatunek</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["tytul_utworu"] +
                        "</td><td>" +
                        res["rows"][i]["nazwa_gatunku"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    }else if(select.value==='wykonawca_kraj'){
        query = "SELECT * FROM wykonawca_kraj;";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>Wykonawca</th><th scope='col'>Kraj</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["nazwa_wykonawcy"] +
                        "</td><td>" +
                        res["rows"][i]["nazwa"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    }
}