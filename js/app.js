const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const dateElement = document.getElementById("date");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "linethrough";
//variables
let LIST, id;

//get item from local storage

let data = localStorage.getItem("ToDo");


//check if data is not empty

if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the if id to the last one in the list
    loadList(LIST); //load yje list to the user interface
}else{
    //if data isn't empty
    LIST = [];
    id = 0;
}

//load items ti the users interfaace

function loadList(array){
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the items

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})


// --------------date---------------

let options = { weekday: "long", month: "short", day: "numeric" };
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add atodo
function addToDo(toDo, id, done, trash) {
    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
      const item = `<li class="item"> 
                   <i class="fa ${DONE} co" job = "complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i></li> `;
  const  position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//add an item to list
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
               const toDo = input.value;
                 if(toDo){
                    addToDo(toDo, id, false, false);
                    LIST.push({
                        name : toDo,
                        id : id,
                        done : false,
                        trash : false
                    });
                    //add item to localstoaragery(this code must be added where array is updated)

                     localStorage.setItem("ToDo", JSON.stringify(LIST));


                    id++;
                }
                input.value = "";
            }
        
});
//COMPLETE TO DO
  function completeToDo(element){
      element.classList.toggle(CHECK);
      element.classList.toggle(UNCHECK);
      element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

      LIST[element.id].done = LIST[element.id].done ? false : true;
  }
//remove todo

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
//target the items

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value;//complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    //add item to localstoaragery(this code must be added where array is updated)

      localStorage.setItem("ToDo", JSON.stringify(LIST));
});
