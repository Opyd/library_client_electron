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
        query = "SELECT * FROM gatunek ORDER BY id_gatunku;";
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
        query = "SELECT * FROM kraj_pochodzenia ORDER BY id_kraju;";
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
    } else if (select.value === "publisher") {
        query = "SELECT * FROM wydawca ORDER BY id_wydawcy;";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>ID</th><th scope='col'>Wydawca</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["id_wydawcy"] +
                        "</td><td>" +
                        res["rows"][i]["nazwa_wydawcy"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    } else if (select.value === "user") {
        query = "SELECT * FROM uzytkownik ORDER BY id_uzytkownika;";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>ID</th><th scope='col'>Login</th><th scope='col'>Haslo</th><th scope='col'>ID listy</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["id_uzytkownika"] +
                        "</td><td>" +
                        res["rows"][i]["login_uzytkownika"] +
                        "</td><td>###</td><td>" +
                        res["rows"][i]["id_listy_uzytkownika"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    } else if (select.value === "performer") {
        query = "SELECT * from wykonawca ORDER BY id_wykonawcy;";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>ID</th><th scope='col'>Nazwa wykonawcy</th><th scope='col'>Opis</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["id_wykonawcy"] +
                        "</td><td>" +
                        res["rows"][i]["nazwa_wykonawcy"] +
                        "</td><td>" +
                        res["rows"][i]["opis"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    } else if (select.value === "user_list") {
        query = "SELECT * FROM lista_uzytkownika ORDER BY id_listy";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>ID Listy</th><th scope='col'>ID Utworu</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["id_listy"] +
                        "</td><td>" +
                        res["rows"][i]["id_utworu"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    } else if (select.value === "track") {
        query = "SELECT * FROM utwor ORDER BY id_utworu";
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>ID Utworu</th><th scope='col'>ID Autora</th><th scope='col'>ID Albumu</th><th scope='col'>Tytuł utworu</th><th scope='col'>Czas trwania</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["id_utworu"] +
                        "</td><td>" +
                        res["rows"][i]["id_autora"] +
                        "</td><td>" +
                        res["rows"][i]["id_album"] +
                        "</td><td>" +
                        res["rows"][i]["tytul_utworu"] +
                        "</td><td>" +
                        res["rows"][i]["czas_trwania"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    } else if (select.value === "album") {
        query = "SELECT id_albumu, tytul_albumu, wydawca.nazwa_wydawcy, kraj_pochodzenia.nazwa, gatunek.nazwa_gatunku, data_wydania FROM public.album inner join wydawca on album.id_wydawcy=wydawca.id_wydawcy inner join kraj_pochodzenia on album.id_kraj_pochodzenia=kraj_pochodzenia.id_kraju inner join gatunek on album.id_gatunku=gatunek.id_gatunku";
        client.query(query, (err, res) => {
            console.log(res)
            let inner =
                "<table class='table'><thead><tr><th scope='col'>ID Albumu</th><th scope='col'>Tytul Albumu</th><th scope='col'>Wydawca</th><th scope='col'>Kraj pochodzenia</th><th scope='col'>Gatunek</th><th scope='col'>Data wydania</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["id_albumu"] +
                        "</td><td>" +   
                        res["rows"][i]["tytul_albumu"] +
                        "</td><td>" +
                        res["rows"][i]["nazwa_wydawcy"]+
                        "</td><td>" +
                        res["rows"][i]["nazwa"] +
                        "</td><td>" +
                        res["rows"][i]["nazwa_gatunku"] +
                        "</td><td>" +
                        res["rows"][i]["data_wydania"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    }
}