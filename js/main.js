var productContainer;
if(localStorage.getItem('ourProducts') != null){
    productContainer =JSON.parse(localStorage.getItem('ourProducts'));
    displayProduct();
}
else{
    productContainer =[];
}

var inputName=document.getElementById("inputName");
var inputPrice=document.getElementById("inputPrice");
var inputCategory=document.getElementById("inputCategory");
var inputDesc=document.getElementById("inputDesc");
var inputAddPro = document.getElementById("inputAddPro");
var inputUpdatePro=document.getElementById("inputUpdatePro");
var alertName =document.getElementById("alertName");
var alertPrice=document.getElementById("alertPrice");
var alertCategory=document.getElementById("alertCategory");
var alertDesc=document.getElementById("alertDesc");
///////////////////////////////////////////////////////////////////////////
//   Add New Product.
function addProduct(){
if(validateProduct() &&
    (validateProPrice()) &&
    (validateProCat()) &&
    (validateProCat())
    ){
        product = {
            name : inputName.value,
            price : inputPrice.value,
            category : inputCategory.value,
            desc : inputDesc.value
        }
        productContainer.push(product);
        localStorage.setItem('ourProducts' , JSON.stringify(productContainer));
        console.log(productContainer);
        clearForm()
        displayProduct();
        inputAddPro.removeAttribute("disabled");
    }else{
        inputAddPro.setAttribute("disabled","true");
    }
   

}

/////////////////////////////////////////////////////////////////
//   Clear From form Data after send it.
function clearForm(){
    inputName.value="";
    inputPrice.value="";
    inputCategory.value="";
    inputDesc.value="";
}
/////////////////////////////////////////////////////////////////
//   Display all Products in table.
function displayProduct(){
    var table =``;

    for(var i = 0; i < productContainer.length ;i++){
        table += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button class="btn btn-outline-warning" onclick='updateProduct(${i})'>Update</button></td>
        <td><button class="btn btn-outline-danger" onclick='deleteProduct(${i})'>Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = table;
}
/////////////////////////////////////////////////////////////////////////
//   Delete specific Product.
function deleteProduct(index){
productContainer.splice(index , 1);
localStorage.setItem('ourProducts' , JSON.stringify(productContainer));
displayProduct();

}

///////////////////////////////////////////////////////////////////
// Search for Product ..
function searchProduct(term){
    var table =``;
    for(var i=0 ; i< productContainer.length ; i++){

        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
        table += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button class="btn btn-outline-warning" onclick='updateProduct(${i})'>Update</button></td>
        <td><button class="btn btn-outline-danger" onclick='deleteProduct(${i})'>Delete</button></td>
        </tr>`;
        }    
    }
    document.getElementById("tableBody").innerHTML = table;
}

////////////////////////////////////////////////////////////////////////
//  Update Product

function updateProduct(index){
    
    inputAddPro.style.display="none";
    inputUpdatePro.style.display="block";
    console.log(index);
    productContainer =JSON.parse(localStorage.getItem('ourProducts'));
    
    inputName.value = productContainer[index].name;
    inputPrice.value = productContainer[index].price;
    inputCategory.value =productContainer[index].category;
    inputDesc.value = productContainer[index].desc;
    

inputUpdatePro.addEventListener('click' ,(e) => {
    e.preventDefault();
if(validateProduct() &&
    (validateProPrice()) &&
    (validateProCat()) &&
    (validateProCat())
    ){
    productContainer.splice(index, 1, { 
        name: inputName.value, 
        price: inputPrice.value,
        category:inputCategory.value,
        desc:inputDesc.value    
    })
    localStorage.setItem('ourProducts' , JSON.stringify(productContainer));
    clearForm();
    displayProduct();
}else{
    inputUpdatePro.setAttribute("disabled","true");
}
})

}
//////////////////////////////////////////////////////////////////////////////
// Validate Product.
function validateProduct(){
    var regexName =/^[A-Z][a-z A-Z]{3,}/;
    if (regexName.test(inputName.value) == true){
        alertName.classList.remove("d-block");
        alertName.classList.add("d-none");
        inputAddPro.removeAttribute("disabled");
        inputUpdatePro.removeAttribute("disabled");
        return true;
    }else{
        alertName.classList.remove("d-none");
        alertName.classList.add("d-block");
        inputAddPro.setAttribute("disabled", "true");
        inputUpdatePro.setAttribute("disabled", "true");
        return false;
    }

}
//////////////////////////////////////////////////////////////
function validateProPrice(){
    var regexPrice =/^[1-9][0-9]{3,}/;
    if(regexPrice.test(inputPrice.value) == true){
        alertPrice.classList.remove("d-block");
        alertPrice.classList.add("d-none");
        inputAddPro.removeAttribute("disabled");
        inputUpdatePro.removeAttribute("disabled");
        return true;
    }else{
        alertPrice.classList.remove("d-none");
        alertPrice.classList.add("d-block");
        inputAddPro.setAttribute("disabled", "true");
        inputUpdatePro.setAttribute("disabled", "true");
        return false;
    }

}
////////////////////////////////////////////////////////////
function validateProCat(){
    var regexCategory =/(mobile|laptop|tv)/;
    if(regexCategory.test(inputCategory.value) == true){
        alertCategory.classList.remove("d-block");
        alertCategory.classList.add("d-none");
        inputAddPro.removeAttribute("disabled");
        inputUpdatePro.removeAttribute("disabled");
        return true;
    }else{
        alertCategory.classList.remove("d-none");
        alertCategory.classList.add("d-block");
        inputAddPro.setAttribute("disabled", "true");
        inputUpdatePro.setAttribute("disabled", "true");
        return false;
    }
}
///////////////////////////////////////////////////////////////
function validateProDesc(){
  var regexDesc = /^.{30,}$/;
    if(regexDesc.test(inputDesc.value) == true){
        alertDesc.classList.remove("d-block");
        alertDesc.classList.add("d-none");
        inputAddPro.removeAttribute("disabled");
        inputUpdatePro.removeAttribute("disabled");
        return true;
    }else{
        alertDesc.classList.remove("d-none");
        alertDesc.classList.add("d-block");
        inputAddPro.setAttribute("disabled", "true");
        inputUpdatePro.setAttribute("disabled", "true");
        return false;
    }
}
inputName.addEventListener("blur", validateProduct);
inputPrice.addEventListener("blur", validateProPrice);
inputCategory.addEventListener("blur", validateProCat);
inputDesc.addEventListener("blur", validateProDesc);

