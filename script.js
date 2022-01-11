const cards = document.querySelector(".cards");

const filters = document.querySelector(".filters");

const 
    categoriesInput = document.getElementById("categories"),
    categoriesOptions = categoriesInput.querySelectorAll("option"),
    statusInput = document.getElementById("status"),
    citizenshipInput = document.getElementById("citizenship"),
    genderInput = document.getElementById("gender");

const addHeroes = (condition) => {
    return fetch("dbHeroes.json").then(responce => responce.json())
    .then(data => {
        data.forEach((film) => {            
                let newElem = document.createElement("div");
                newElem.classList.add("card");
                cards.appendChild(newElem);

                let newP = document.createElement("p");
                newP.innerText = film.name;
                newElem.appendChild(newP);

                let newImg = document.createElement("img");
                newImg.setAttribute("src", `${film.photo}`);
                newImg.setAttribute("width", "150");
                
                newImg.setAttribute("height", "230");
                newElem.appendChild(newImg);

                if(film.realName){
                    let realName = document.createElement("p");
                    realName.innerText = `Real name: ${film.realName}`;
                    newElem.appendChild(realName);
                }
                
                let filmList = film.movies;
                if(filmList){
                    let ul = document.createElement("ul");
                    ul.classList.add("film-list");
                    ul.innerText = "Films:";
                    newElem.appendChild(ul);
                    filmList.forEach((movie) => {
                        let li = document.createElement("li");
                        li.classList.add("film");
                        li.innerText = movie;
                        ul.appendChild(li);
                    });
                }
                
                let status = document.createElement("p");
                status.innerText = `Status: ${film.status}`;

                newElem.appendChild(status);
            // }
        });        
    })
    .catch(error => {
        console.log(error);
    });
};

addHeroes();

const addSelect = (selectId) => {
    statusInput.style.display = "none";
    citizenshipInput.style.display = "none";
    genderInput.style.display = "none";
    document.getElementById(selectId).style.display = "inline-block";
};


filters.addEventListener('change', (e) => {

    const addFilteredHeroes = (condition) => {
        document.querySelectorAll(".card").forEach(card => {
            card.remove();
        });
        return fetch("dbHeroes.json").then(responce => responce.json())
        .then(data => {
            data.forEach((film) => {    
                for (let key in film){
                    if (film[key] == condition && key == "citizenship" || film[key] == condition && key == "gender" || film[key] == condition && key == "status"){
                        let newElem = document.createElement("div");
                        newElem.classList.add("card");
                        cards.appendChild(newElem);

                        let newP = document.createElement("p");
                        newP.innerText = film.name;
                        newElem.appendChild(newP);

                        let newImg = document.createElement("img");
                        newImg.setAttribute("src", `${film.photo}`);
                        newImg.setAttribute("width", "150");
                        
                        newImg.setAttribute("height", "230");
                        newElem.appendChild(newImg);

                        if(film.realName){
                            let realName = document.createElement("p");
                            realName.innerText = `Real name: ${film.realName}`;
                            newElem.appendChild(realName);
                        }
                    
                    let filmList = film.movies;
                    if(filmList){
                        let ul = document.createElement("ul");
                        ul.classList.add("film-list");
                        ul.innerText = "Films:";
                        newElem.appendChild(ul);
                        filmList.forEach((movie) => {
                            let li = document.createElement("li");
                            li.classList.add("film");
                            li.innerText = movie;
                            ul.appendChild(li);
                        });
                    }
                    
                    let status = document.createElement("p");
                    status.innerText = `Status: ${film.status}`;

                    newElem.appendChild(status);
                    } 
                }
            });
        })
        .catch(error => {
            console.log(error);
        });        
    };

    if (e.target.closest("#categories")){
        categoriesOptions.forEach(option => {
            if(option.selected){
                addSelect(option.value);
            }
        });
    } else if (e.target.closest("#gender")){
        let condition;
        genderInput.querySelectorAll("option").forEach(option => {
            if(option.selected){
                condition = option.value.toLowerCase();
            }
        });
        
        addFilteredHeroes(condition);
        
    } else if (e.target.closest("#status")){
        let condition;
        statusInput.querySelectorAll("option").forEach(option => {
            if(option.selected){
                condition = option.value.toLowerCase();
            }
        });
        addFilteredHeroes(condition);
    } else if (e.target.closest("#citizenship")){
        let condition;
        citizenshipInput.querySelectorAll("option").forEach(option => {
            if(option.selected){
                condition = option.value.toUpperCase().slice(0,1) + option.value.toLowerCase().slice(1);
            }
        });
        addFilteredHeroes(condition);   
    }
});