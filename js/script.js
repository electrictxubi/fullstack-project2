/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate

const studentListMaster = document.querySelectorAll('.student-item');
const page = document.querySelector(".page");
const pageHeader = document.querySelector(".page-header");
let numOfPages = 0;
let studentList = document.querySelectorAll('.student-item');

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
const clearScreen = (list) => {
    for(let i = 0; i < list.length; i += 1){
        list[i].style.display = 'none';
    }
};
const show = (list, page) => {
    clearScreen(list);
    const numOfPages = Math.ceil(list.length / 10);
    const remainderEntries = list.length % 10;
    if(list.length !== 0) {
        let startingPoint = (10 * (page - 1));
        let endingPoint = startingPoint + 10;
        if (page == numOfPages) {
            endingPoint = startingPoint + remainderEntries;
        }
        for (startingPoint; startingPoint < endingPoint; startingPoint += 1) {
            list[startingPoint].style.display = '';
        }
    }
};

// Create and append the pagination links - Creating a function that can do this is a good approach

const paginationCreation = (list, active) => {
    const pagination = document.getElementsByClassName('pagination')[0];
    if(pagination!==undefined) {
        page.removeChild(pagination);
    }
    const div = document.createElement('div');
    div.className = "pagination";
    const ul = document.createElement('ul');
    numOfPages = Math.ceil(list.length / 10);
    for(let i = 1; i <= numOfPages; i += 1){
        const li = document.createElement('li');
        const a = document.createElement('a');
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
    const message = document.createElement('h3');
    message.textContent = "No results found...";
    message.className = "message";
    message.style.display = 'none';
    page.appendChild(message);
};
const search = (list, searchTerm, startPage = 1) => {
    let flag = false;
    if (page.querySelector(".message") != null) {
        page.querySelector(".message").style.display = 'none';
    }
    clearScreen(studentList);
    let list1 = [];
    for(let i = 0; i < list.length; i += 1) {
        let name = list[i].querySelector('h3').textContent;
        let email = list[i].querySelector('.email').textContent;
        if (name.includes(searchTerm) || email.includes(searchTerm)){
            list1.push(list[i]);
        }
    }
    if(list1.length !== 0){
        studentList = list1;
        show(list1, startPage);
        paginationCreation(list1,startPage);
        flag = true;
    }
    if(!flag) {
        page.querySelector(".message").style.display = 'block';
    }
    studentList = list1;
};
show(studentList,1);
paginationCreation(studentList,1);
appendSearch();
// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
const input = document.querySelector("input");
page.addEventListener('click', (e) => {
    if(e.target.hasAttribute('href')) {
        paginationCreation(studentList, e.target.textContent);
        show(studentList, e.target.textContent);
    }
});

input.addEventListener('keyup', () => {
    search(studentListMaster, input.value);
    paginationCreation(studentList, 1);

});

input.addEventListener('click', () => {
    input.placeholder = '';
});

input.nextElementSibling.addEventListener('click', () => {
    search(studentListMaster, input.value);
    paginationCreation(studentList, 1);
});

