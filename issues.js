// issues.js api coll

const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container = document.getElementById("issuesContainer")
function setActiveButton(activeId){
    const buttons = ["allBtn", "openBtn", "closedBtn"]
    buttons.forEach(id => {
        const btn = document.getElementById(id)
        btn.classList.remove("bg-[#4A00FF]","text-white")
    })
    document.getElementById(activeId).classList.add("bg-[#4A00FF]","text-white")
}

// loding sppner
function showLoading(){
container.innerHTML = `
<div class="col-span-4 flex justify-center">
<span class="loading loading-spinner loading-lg"></span>
</div>
`
}

// loded all issue
function loadIssues(){
setActiveButton("allBtn")
showLoading()

fetch(API)
.then(res => res.json())
.then(data => {

const issues = data.data

const total = issues.length
const open = issues.filter(issue => issue.status === "open").length;
const closed = issues.filter(issue => issue.status === "closed").length;


document.getElementById("totalIssues").innerText = total;
document.getElementById("openCount").innerText = open;
document.getElementById("closedCount").innerText = closed;

showIssues(issues)

})

}

//issue card show
function showIssues(issues){

container.innerHTML = ""

issues.forEach(issue => {

let borderColor = "border-green-500"
let iconColor = "text-green-500"
let iconBg = "bg-green-100"

if(issue.status === "closed"){
borderColor = "border-purple-500"
iconColor = "text-purple-500"
iconBg = "bg-purple-100"
}

const card = document.createElement("div")

card.className = `bg-white rounded-lg shadow border-t-4 ${borderColor} p-5 cursor-pointer`

card.innerHTML = `

<div class="flex justify-between items-center mb-3">
<img src="./assets/Open-Status.png" alt="">

<span class="bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full">
${issue.priority}
</span>

</div>

<h2 class="font-semibold text-lg mb-2">
${issue.title}
</h2>

<p class="text-gray-500 text-sm mb-3">
${issue.description}
</p>

<div class="flex gap-2 mb-4">

<span class="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full">
BUG
</span>

<span class="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
HELP WANTED
</span>

</div>

<div class="border-t pt-3 text-sm text-gray-500">

<p>#${issue.id} by ${issue.author}</p>
<p>${issue.createdAt}</p>

</div>

`


card.addEventListener("click", () => {

openModal(issue.id)

})

container.appendChild(card)

})

}

// issu card open
function loadOpenIssues(){
    setActiveButton("openBtn")

showLoading()

fetch(API)
.then(res => res.json())
.then(data => {

const openIssues = data.data.filter(issue => issue.status === "open")

showIssues(openIssues)

})

}


// issue card close
function loadClosedIssues(){
    setActiveButton("closedBtn")

showLoading()

fetch(API)
.then(res => res.json())
.then(data => {

const closedIssues = data.data.filter(issue => issue.status === "closed")

showIssues(closedIssues)

})

}


// Search issues
function searchIssues(){

const text = document.getElementById("searchInput").value

showLoading()

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)
.then(res => res.json())
.then(data => {

showIssues(data.data)

})

}



function openModal(id){

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
.then(res => res.json())
.then(data => {

const issue = data.data

const modal = document.createElement("div")

modal.className = "fixed inset-0 bg-black/40 flex justify-center items-center"

modal.innerHTML = `

<div class="bg-white p-6 rounded-lg w-[400px]">

<h2 class="text-xl font-semibold mb-3">
${issue.title}
</h2>

<p class="text-gray-600 mb-4">
${issue.description}
</p>

<p><b>Status:</b> ${issue.status}</p>
<p><b>Priority:</b> ${issue.priority}</p>
<p><b>Author:</b> ${issue.author}</p>
<p><b>Created:</b> ${issue.createdAt}</p>

<div class="mt-4 text-right">
<button class="btn btn-sm btn-error closeModal">Close</button>
</div>

</div>

`

document.body.appendChild(modal)

modal.querySelector(".closeModal").addEventListener("click", () => {

modal.remove()

})

})

}



loadIssues()