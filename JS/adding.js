function chooseCategory(){
    window.onload = (event) =>{
        let div = document.getElementById("formContainer")
        let select = document.getElementById("table")
        console.log(select.value);
        if(select.value === "genre"){
            div.innerHTML = `
            <input type="text" placeholder="Nazwa gatunku"><br/>
            <input type="submit" value="ok" onClick="addGenre()">
            `;
        }
    }
}