"use strict";

/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
var list = document.querySelector('ul.student-list');
var listStudents = list.children;
var nbr_items_show = 10;
var numberOfStudents = list.children.length;
var numberOfPages = Math.ceil(numberOfStudents / nbr_items_show);
var numberOfNewStudents = 0;
var numberOfNewPages = 0;

function showPage(list, page) {
  for (var i = 0; i < numberOfStudents; i += 1) {
    var startIndex = page * nbr_items_show - nbr_items_show;
    var endIndex = page * nbr_items_show; // show only 10 list items per page

    if (i >= startIndex && i < endIndex) {
      list.children[i].style.display = 'block';
    } else {
      list.children[i].style.display = 'none';
    }
  }
}

function appendPageLinks(numberOfPages) {
  var divpage = document.querySelector('.page');
  var div = document.createElement('DIV'); //creating pagination area

  div.className = "pagination";
  var ul = document.createElement('UL'); //pagination list

  divpage.append(div); //appending pagination to the page

  div.append(ul); //appending list to pagination

  for (var i = 0; i < numberOfPages; i++) {
    var li = document.createElement('LI');
    var a = document.createElement('A');
    a.setAttribute('href', '#');
    a.textContent = i + 1;
    ul.append(li);
    li.append(a); //appending links to list items
  }

  var aa = document.querySelectorAll('.pagination >ul>li>a');
  aa[0].className = "active";
  var active = document.querySelector('.active'); //setting the active class to the clicked pagination link 

  function setAction(event) {
    for (var _i = 0; _i < numberOfPages; _i++) {
      aa[_i].classList.remove('active');
    }

    var e = event.target;
    var currentPage = parseInt(e.textContent);
    showPage(list, currentPage);
    e.classList.add('active');
  }

  for (var _i2 = 0; _i2 < numberOfPages; _i2++) {
    aa[_i2].addEventListener('click', function (e) {
      setAction(event);
    });
  }
} //calling the functions 


showPage(list, 1);
appendPageLinks(numberOfPages);