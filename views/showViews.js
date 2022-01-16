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
    }else if(select.value === "czas_trwania_widok"){
        query = "SELECT tytul_utworu, czas_trwania FROM public.czas_trwania_widok;"
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>Tytuł utworu</th><th scope='col'>Czas trwania</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["tytul_utworu"] +
                        "</td><td>" +
                        res["rows"][i]["czas_trwania"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    }else if(select.value === "l_albumow_gatunek"){
        query = 'SELECT "Gatunek", "Liczba albumów" FROM public.l_albumow_gatunek;'
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>Gatunek</th><th scope='col'>Liczba albumów</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["Gatunek"] +
                        "</td><td>" +
                        res["rows"][i]["Liczba albumów"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    }else if(select.value === "l_utworow_widok"){
        query = 'SELECT "Autor", "Liczba utworów" FROM public.l_utworow_widok;'
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>Autor</th><th scope='col'>Liczba utworów</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["Autor"] +
                        "</td><td>" +
                        res["rows"][i]["Liczba utworów"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    }else if(select.value === "piosenki_autor_na_albumie"){
        query = 'SELECT "Tytul", "Autor" FROM public.piosenki_autor_na_albumie;'
        client.query(query, (err, res) => {
            let inner =
                "<table class='table'><thead><tr><th scope='col'>Tytul</th><th scope='col'>Autor</th></tr></thead><tbody>";
            for (i = 0; i < res["rows"].length; i++) {
                inner = inner.concat(
                    "<tr><td>" +
                        res["rows"][i]["Tytul"] +
                        "</td><td>" +
                        res["rows"][i]["Autor"] +
                        "</td></tr>"
                );
            }
            inner = inner.concat("</tbody></table>");
            div.innerHTML = inner;
        });
    }
}