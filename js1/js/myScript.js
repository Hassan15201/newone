// var nameInput=document.getElementById("productName");
// var categoryInput=document.getElementById("productCategory");
// var priceInput=document.getElementById("productPrice");
// var descriptionInput=document.getElementById("productDescription");
// var tbody=document.getElementById("tbody");
// var searshInput=document.getElementById("searchInput");
// let err0 =document.querySelector(".error-0")
// let sus_0 = document.getElementById("sus-0")
// let sus_1 = document.getElementById("sus-1")
// let sus_2 = document.getElementById("sus-2")
// let sus_3 = document.getElementById("sus-3")
// let err_0 = document.getElementById("err-0")
// let err_1 = document.getElementById("err-0")
// let err_2 = document.getElementById("err-0")
// let err_3 = document.getElementById("err-0")
var i="";

if(localStorage.getItem("ProductsStorage")==null){
    var products=[];
}else{
    var products=JSON.parse(localStorage.getItem("ProductsStorage"));
}
function addProducts(){
    // if (nameInput.value=="" && categoryInput.value=="" && priceInput.value=="" && priceInput.value==""&&descriptionInput.value=="") {
    //     err0.textContent="fill all fields";
    //     err_0.classList.add("visible")
    // }
    // else{
        if (nameInput.value=="") {
            err0.textContent="Name cannot be blank";
            err_0.classList.add("visible")
        }
        else if(categoryInput.value==""){
            err_1.classList.add("visible")
            err0.textContent="category cannot be blank";
        }
        else if(isNaN(priceInput.value)){
            err_2.classList.add("visible")
            err0.textContent="Price must be number";
        }
        else if(priceInput.value==""){
            err_2.classList.add("visible")
            err0.textContent="Price cannot be blank";
        }
        else if(descriptionInput.value==""){
            err_3.classList.add("visible")
            err0.textContent="Description cannot be blank";
        }
        else
        {
            var product = {
                pname : nameInput.value.toLowerCase(),
                pcat : categoryInput.value,
                pprice : Number(priceInput.value),
                pdesc: descriptionInput.value,
            }
            err0.textContent=""
            clearIcon()
            console.log(product);
            products.push(product);
            localStorage.setItem("ProductsStorage",JSON.stringify(products));
            displayproduct();
            clearproduct();
            }
    }
// }
function checkName(){
    if (nameInput.value=="") {
        err_0.classList.add("visible")
        sus_0.classList.remove("visible")
    }
    else{
        sus_0.classList.add("visible")
        err_0.classList.remove("visible")
    }
}
function checkCategory(){
    if (categoryInput.value=="") {
        err_1.classList.add("visible")
        sus_1.classList.remove("visible")
    }
    else{
        sus_1.classList.add("visible")
        err_1.classList.remove("visible")
    }
}
function checkPrice(){
    if (isNaN(priceInput.value)) {
        err_2.classList.add("visible")
        sus_2.classList.remove("visible")
    }
    else if(priceInput.value==""){
        err_2.classList.add("visible")
        sus_2.classList.remove("visible")
    }
    else{
        sus_2.classList.add("visible")
        err_2.classList.remove("visible")
    }
}
function checkDescription(){
    if (descriptionInput.value=="") {
        err_3.classList.add("visible")
        sus_3.classList.remove("visible")
    }
    else{
        sus_3.classList.add("visible")
        err_3.classList.remove("visible")
    }
}
function clearproduct(){
    nameInput.value="";
    categoryInput.value="";
    priceInput.value="";
    descriptionInput.value="";
    clearIcon()
}
function displayproduct(){
    var str="";
    for(var i=0; i<products.length; i++){
        str +=`<tr>
        <td>${i+1}</td>
        <td>${products[i].pname}</td>
        <td>${products[i].pcat}</td>
        <td>${products[i].pprice}</td>
        <td>${products[i].pdesc}</td>
        <td>
        <button class="btn btn-warning" onclick="updateproduct(${i})"> update</button>
        </td>
        <td>
        <button class="btn btn-outline-dark"> details</button>
        </td>
        <td>
        <button class="btn btn-danger" onclick="deleteproduct(${i})"> delete</button>
        </td>
        </tr>`
    }
    tbody.innerHTML=str;
}
function clearIcon(){
    sus_0.classList.remove("visible")
    sus_1.classList.remove("visible")
    sus_2.classList.remove("visible")
    sus_3.classList.remove("visible")
    err_0.classList.remove("visible")
    err_1.classList.remove("visible")
    err_2.classList.remove("visible")
    err_3.classList.remove("visible")
    err0.textContent=""
}
displayproduct();
var button =document.getElementById("update");
function updateproduct(k){
    details()
    nameInput.value=products[k].pname;
    categoryInput.value=products[k].pcat;
    priceInput.value=products[k].pprice;
    descriptionInput.value=products[k].pdesc;
    updateButton.innerHTML="update product";
    updateButton.classList.add("btn-secondary" , "text-white");
    updateButton.onclick=function(){
        products=JSON.parse(localStorage.getItem("ProductsStorage"));
        products[k].pname=nameInput.value;
        products[k].pcat.categoryInput;
        products[k].pprice= priceInput.value;
        products[k].pdesc=descriptionInput.value;
        localStorage.setItem("ProductsStorage",JSON.stringify(products));
        displayproduct();
        clearproduct();
        updateButton.innerHTML="add product";
        updateButton.classList.remove("btn-secondary" , "text-white");
        updateButton.onclick=function(){
        addProducts();
        }
    }
    
}

function deleteproduct(d){
    console.log(d)
    products.splice(d,1)
    localStorage.setItem("ProductsStorage",JSON.stringify(products));
    displayproduct()
    if(products.length===0){
        localStorage.clear()
    }
}
function search(v){
    let str="";
    for (let i = 0; i < products.length; i++) {
        if(products[i].pname.includes(v.toLowerCase())){  
            str +=`<tr>
            <td>${i+1}</td>
            <td>${products[i].pname.replace(v.toLowerCase(),`<mark>${v.toLowerCase()}</mark>`)}</td>
            <td>${products[i].pcat}</td>
            <td>${products[i].pprice}</td>
            <td>${products[i].pdesc}</td>
            <td>
            <button class="btn btn-warning" onclick="updateproduct(${i})"> update</button>
            </td>
            <td>
            <button class="btn btn-danger" onclick="deleteproduct(${i})"> delete</button>
            </td>
            </tr>`
            // console.log(products[i].pname.replace(v,`<b>${v}<b/>`))
        } 
    }
    tbody.innerHTML=str;
    if(v==""){
        localStorage.setItem("ProductsStorage",JSON.stringify(products));
        displayproduct();
    }
}
function details(){
    let overlay = document.createElement("div")
    overlay.classList.add("pop-overlay")
    document.body.appendChild(overlay)
    let popBox= document.createElement("div")
    popBox.className="popBox"
    document.body.appendChild(popBox)
    let closeButton = document.createElement("span")
    let closeButtonText = document.createTextNode("X")
    closeButton.appendChild(closeButtonText)
    closeButton.classList.add("closeButton")
    let infoo = `
    <div class="container rounded ">
    <div>
    <h1 class="mb-4">CRUD productPrice system</h1>
    <div class="position-relative">
        <label>productName:</label>
        <input id="productName" onblur="checkName()" type="text" class="form-control my-2">
        <span class="icon"  id="sus-0"><i class="fas fa-check-circle text-success "></i></span>
        <span class="icon" id="err-0"><i class="fas fa-exclamation-circle text-danger" ></i></span>
    </div>
    <div class="position-relative"> 
        <label>productCategory:</label>
        <input id="productCategory" onblur="checkCategory()" type="text"  class="form-control my-2">
        <span class="icon" id="sus-1"><i class="fas fa-check-circle text-success"></i></span>
        <span class="icon" id="err-1"><i class="fas fa-exclamation-circle text-danger" ></i></span>
    </div>
    <div class="position-relative">
        <label>productPrice:</label>
        <input id="productPrice" onblur="checkPrice()" type="text" class="form-control my-2">
        <span class="icon" id="sus-2"><i class="fas fa-check-circle text-success"></i></span>
        <span class="icon" id="err-2"><i class="fas fa-exclamation-circle text-danger" ></i></span>
    </div>
    <div class="position-relative">
        <label>productDescription:</label>
        <textarea id="productDescription" onblur="checkDescription()" class="form-control my-2"></textarea>
        <span class="icon" id="sus-3"><i class="fas fa-check-circle text-success"></i></span>
        <span class="icon" id="err-3"><i class="fas fa-exclamation-circle text-danger" ></i></span>
    </div>
    <button id="update-1" class="btn btn-outline-dark my-3 " onclick="addProducts()">add product</button>
    <button class="btn btn-outline-dark my-3" onclick="clearproduct() ">clear</button>
    <p class="error-0" style="color: #d80016;"></p>
    `
    popBox.innerHTML=infoo
    popBox.appendChild(closeButton)
    nameInput=document.getElementById("productName");
    categoryInput=document.getElementById("productCategory");
    priceInput=document.getElementById("productPrice");
    descriptionInput=document.getElementById("productDescription");
    tbody=document.getElementById("tbody");
    searshInput=document.getElementById("searchInput");
    updateButton=document.querySelector("#update-1")
    console.log(updateButton)
    err0 =document.querySelector(".error-0")
    sus_0 = document.getElementById("sus-0")
    sus_1 = document.getElementById("sus-1")
    sus_2 = document.getElementById("sus-2")
    sus_3 = document.getElementById("sus-3")
    err_0 = document.getElementById("err-0")
    err_1 = document.getElementById("err-1")
    err_2 = document.getElementById("err-2")
    err_3 = document.getElementById("err-3")
}
document.addEventListener("click",function(e){
    if (e.target.classList=="closeButton") {
        e.target.parentNode.remove()
        document.querySelector(".pop-overlay").remove()
    }
})
let overlayBody =document.createElement("div")
overlayBody.classList.add("overlay_Body")
document.body.appendChild(overlayBody)