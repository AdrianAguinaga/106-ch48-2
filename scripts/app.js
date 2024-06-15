function saveTask(){
console.log("Saving tasks");
    // get the values from the html
const title=$("#txtTitle").val();
const description = $("#txtDescription").val();
const color = $("#selColor").val();
const date = $("#selDate").val();
const status = $("#selStatus").val();
const budget = $("#numBudget").val();
console.log(title,description,color,date,status,budget);
    //build an object
let taskToSave = new Task(title,description,color,date,status,budget);
console.log(taskToSave);

    // save to server
$.ajax({
    type: "POST",
    url:"http://fsdiapi.azurewebsites.net/api/tasks/",  

//here i need to create the logic to define that i want so send the taskToSave object
    data: JSON.stringify(taskToSave),
    contentType: "application/json",
/////////
    success: function(response){
        console.log(response);
        displayTask(taskToSave);
    },
    error: function(error){
        console.log(error);
    }
});

    //display the info from the server
//try to create a function that clear all the inputs at the moment that we press the 
//save button


}

function loadTask(){
        //please do this
    //get the data from the http://fsdiapi.azurewebsites.net/api/tasks
    //console.log the results
    $.ajax({
        type:"GET",
        url:"http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response)
        {
            let data = JSON.parse(response);
            
            for(let i=0;i<data.length;i++)
                {
                    let task = data[i];//get every object
                    if(task.name=="adrian")//see if the name is iqual to mine
                        {
                            displayTask(task);//render it, into the html
                        }
                }
        },
        error: function(error)
        {
            console.log(error);
        } 
    })
    // challenge: just render the messages that comes from your user
    //just kidding



}

function displayTask(task)
{
    let syntax = `<div class='task'>
    <div class='info'>
        <h3>${task.title}</h3>
        <h5>${task.description}</h5>
    </div>
        <label class="status">${task.status}</label>
        <div class="date-budget">
        <label>${task.date}</label>
        <label>${task.budget}</label>
        </div>      
    </div>
        `
    $(".list-task").append(syntax);
    //add the rest of the inputs into syntax    

}

function testRequest(){
    $.ajax({
        type: "get",
        url:"http://fsdiapi.azurewebsites.net",
        success: function(response){
            console.log(response);
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}


function init(){
    console.log("task manager")

    //load data
    loadTask();

    //hook the events
    $("#btnSave").click(saveTask);
}

window.onload = init;