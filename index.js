import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref , push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL : "https://carts-db0d5-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemDatabase = ref(database,"items")

const addBtn = document.getElementById("add-button")
const inputField = document.getElementById("input-field")
const itemList = document.getElementById("item-list")

addBtn.addEventListener("click", function(){
    let inputValue = inputField.value

    push(itemDatabase,inputValue)

    clearvalue()
})

onValue(itemDatabase , function(snapshot){
    if(snapshot.exists()){let itemArray = Object.entries(snapshot.val())
        itemListclear()
        for(let i = 0; i < itemArray.length; i++){
        let currentItem = itemArray[i]
        let currentItemId = currentItem[0]
        let currentItemvalue = currentItem[1]
        appendItemToShoppingListEl(currentItem)
        }}
     else{
        itemList.innerHTML = `No Items In The Cart...`
     }
})

function itemListclear() {
    itemList.innerHTML = ""
}

function clearvalue(){
    inputField.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click",function(){
    let location = ref(database , `items/${itemId}`)
    remove(location)
    })
    itemList.append(newEl)
}