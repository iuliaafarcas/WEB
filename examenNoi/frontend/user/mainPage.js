
// GET THE ACTUAL USERNAME 

function getUsername() {
    let name="username=";
    let cookie = decodeURIComponent(document.cookie);
    let ca = cookie.split(';');
    for(let i = 0; i<ca.length; i++){
      let c = ca[i].trim();
      if(c.indexOf(name) === 0){
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// ----------------------------------------------------
// DISPLAY PAGINATED 

async function displayPaginated(objectName, page) {
    var table = document.getElementById("displayPaginated");
    table.innerHTML = "";
    var data = await fetch(`../../backend/displayPaginated.php?name=${objectName}&page=${page}`, {
        method: "GET"
    }).then(function(response){
        console.log("search successful");
        return response.json();
    }).catch( function(error) {
        console.log(error);
    });


   
    for (i = 0; i < data.length; i++) {
        createRowTeam(data[i]);
    }
    // checkButtons();
}

let page = 0;

function nextPage(){
    page+=1;
    var name =getUsername();
    displayPaginated(name, page);  
}

function prevPage(){
    page-=1;
    var name =getUsername();
    displayPaginated(name, page);
}
displayPaginated(getUsername(), page);

// ------------------------------------------------------

  // POPULATE OPTION

  async function getObjectsToChooseFrom() {
    var name =getUsername();
    var data = await fetch(`../../backend/getObjectsToChooseFrom.php?name=${name}`, {
        method: "GET"
    }).then(function(response){
        console.log("get successful");
        return response.json();
    }).catch( function(error) {
        console.log(error);
    });
    console.log(data);
    for(var i =0;i<data.length;i++){
        let node = document.createElement("option");
        node.value = data[i].id;
        node.text = data[i].id +" "+ data[i].name +" "+ data[i].homeCity;
        document.getElementById("options").appendChild(node);
    }

}
getObjectsToChooseFrom();


  // CHANGE OPTION 

  objectsByOption="";
  page: number=0;
function changeOption(e){
    this.option=e.target.value;
    if (this.option==""){
      this.objectsByOption=[];
      this.page=0;
  
    }
    else{
      this.page=0;
      let option = document.getElementById("options").value;
      getObjectsForUserOption(option);
    }
    
  }


//  DISPLAY TABLE AFTER OPTION

async function getObjectsForUserOption(option) {
   
    var table = document.getElementById("objectsForUser");
    table.innerHTML = "";

    var response = await fetch("../../backend/getObjectsForUser.php?option=" + option);
    var data = await response.json();
    console.log(data);
   
        document.getElementById("tableHead").innerHTML="<th> Id </th><th> Name </th><th> Position </th>"
    for (i = 0; i < data.length; i++) {
        createRowWithDeleteButton(data[i]);
    }
}

document.getElementById("options").addEventListener('change', changeOption);

// ---------------------------------------------

// SEARCH OBJECT FOR INSTANT SERACH

async function searchObject() {

    var name = document.getElementById("myInput").value;
   
    var data_to_send = {
        "name": name
      
    };
    
    var response = await fetch(`../../backend/searchObject.php?name=${name}`, {
        method: "GET"
    }).then(function(response){
        console.log("search successful");
        return response.json();
    }).catch( function(error) {
        console.log(error);
    });
    console.log(response);
    return response;


}
//  DISPLAY TABLE FOR INSTANT SEARCH
async function getObjectsForUser() {
   
    var table = document.getElementById("objectsForUser");
    table.innerHTML = "";

    var data= await sortObjects();
    console.log(data);


    document.getElementById("tableHead").innerHTML="<th> Id </th><th> Name </th> <th> Position </th>"
    for (i = 0; i < data.length; i++) {
        createRow(data[i]);
    }
    
}

// SORT ARRAY

async function sortObjects() {
   
   
    var data= await searchObject();
    for (i = 0; i < data.length; i++)
    {
        for (j=i+1;j<data.length;j++) 
    
        if (data[i]["name"]> data[j]["name"]) { a= data[i]; data[i]=data[j]; data[j]=a;}
    }
    return data;
    
}

// ---------------------------------------------------
// UPDATE OBJECT

async function updateObject() {
    var playerName = document.getElementById("playerName").value;
    // var date= new Date();
    // var dateString = "yyyy-mm-dd".replace("yyyy", date.getFullYear()).replace("mm", date.getMonth()+1).replace("dd", date.getDate());
     var data_to_send = {
        "playerName": playerName,
        "position": position,   
    };

    var response = await fetch("../../backend/updateObject.php", {
        method: "POST",
        body: JSON.stringify(data_to_send)
    });
    if (response.status == 200) {
        console.log("update successful");
        alert("update successful");
        console.log(response.text());
       
    }
    else {
        console.log("update failed");
    }
}

// ---------------------------------------------------
// UPDATE OBJECT SCHEDULE

async function updateObject2() {
    var scheduleId = document.getElementById("scheduleId").value;
    var date= new Date();
    var username=getUsername();
    var dateString = "yyyy-mm-dd".replace("yyyy", date.getFullYear()).replace("mm", date.getMonth()+1).replace("dd", date.getDate());
     var data_to_send = {
        "scheduleId": scheduleId,
        "date": dateString,
        "username": username,

    };

    var response = await fetch("../../backend/updateObject2.php", {
        method: "POST",
        body: JSON.stringify(data_to_send)
    });
    if (response.status == 200) {
        console.log("update successful");
        alert("update successful");
        console.log(response.text());
       
    }
    else {
        console.log("update failed");
    }
}
// ---------------------------------------------------------
//  ADD OBJECT 

async function addObject() {
    
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;
    var teamName = document.getElementById("teamName").value;
    // var date= new Date();
    // var dateString = "yyyy-mm-dd".replace("yyyy", date.getFullYear()).replace("mm", date.getMonth()+1).replace("dd", date.getDate());
    var data_to_send = {
       
        "player1": player1,
        "player2": player2,
        "teamName": teamName,
        // "date": dateString
    };

    var response = await fetch("../../backend/addObject.php", {
        method: "POST",
        body: JSON.stringify(data_to_send)
    });
    if (response.status == 200) {
        console.log("add successful");
        console.log(response.text());    
    }
    else {
        console.log("add failed");
    }
}


// ----------------------------------------
// ----------  CREATE TABLE

function createCell(parentRow, textVal) {
    var tag = document.createElement("td");
    text = document.createTextNode(textVal);
    tag.appendChild(text);
    parentRow.appendChild(tag);
}


function createRowWithDeleteButton(object) {
    var table = document.getElementById("objectsForUser");
    var row = document.createElement("tr");
    createCell(row, object.id);
    createCell(row, object.name);
    createCell(row, object.position);  
    var button = document.createElement("button");
    button.innerHTML="delete";
    button.addEventListener("click", function(){
        deleteObject(object.id);
    });
    row.appendChild(button);
    table.appendChild(row);
}



function createRow(object) {
    var table = document.getElementById("objectsForUser");
    var row = document.createElement("tr");
    createCell(row, object.id);
    createCell(row, object.name);
    createCell(row, object.position);  
    table.appendChild(row);
}

function createRowTeam(object) {
    var table = document.getElementById("displayPaginated");
    var row = document.createElement("tr");
    createCell(row, object.id);
    createCell(row, object.name);
    createCell(row, object.homeCity);  
    table.appendChild(row);
}


// ----------------------------------------------
// DETELE OBJECT

async function deleteObject(id){

    var data_to_send = {
        "id": id
      
    };
    
    var response = await fetch(`../../backend/deleteObject.php?id=${id}`, {
        method: "DELETE"
    }).then(function(response){
        console.log("deleted successful");
        return response.json();
    }).catch( function(error) {
        console.log(error);
    });
    console.log(response);
    return response;

}
//------------------------------------------------------------------
