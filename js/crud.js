var WebsiteNameInput = document.getElementById("WebsiteNameInput");
var WebsiteURLInput = document.getElementById("WebsiteURLInput");
var searchInput = document.getElementById("searchInput");
var myTable = document.getElementById("tableBody")
var updateBtn = document.getElementById("updateBtn")
var addBtn = document.getElementById("addBtn");
var cardValidation = document.getElementById("cardValidation");

var websiteList = [];
var indexUpdate = 0;


if (localStorage.getItem("websites") != null) {
    websiteList = JSON.parse(localStorage.getItem("websites"));
    displayData();

}


function addWebsite() {
    if (validationName() && validationURL()) {
        var website = {
            name: WebsiteNameInput.value,
            url: WebsiteURLInput.value,
        }

        websiteList.push(website);
        localStorage.setItem("websites", JSON.stringify(websiteList));
        displayData();
        clearForm();
    } else {
        cardValidation.classList.remove("d-none");
    }


}

function clearForm() {
    //clear Data from input
    WebsiteNameInput.value = ""
    WebsiteURLInput.value = ""

}

function displayData() {


    var data = "";
    for (var i = 0; i < websiteList.length; i++) {
        data += `<tr>
        <td>${i+1}</td>
        <td>${websiteList[i].name}</td>
        <td><a href="${websiteList[i].url}" target="_blank"><button class="btn btn-sm btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a>
        </td>
        <td><button onclick="setData(${i})" class="btn  btn-sm upd-data">update</button></td> 
        <td><button onclick="deleteItem(${i})" class="btn  btn-sm del-data">delete</button></td>
    </tr>
        
        `
    }
    myTable.innerHTML = data;
}

function deleteItem(index) {
    websiteList.splice(index, 1);
    localStorage.setItem("websites", JSON.stringify(websiteList));

    displayData();
}

function searchItem() {
    var term = searchInput.value;


    var data = "";
    for (var i = 0; i < websiteList.length; i++) {

        if (websiteList[i].name.toLowerCase().includes(term.toLowerCase())) {
            data += `<tr>
        <td>${i+1}</td>
        <td>${websiteList[i].name}</td>
        <td><a href="${websiteList[i].url}" target="_blank"><button class="btn btn-sm btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a>
        </td>
        <td><button onclick="setData(${i})" class="btn  btn-sm upd-data">update</button></td> 
        <td><button onclick="deleteItem(${i})" class="btn  btn-sm del-data">delete</button></td>
    </tr>
        
        `

        }

    }
    myTable.innerHTML = data;

}

function setData(index) {

    indexUpdate = index; // to use it in the update product

    var currentWebsite = websiteList[index];
    WebsiteNameInput.value = currentWebsite.name;
    WebsiteURLInput.value = currentWebsite.url;

    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");

}

function updateWebsite() {
    var website = {
        name: WebsiteNameInput.value,
        url: WebsiteURLInput.value,
    }

    if (validationName() && validationURL()) {
        websiteList.splice(indexUpdate, 1, website);
        localStorage.setItem("websites", JSON.stringify(websiteList));;
        displayData();

        updateBtn.classList.add("d-none");
        addBtn.classList.remove("d-none");
        clearForm();
    } else {
        cardValidation.classList.remove("d-none");
    }

}

function removeCard() {
    cardValidation.classList.add("d-none");
}


//validation


function validationName() {
    var text = WebsiteNameInput.value;
    var regexName = /^\w{3,}(\s+\w+)*$/;

    if (regexName.test(text)) {

        WebsiteNameInput.classList.add("is-valid");
        WebsiteNameInput.classList.remove("is-invalid");
        return true;



    } else {

        WebsiteNameInput.classList.remove("is-valid");
        WebsiteNameInput.classList.add("is-invalid");
        return false;
    }
}



function validationURL() {
    var text = WebsiteURLInput.value;
    var regexName = /^(https?|http):\/\/(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

    if (regexName.test(text)) {

        WebsiteURLInput.classList.add("is-valid");
        WebsiteURLInput.classList.remove("is-invalid");
        return true;



    } else {

        WebsiteURLInput.classList.remove("is-valid");
        WebsiteURLInput.classList.add("is-invalid");
        return false;
    }
}