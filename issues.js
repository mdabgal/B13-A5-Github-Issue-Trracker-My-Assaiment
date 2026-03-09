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

showIssues(issues)

})

}

//issue card show
function showIssues(issues){

container.innerHTML = ""

const total = issues.length
const open = issues.filter(issue => issue.status === "open").length;
const closed = issues.filter(issue => issue.status === "closed").length;


document.getElementById("totalIssues").innerText = total;
document.getElementById("openCount").innerText = open;
document.getElementById("closedCount").innerText = closed;

  
issues.forEach(issue => {

let priorityColor = "bg-red-100 text-red-500"

if(issue.priority === "MEDIUM"){
priorityColor = "bg-yellow-100 text-yellow-600"
}

if(issue.priority === "LOW"){
priorityColor = "bg-gray-200 text-gray-500"
}

    let tags = "";
    if(issue.labels && issue.labels.length > 0){
    issue.labels.forEach(tag => {

        let bg = "bg-gray-100"
        let text = "text-gray-600"

        if(tag.toLowerCase() === "bug"){
            bg = "bg-red-100"
            text = "text-red-500"
        }

        if(tag.toLowerCase() === "help wanted"){
            bg = "bg-yellow-100"
            text = "text-yellow-600"
        }

        if(tag.toLowerCase() === "enhancement"){
            bg = "bg-green-100"
            text = "text-green-600"
        }

        tags +=`
        <span class = "text-xs  ${bg} ${text} px-3 py-1 rounded-full">
        ${tag}
        </span>
        
        `
       
    })

    }


    let statusIcon = "./assets/Open-Status.png"

let borderColor = "border-green-500"


if(issue.status === "closed"){
borderColor = "border-purple-500"
iconColor = "text-purple-500"
iconBg = "bg-purple-100"
statusIcon = "./assets/Closed- Status .png"
}



const card = document.createElement("div")

card.className = `bg-white rounded-lg shadow border-t-4 ${borderColor} p-5 cursor-pointer`

card.innerHTML = `

<div class="flex justify-between items-center mb-3">
<img src="${statusIcon}" alt="">

<span class="${priorityColor} text-xs px-3 py-1 rounded-full">
${issue.priority}
</span>

</div>

<h2 class="font-semibold text-lg mb-2">
${issue.title}
</h2>

<p class="text-gray-500 text-sm mb-3">
${issue.description}
</p>

<div class ="flex gap-2 mb-4">
${tags}

</div>

<div class="border-t pt-3 text-sm text-gray-500">

<p>#${issue.id} by ${issue.author}</p>

<p>${new Date(issue.createdAt).toLocaleDateString()}</p>
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


// search button
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

<div class="mt-4 text-right">
<button class="btn btn-sm btn-error closeModal">Close</button>
<p><b>Created:</b> ${new Date(issue.createdAt).toLocaleDateString()}</p>
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