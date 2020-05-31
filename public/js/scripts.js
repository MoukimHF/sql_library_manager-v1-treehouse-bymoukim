/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
let listBooks = document.querySelectorAll('table>tbody');
let nbr_items_show = 5;
let numberOfBooks = listBooks.length;
console.log(listBooks)
let numberOfPages = Math.ceil(numberOfBooks / nbr_items_show);
let numberOfNewBooks = 0;
let numberOfNewPages = 0;

function showPage(listBooks, page) {
	for (let i = 0; i < numberOfBooks; i += 1) {
		let startIndex = (page * nbr_items_show) - (nbr_items_show);
		let endIndex = page * nbr_items_show;
		// show only 5 list items per page
		if (i >= startIndex && i < endIndex) {
			listBooks[i].style.display = '';
		} else {
			listBooks[i].style.display = 'none';
		}
	}
}

function appendPageLinks(numberOfPages) {
	let divpage = document.querySelector('body');
	let div = document.createElement('DIV'); //creating pagination area
	div.className = "pagination";
	let ul = document.createElement('UL'); //pagination list
	divpage.append(div); //appending pagination to the page
	div.append(ul); //appending list to pagination
	for (let i = 0; i < numberOfPages; i++) {
		let li = document.createElement('LI');
		let a = document.createElement('A');
		a.setAttribute('href', '#');
		a.textContent = i + 1;
		ul.append(li);
		li.append(a); //appending links to list items
	}
	let aa = document.querySelectorAll('.pagination >ul>li>a');
	aa[0].className = "active";
	let active = document.querySelector('.active');
	//setting the active class to the clicked pagination link 
	function setAction(event) {
		for (let i = 0; i < numberOfPages; i++) {
			aa[i].classList.remove('active');
		}
		let e = event.target;
		const currentPage = parseInt(e.textContent);
		showPage(listBooks, currentPage);
		e.classList.add('active');
	}
	for (let i = 0; i < numberOfPages; i++) {
		aa[i].addEventListener('click', (e) => {
			setAction(event);
		})
	}
}
//calling the functions 
showPage(listBooks, 1);
appendPageLinks(numberOfPages);
