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
    let div = document.getElementById("formContainer");
    let select = document.getElementById("table");
    let query = "";
    if (select.value === "genres") {
        query = "SELECT * FROM gatunek;";
    } else if (select.value === "countries") {
        query = "SELECT * FROM kraj_pochodzenia;";
    }
    div.innerHTML="<table style='border: 1px solid black'>"
    if (query != "") {
        client.query(query, (err, res) => {
            //console.log(res['rows'].length);
            for(i = 0; i < res['rows'].length; i++){
                console.log(res['rows'][i]["id_gatunku"])
                div.innerHTML +="<tr><td>"+res['rows'][i]["id_gatunku"]+"</td><td>"+res['rows'][i]["nazwa_gatunku"]+"</td></tr>"
            }
        });
    }
    div.innerHTML+="</table>"

}
