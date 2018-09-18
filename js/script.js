/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
 Jon Avila
******************************************/

// DOM Variables

const studentListMaster = document.querySelectorAll('.student-item');
const page = document.querySelector(".page");
const pageHeader = document.querySelector(".page-header");

//Variables

let numOfPages = 0;
//this variable gets changed as the program searches 
let studentList = document.querySelectorAll('.student-item');

//clearScreen takes a list that is printed on the streen and sets all of the elements to display=none
const clearScreen = (list) => {
    for(let i = 0; i < list.length; i += 1){
        list[i].style.display = 'none';
    }
};
//show shows 10 elements from list, the page argument determines which 10 to print
const show = (list, page) => {
    clearScreen(list);
    //local variables
    const numOfPages = Math.ceil(list.length / 10);
    const remainderEntries = list.length % 10;
    //if list is not empty
    if(list.length !== 0) {
        //determine the starting and end points based on the page
        let startingPoint = (10 * (page - 1));
        let endingPoint = startingPoint + 10;
        //if this is the last page then adjust the end point to reflect remaining elements so there is no index out of bounds exception
        if (page == numOfPages) {
            endingPoint = startingPoint + remainderEntries;
        }
        //display the items from the starting point to the ending point
        for (startingPoint; startingPoint < endingPoint; startingPoint += 1) {
            list[startingPoint].style.display = '';
        }
    }
};

// paginationCreation creates the pagination buttons from a list of items and the active argument shows what link's class should be made active
const paginationCreation = (list, active) => {
    const pagination = document.getElementsByClassName('pagination')[0];
    //remove old pagination buttons
    if(pagination!==undefined) {
        page.removeChild(pagination);
    }
    //generates the block of pagination buttons code
    const div = document.createElement('div');
    div.className = "pagination";
    const ul = document.createElement('ul');
    numOfPages = Math.ceil(list.length / 10);
    for(let i = 1; i <= numOfPages; i += 1){
        const li = document.createElement('li');
        const a = document.createElement('a');
        //sets the active class
        if(i == active){
            a.className = "active";
        }
        a.textContent = i;
        a.href = "#";
        li.appendChild(a);
        ul.appendChild(li);
    }
    div.appendChild(ul);
    page.append(div);
};
//appendSearch appends the search textfield, button, and not found message
const appendSearch = () => {
    const div = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');
    div.className = 'student-search';
    input.placeholder = "Search for students...";
    button.textContent = "Search";
    div.appendChild(input);
    div.appendChild(button);
    pageHeader.appendChild(div);
    //this part below is the creation of the no results found message which is hidden by default
    const message = document.createElement('h3');
    message.textContent = "No results found...";
    message.className = "message";
    message.style.display = 'none';
    page.appendChild(message);
};

//search takes a list to search from, a search term to search for, and a start page for determining where to start showing
//the default is to start showing from the first page
const search = (list, searchTerm, startPage = 1) => {
    //this flag is to show if the list is empty
    let flag = false;
    //this resets the not found message if the list is not empty
    if (page.querySelector(".message") != null) {
        page.querySelector(".message").style.display = 'none';
    }
    //this resets the screen to make it blank
    clearScreen(studentList);
    //this list holds elements that were found
    let list1 = [];
    //iterate through input list and compare search term to name and email from the input list
    for(let i = 0; i < list.length; i += 1) {
        let name = list[i].querySelector('h3').textContent;
        let email = list[i].querySelector('.email').textContent;
        if (name.includes(searchTerm) || email.includes(searchTerm)){
            list1.push(list[i]);
        }
    }
    //if the list isn't empty update studentList for further searching
    // show the elements found, and recreate the pagination links/buttons based on results
    if(list1.length !== 0){
        studentList = list1;
        show(list1, startPage);
        paginationCreation(list1,startPage);
        flag = true;
    }
    //if list is empty there are no results... show the not found message
    if(!flag) {
        page.querySelector(".message").style.display = 'block';
    }
    //update list for further searching
    studentList = list1;
};
//default initiation of list
show(studentList,1);
paginationCreation(studentList,1);
appendSearch();

//Event handlers

//input is the text input field
const input = document.querySelector("input");
//pagination handler
page.addEventListener('click', (e) => {
    //if a pag. link is clicked
    if(e.target.hasAttribute('href')) {
        //create or update the pag.
        paginationCreation(studentList, e.target.textContent);
        //show relevant page from list, and make the link that was clicked class active
        show(studentList, e.target.textContent);
    }
});
//this event listener runs a search and updates pag. when something is typed into the input field
input.addEventListener('keyup', () => {
    //search the original list
    search(studentListMaster, input.value);
    //create pag. for the results
    paginationCreation(studentList, 1);

});

input.addEventListener('click', () => {
    input.placeholder = '';
});
//this is not needed with the keyup event
//when button is clicked the search is initiated from search term from the input field
input.nextElementSibling.addEventListener('click', () => {
    search(studentListMaster, input.value);
    paginationCreation(studentList, 1);
});

