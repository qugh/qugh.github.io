let page_number_value = 1;

let data_array = {
    'positions': [],
    'locations': ["Asuncion", "Bangkok", "Barranquilla", "Bogota", "Valencia", "Guatemala", "Gomel", "Dallas", "Jaipur", "Dnipropetrovsk"],
    'prices': []
}
for (let i = 0; i < 100; i++) {
    data_array.positions.push(i + 1);
    data_array.prices.push(Math.floor(Math.random() * 100))
}

localStorage.setItem('table_data', JSON.stringify(data_array));

let my_data = JSON.parse(localStorage.getItem('table_data'));
let page_buttons_selector;
let page_selector = document.querySelector('#page_selector');
let likeButton = document.querySelectorAll('.like');
let likePicture = document.querySelector('.like_img')

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
            item.children[1].innerHTML='Inactive tab'
        })
        e.currentTarget.children[1].innerHTML='Active tab'
        e.currentTarget.classList.add('active');
    }
    )
}
)


let renderElements = (elemsOnPage, page_number) => {
    table_elements.innerHTML = ''; // while(table_elements.firstChild...(remove)) можно так..
    table_elements.style.opacity = "0"

    for (let i = (elemsOnPage * page_number) - (elemsOnPage); i < elemsOnPage * page_number; i++) {
        if (my_data.positions[i])
            table_elements.insertAdjacentHTML('beforeend', ` <tr> <th>${my_data.positions[i]}</th><th>${my_data.locations[i] || 'default '}</th><th>${my_data.prices[i]} y.e.</th></tr>`)
    }
    setTimeout(() => table_elements.style.opacity = "1", 300);
}


let page_switch = () => {
    page_buttons_selector.forEach(item => {
        let elemsOnPage_value = +page_selector.value;
        item.addEventListener('click', (e) => {
            page_buttons_selector.forEach(item => {
                item.classList.remove('active')
                e.currentTarget.classList.add('active')
            })

            page_number_value = +e.target.id.slice(4);

            renderElements(elemsOnPage_value, page_number_value);
        })
    })
}




//render pages block on change condition
let updatePageCounter = (elems_count, elems_on_page) => {

    let pages_count = Math.ceil(elems_count / elems_on_page);
    pages_counter.innerHTML = '';

    for (let i = 0; i < pages_count; i++)
        pages_counter.insertAdjacentHTML('beforeend', `<div><button class="${i == 0 ? 'active page_button' : 'page_button'}" id="page${i + 1}">${i + 1}</button></div>`)
    page_buttons_selector = document.querySelectorAll('.page_button');
    pages_counter.style.gridTemplateColumns = `repeat(${(pages_count < 10) ? pages_count : 10},1fr)`;
    page_switch();
}




//first render of elements
let firstRender = () => {

    for (let i = 0; i < page_selector.value; i++)
        table_elements.insertAdjacentHTML('beforeend', ` <tr> <th>${my_data.positions[i]}</th><th>${my_data.locations[i] || 'default '}</th><th>${my_data.prices[i]} y.e.</th></tr>`)
        
}
// render elements provided that the number of elements on the page changes
page_selector.addEventListener("change", (e) => {

    page_number_value = 1;
    table_elements.innerHTML = ''; // while(table_elements.firstChild...(remove))
    table_elements.style.opacity = "0"

    for (let i = 0; i < e.currentTarget.value; i++) {
        table_elements.insertAdjacentHTML('beforeend', ` <tr> <th>${my_data.positions[i]}</th><th>${my_data.locations[i] || 'default '}</th><th>${my_data.prices[i]} y.e.</th></tr>`)

    }

    setTimeout(() => table_elements.style.opacity = "1", 300);
    updatePageCounter(my_data.positions.length, e.currentTarget.value);
    page_buttons_selector[0].classList.add('active');
})


// like method

likeButton.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.children[0])
            e.target.children[0].classList.contains("like_test") ? e.target.children[0].classList.remove("like_test") : e.target.children[0].classList.add("like_test")
        else
            e.target.classList.contains("like_test") ? e.target.classList.remove("like_test") : e.target.classList.add("like_test")



    })
})
firstRender();
//first render pages block
updatePageCounter(my_data.positions.length, page_selector.value);








//add active class each child + render elements on pageNumber change

nextButton.addEventListener('click', () => {

    let elemsOnPage_value = +page_selector.value;


    if (page_number_value < page_buttons_selector.length) {
        page_buttons_selector.forEach(item =>
            item.classList.remove('active'))

        ++page_number_value;

        renderElements(elemsOnPage_value, page_number_value)

        page_buttons_selector[page_number_value - 1].classList.add('active');
    }

}
)

backButton.addEventListener('click', () => {

    let elemsOnPage_value = +page_selector.value;

    if (page_number_value > 1) {

        page_buttons_selector.forEach(item =>
            item.classList.remove('active'))
        --page_number_value;
        renderElements(elemsOnPage_value, page_number_value)
        page_buttons_selector[page_number_value - 1].classList.add('active');
    }

}
)

