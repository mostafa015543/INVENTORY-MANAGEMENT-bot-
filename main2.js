let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let delall = document.getElementById("delall");
let search = document.getElementById("search");


search.style.display = "none"
let mood = 'create';
let tmp;
let search_mood;

delall.style.display = "none";

function getTotal() {
    if (price.value != " ") {
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discound.value)
        total.innerHTML = result
        total.style.background = "green"
    } else {
        total.innerHTML = "";
        total.style.background = "red"

    }
}

let dataArray1
if (localStorage.product1 != null) {
    dataArray1 = JSON.parse(localStorage.product1)
} else {
    dataArray1 = []
}




submit.onclick = function () {
    let newProduct1 = {
        title: title.value,
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        discound: +discound.value,
        total: total.innerHTML,
        count: +count.value,
        category: category.value
    }


    if (newProduct1.count < 100 && title.value !="" &&price.value !="" &&taxes.value !="" &&ads.value !="" &&discound.value !=""){
            if (mood === 'create') {
        if (newProduct1.count > 1) {
            for (let i = 0; i < newProduct1.count; i++) {
                dataArray1.push(newProduct1)
            }
        } else {
            dataArray1.push(newProduct1)
        }
        
    } else {
        dataArray1[tmp] = newProduct1
        mood = 'create';

        submit.innerHTML = "create"
        count.style.display = "block"
    }
    }else{
        alert("fill all fields")
        return
    }



    localStorage.setItem("product1", JSON.stringify(dataArray1))
    clearData()
    showData()
    location.reload()

}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discound.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


function showData() {
    let table = ''

    for (let i = 0; i < dataArray1.length; i++) {
        table = `
                <tr>
                    <td>${i+(1)}</td>
                    <td>${dataArray1[i].title}</td>
                    <td>${dataArray1[i].price}</td>
                    <td>${dataArray1[i].taxes}</td>
                    <td>${dataArray1[i].ads}</td>
                    <td>${dataArray1[i].discound}</td>
                    <td>${dataArray1[i].total}</td>
                    <td>${dataArray1[i].category}</td>
                    <td><button  id="update" onclick="update(${i})" >update</button></td>
                    <td><button   onclick="deletei(${i})" id="delete">delete</button></td>

                </tr>
        `;
        tbody.innerHTML += table
    }
}

function deletei(i) {
    dataArray1.splice(i, 1);
    localStorage.product1 = JSON.stringify(dataArray1);
    window.location.reload()
    showData();
}

function deleteAll() {
    localStorage.removeItem("product1");
    dataArray1 = [];
    tbody.innerHTML = '';
    showData()
    clearData();
    if (dataArray1.length > 0) {
        delall.style.display = "block"

    } else {
        delall.style.display = "none"
    }

}


if (dataArray1.length > 0) {
    delall.style.display = "block"

} else {
    delall.style.display = "none"
}







function update(i) {
    title.value = dataArray1[i].title
    price.value = dataArray1[i].price
    taxes.value = dataArray1[i].taxes
    ads.value = dataArray1[i].ads
    discound.value = dataArray1[i].discound
    // total.value=dataArray1[i].total
    // count.value=dataArray1[i].count
    category.value = dataArray1[i].category
    submit.innerHTML = "update"
    getTotal()
    count.style.display = "none"
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}



delall.innerHTML += dataArray1.length



// function search_title() {
//     search_mood = "title"

// }

// function search_category() {
//     search_mood = "category"

// }



function search_search(id) {
    if (id === "searchTitle") {
        search.style.display = "block";
        search_mood = "title";
        search.focus();
        search.placeholder = "Search by title";
    } else if (id === "searchCategory") {
        search.style.display = "block";
        search_mood = "category";
        search.focus();
        search.placeholder = "Search by category";
    }
}

function search_auto(value) {
    let table = "";
    value = value.toLowerCase();
    if (search_mood === "title") {

        for (let i = 0; i < dataArray1.length; i++) {
            if (dataArray1[i].title.toLowerCase().includes(value)) {
                table += `
                            <tr>
                                <td>${i}</td>
                                <td>${dataArray1[i].title}</td>
                                <td>${dataArray1[i].price}</td>
                                <td>${dataArray1[i].taxes}</td>
                                <td>${dataArray1[i].ads}</td>
                                <td>${dataArray1[i].discound}</td>
                                <td>${dataArray1[i].total}</td>
                                <td>${dataArray1[i].category}</td>
                                <td><button  id="update" onclick="update(${i})" >update</button></td>
                                <td><button   onclick="deletei(${i})" id="delete">delete</button></td>

                            </tr>
                        `;
            }

        }



    } else if (search_mood === "category") {
        for (let i = 0; i < dataArray1.length; i++) {
            if (dataArray1[i].category.toLowerCase().includes(value)) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataArray1[i].title}</td>
                        <td>${dataArray1[i].price}</td>
                        <td>${dataArray1[i].taxes}</td>
                        <td>${dataArray1[i].ads}</td>
                        <td>${dataArray1[i].discound}</td>
                        <td>${dataArray1[i].total}</td>
                        <td>${dataArray1[i].category}</td>
                        <td><button onclick="update(${i})">Update</button></td>
                        <td><button onclick="deletei(${i})">Delete</button></td>
                    </tr>
                `;
            }
        }
    }
    tbody.innerHTML = table
}

showData()