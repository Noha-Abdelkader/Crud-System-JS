let productName = document.getElementById("productName");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteAllBtn = document.getElementById("deleteAllBtn");
let mood = "add product";
let tmp;
let searchName = document.getElementById("searchName");
let searchCategory = document.getElementById("searchCategory");

let categoryReq = document.getElementById('categoryReq');
let priceReq = document.getElementById('priceReq');
let nameReq = document.getElementById('nameReq');


// ------------- get data from localStorage------------------------------------------------------------
let productList= localStorage.products ? JSON.parse(localStorage.products) :[];

displayData(productList);

// -------- GET TOTAL --------------------------------------------------------------
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#f80000";
  }
}

// ----------- ADD PRODUCT ------------------------------------------------------------------------------
let countReq = document.getElementById('countReq');
countReq.style.display='none';


submit.onclick = () => {

  let productDetails = {
    productName: productName.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
 
if(!checkInputs())return;
 
if( checkInputs()){
    console.log('check');


  if (mood === "add product") {
    if (productDetails.count >= 1) {
      for (let i = 1; i <= productDetails.count; i++) {
        productList.push(productDetails);
      }
    }
    else{
      count.classList.replace('mb-3' , 'mb-1');
      countReq.style.display='block';
      return;
    }
  }
  else if (mood === "update product") {
    productList[tmp] = productDetails;
    submit.innerHTML = "create";
    count.style.display = "block";
    mood = "add prouct";
  }
  
  count.classList.replace('mb-1' , 'mb-3');
      countReq.style.display='none';

  
  localStorage.setItem("products", JSON.stringify(productList));
  clearData();
  displayData(productList);
  }

};

// ------ CLEAR DATA -----------------------------------------------------------------------------

function clearData() {
  productName.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// --------- DISPLAY DATA ------------------------------------------------------------------

function displayData(array) {
  let container = ``;
  getTotal();

  if(array.length >= 1){
  for (let i = 0; i < array.length; i++) {
  deleteAllBtn.style.display = "block";
  deleteAllBtn.innerText = `DeleteAll (${array.length})`;

      container += `
          <tr>
          <td>${i + 1}</td>
          <td>${array[i].productName}</td>
          <td>${array[i].total}</td>
          <td>${array[i].category}</td>
          <td><a id="update" class=" text-warning text-decoration-none " onclick="updateProduct(${i})">Update <i class='bx bxs-edit bx-tada' style='color:#FFC107'  ></i></a></td>
          <td><a id='delete' class=" text-danger text-decoration-none" onclick="deleteProduct(${i})">Delete <i class='bx bx-x-circle' style='color:#f80000' ></i></a></td>
      </tr>`;
    }
  
  }
  else{
    deleteAllBtn.style.display='none';
    container=`
    <tr >
    <td colspan='10' class='p-2 fw-bolder fs-5'><i class='bx bx-message-rounded-detail bx-tada' ></i> Not Found</td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = container;
}
// ---------- DEIETE PRODUCT -----------------------------------------------------------------
function deleteProduct(i) {
  productList.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  displayData(productList);
}

//--------- DELETE ALL -----------------------------------------------------------
function deleteAll() {
  productList.splice(0);
  localStorage.clear();
  displayData(productList);
  deleteAllBtn.style.display = "none";
}

// ------ UPDATE PRODUCT --------------------------------------------------------------------
function updateProduct(i) {
  productName.value = productList[i].productName;
  price.value = productList[i].price;
  taxes.value = productList[i].taxes;
  ads.value = productList[i].ads;
  discount.value = productList[i].discount;
  category.value = productList[i].category;
  getTotal();

  mood = "update product";
  submit.innerHTML = "Update";
  tmp = i;
  count.style.display = "none";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}


//-------- SEARCH ----------------------------------------------------

function searchBy(value, id) {
  if (id == "searchName") {
  searchByName(value);
  } 
  else if (id == "searchCategory") {
    searchByCategory(value);
  }
}
// --------- SEARCH BY Name--------------------------------------------------
function searchByName(value){
  let searchArray=[];
productList.map(product=>{
  if(product.productName.toLowerCase().includes(value.toLowerCase())){
    searchArray.push(product)
  }
} )
displayData(searchArray);
}
// ------- SEARCH BY CATEGORY --------------------------------------------------
function searchByCategory(value){
  let searchArray=[];
  productList.map(product=>{
    if(product.category.toLowerCase().includes(value.toLowerCase())){
      searchArray.push(product)
    }
  } )
  displayData(searchArray);
  }

//--------- EXISTING INPUT -----------------------------------------------------------------------

function existingInput(input , ele){
if(input.value !== ''){
ele.style.display = 'none';
return true;
}
else if (input.value === ''){
  ele.style.display = 'block';
return false;
}

}
// ----- check inputs --------------------------
function checkInputs(){
  let inputsAlert= document.getElementById('inputsAlert');
if ( (existingInput(productName , nameReq) && existingInput(category , categoryReq) && existingInput(price , priceReq))){
  inputsAlert.style.display='none';
  return true;
}
else{
  inputsAlert.style.display='block';
  return false;
}


}

// ------- animsition ------------------------------
$(document).ready(function() {
  $(".animsition-overlay").animsition()
  $(".animsition").animsition()
})