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
//

//  DISPLAY TABLE

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

// 

async function updateObject() {
    var postId = document.getElementById("postId").value;
    var text = document.getElementById("textId").value;
    var user= getUsername();
   
   
    var date= new Date();
    var dateString = "yyyy-mm-dd".replace("yyyy", date.getFullYear()).replace("mm", date.getMonth()+1).replace("dd", date.getDate());
    var data_to_send = {
        "postId": postId,
        "user": user,
        "text": text,
        "date": dateString
    };

    var response = await fetch("../../backend/updateObject.php", {
        method: "POST",
        body: JSON.stringify(data_to_send)
    });
    if (response.status == 200) {
        console.log("update successful");
        console.log(response.text());
       
    }
    else {
        console.log("update failed");
    }
}


async function addObject() {
    
    var topicName = document.getElementById("topicName").value;
    var text = document.getElementById("textIdAdd").value;
    var user= getUsername();

   
   
    var date= new Date();
    var dateString = "yyyy-mm-dd".replace("yyyy", date.getFullYear()).replace("mm", date.getMonth()+1).replace("dd", date.getDate());
    var data_to_send = {
       
        "topicName": topicName,
        "user": user,
        "text": text,
        "date": dateString
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
//
// ---------------- DISPLAY TABLE
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

// sort objects

async function sortObjects() {
   
   
    var data= await searchObject();
    for (i = 0; i < data.length; i++)
    {
        for (j=i+1;j<data.length;j++) 
    
        if (data[i]["name"]> data[j]["name"]) { a= data[i]; data[i]=data[j]; data[j]=a;}
    }
    return data;
    
}

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