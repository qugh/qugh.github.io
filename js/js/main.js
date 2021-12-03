let page_number_value = 1;
let currentPageButton=document.querySelector('.current_page_button');
let data_array = {
    'positions': [],
    'locations': ["Asuncion", "Bangkok", "Barranquilla", "Bogota", "Valencia", "Guatemala", "Gomel", "Dallas", "Jaipur", "Dnipropetrovsk"],
    'prices': []
}
for (let i = 0; i < 100; i++) {
    data_array.positions.push(i + 1);
    data_array.prices.push(Math.floor(Math.random() * 100))
}
let currentPage = document.querySelector('.current_page');
let updateCurrentPage = (value) => {
    currentPage.innerHTML = `Current page: ${value}`;
}

localStorage.setItem('table_data', JSON.stringify(data_array));

let my_data = JSON.parse(localStorage.getItem('table_data'));
let page_buttons_selector;
let page_selector = document.querySelector('#page_selector');
let elemsOnPage_value = +page_selector.value;
let likeButton = document.querySelectorAll('.like');
let likePicture = document.querySelector('.like_img')
let jumpInput = document.querySelector('.jump_toThePage')
let jumpButton = document.querySelector('.jump_button')

let nextButton = document.querySelector('.next_button');
let backButton = document.querySelector('.back_button');
let pages_counter = document.querySelector('.pages_counter');
const tabs = document.querySelectorAll('.tabs_item');

const my_tabs = [, document.querySelector('.main_content'),
    document.querySelector('.tab2'),
    document.querySelector('.tab3')];

// костыль переключения вкладок..
tabs[0].addEventListener('click', (e) => {
    my_tabs[1].style.display = "block";
    my_tabs[2].style.display = "none";
    my_tabs[3].style.display = "none";
})

tabs[1].addEventListener('click', (e) => {
    my_tabs[1].style.display = "none";
    my_tabs[2].style.display = "block";
    my_tabs[3].style.display = "none";
})

tabs[2].addEventListener('click', (e) => {
    my_tabs[1].style.display = "none";
    my_tabs[2].style.display = "none";
    my_tabs[3].style.display = "block";
})

//tabs active class
tabs.forEach(item => {
    item.addEventListener('click', (e) => {
        tabs.forEach(item => {

            item.classList.remove('active')
            item.children[1].innerHTML = 'Inactive tab'
        })
        e.currentTarget.children[1].innerHTML = 'Active tab'
        e.currentTarget.classList.add('active');
    }
    )
}
)

let switchMainPageButton = () =>{
    currentPageButton.children[1].innerHTML=`<button class="page_counter_square" id="page${page_number_value}">${page_number_value}</button>`;
 
    console.log(page_number_value)
}

let renderElements = (elemsOnPage, page_number) => {
    table_elements.innerHTML = ''; // while(table_elements.firstChild...(remove)) можно так..
    table_elements.style.opacity = "0"

    for (let i = (elemsOnPage * page_number) - (elemsOnPage); i < elemsOnPage * page_number; i++) {
        if (my_data.positions[i])
            table_elements.insertAdjacentHTML('beforeend', ` <tr> <th>${my_data.positions[i]}</th><th>${my_data.locations[i] || 'default '}</th><th>${my_data.prices[i]} y.e.</th></tr>`)
    }
    setTimeout(() => table_elements.style.opacity = "1", 300);
    //updateCurrentPage(+page_number_value);
    
    switchMainPageButton();

}



let page_switch = () => {

    page_buttons_selector.forEach(item => {
     
        elemsOnPage_value = +page_selector.value;
        item.addEventListener('click', (e) => {

            page_buttons_selector.forEach(item => {
                item.classList.remove('active')
                e.currentTarget.classList.add('active')
            })

            page_number_value = +e.target.id.slice(4);
            renderElements(elemsOnPage_value, page_number_value)
    
        })
    })


}







//render pages block on change condition
let updatePageCounter = (elems_count, elems_on_page) => {
    let page_jumper = document.querySelector('.jump_block');
    let pages_count = Math.ceil(elems_count / elems_on_page);
    pages_counter.innerHTML = '';
    if (pages_count > 9) {
        pages_counter.style.gridGap='0px';
        for (let i = 0; i < 3; i++)
            pages_counter.insertAdjacentHTML('beforeend', `<div><button class="${i == 0 ? 'active page_button' : 'page_button'}" id="page${i + 1}">${i + 1}</button></div>`)

        pages_counter.insertAdjacentHTML('beforeend', `<div class='current_page_button'><span style="margin-right:5px;">...  </span><span><button class='page_counter_square' id="page${page_number_value}">${page_number_value}</button></span><span style="padding-left:5px;">...  </span></div>`)
        currentPageButton=document.querySelector('.current_page_button');
        for (let j = pages_count - 3; j < pages_count; j++) {
            pages_counter.insertAdjacentHTML('beforeend', `<div><button class="${j == 0 ? 'active page_button' : 'page_button'}" id="page${j + 1}">${j + 1}</button></div>`)
        }

        page_buttons_selector = document.querySelectorAll('.page_button');

        pages_counter.style.gridTemplateColumns = `repeat(7,1fr)`;

        page_jumper.style.display = 'block';
    }
    else {
        pages_counter.style.gridGap='19px';
        for (let i = 0; i < pages_count; i++)
            pages_counter.insertAdjacentHTML('beforeend', `<div><button class="${i == 0 ? 'active page_button' : 'page_button'}" id="page${i + 1}">${i + 1}</button></div>`)
        page_buttons_selector = document.querySelectorAll('.page_button');
        pages_counter.style.gridTemplateColumns = `repeat(${(pages_count < 10) ? pages_count : 10},1fr)`;

        page_jumper.style.display = 'none';
    }
    page_switch();

}





// render elements provided that the number of elements on the page changes
page_selector.addEventListener("change", (e) => {

    page_number_value = 1;
    table_elements.innerHTML = ''; // while(table_elements.firstChild...(remove))
    table_elements.style.opacity = "0"




    renderElements(e.currentTarget.value, 1)
    //updateCurrentPage(page_number_value);
    setTimeout(() => table_elements.style.opacity = "1", 300);
    updatePageCounter(my_data.positions.length, e.currentTarget.value);
    page_buttons_selector[0].classList.add('active');
})



//first render pages block
updatePageCounter(my_data.positions.length, page_selector.value);
//first render of elements

renderElements(elemsOnPage_value, page_number_value)

//add active class each child + render elements on pageNumber change

nextButton.addEventListener('click', () => {

    elemsOnPage_value = +page_selector.value;

    if (+page_number_value < page_buttons_selector[page_buttons_selector.length - 1].id.slice(4)) {
        page_buttons_selector.forEach(item =>
            item.classList.remove('active'))

        ++page_number_value;

        renderElements(elemsOnPage_value, page_number_value)





        page_buttons_selector.forEach(item => {
            if (item.id.slice(4) == +page_number_value) {
                item.classList.add('active')
            }
        })

    }

}
)

backButton.addEventListener('click', () => {
    elemsOnPage_value = +page_selector.value;

    if (page_number_value > 1) {

        page_buttons_selector.forEach(item =>
            item.classList.remove('active'))
        --page_number_value;
        renderElements(elemsOnPage_value, page_number_value)
        page_buttons_selector.forEach(item => {
            if (item.id.slice(4) == +page_number_value) {
                item.classList.add('active')
            }
        })
    }

}
)


// like method

likeButton.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.children[0])
            e.target.children[0].classList.contains("like_test") ? e.target.children[0].classList.remove("like_test") : e.target.children[0].classList.add("like_test")
        else
            e.target.classList.contains("like_test") ? e.target.classList.remove("like_test") : e.target.classList.add("like_test")



    })
})

jumpButton.addEventListener('click', (e) => {
    let jumpAlertSpan = document.querySelector('.jump_Alert')
    let pages_count = Math.ceil(my_data.positions.length / elemsOnPage_value);
    if (jumpInput.value > 0 && jumpInput.value <= pages_count) {
        page_buttons_selector.forEach(item => {

            if (item.id.slice(4) == +page_number_value)
                item.classList.remove('active')

        })

        let newPage = +jumpInput.value;
        renderElements(elemsOnPage_value, newPage)
       // updateCurrentPage(newPage);
        page_buttons_selector.forEach(item => {
            if (item.id.slice(4) == newPage) {
                item.classList.add('active')
            }
            jumpInput.value = '';
        })
        page_number_value = newPage;
    }
    else {
        jumpAlertSpan.style.opacity = '1';
        jumpAlertSpan.innerHTML = 'Bad value';
        setTimeout(() => {
            jumpAlertSpan.style.opacity = '0'
            jumpInput.value = '';
        }, 1500)
    }
}
)
let checkValue = (object) => {
    let pages_count = Math.ceil(my_data.positions.length / elemsOnPage_value);
    if (object.value > pages_count)
        object.value = pages_count;
}
