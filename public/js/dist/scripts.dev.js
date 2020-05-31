"use strict";

/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
var listBooks = document.querySelectorAll('table>tbody');
var nbr_items_show = 5;
var numberOfBooks = listBooks.length;
console.log(listBooks);
var numberOfPages = Math.ceil(numberOfBooks / nbr_items_show);
var numberOfNewBooks = 0;
var numberOfNewPages = 0;

function showPage(listBooks, page) {
  for (var i = 0; i < numberOfBooks; i += 1) {
    var startIndex = page * nbr_items_show - nbr_items_show;
    var endIndex = page * nbr_items_show; // show only 5 list items per page

    if (i >= startIndex && i < endIndex) {
      listBooks[i].style.display = '';
    } else {
      listBooks[i].style.display = 'none';
    }
  }
}

function appendPageLinks(numberOfPages) {
  var divpage = document.querySelector('body');
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
    showPage(listBooks, currentPage);
    e.classList.add('active');
  }

  for (var _i2 = 0; _i2 < numberOfPages; _i2++) {
    aa[_i2].addEventListener('click', function (e) {
      setAction(event);
    });
  }
} //calling the functions 


showPage(listBooks, 1);
appendPageLinks(numberOfPages);