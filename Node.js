const addNextNode = document.querySelector('.add');
const addNodeBox = document.querySelector('.popup-box');
const titleBox = document.querySelector("input");
const descBox = document.querySelector("textarea");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const boxTitleName = document.getElementById('boxtitle');
const btnName = document.getElementById('btn');

const nodes = JSON.parse(localStorage.getItem("nodes") || "[]");

let isUpdate = false, updateId;

function openBox() {
  addNodeBox.classList.add("show");
  titleBox.focus();
};

function closeBox() {
  isUpdate = false;
  titleBox.value = '';
  descBox.value = '';
  boxTitleName.innerText = 'Add a new note';
  btnName.innerText = 'Add Note';
  addNodeBox.classList.remove("show");
};

function updateNodeList() {
  document.querySelectorAll('.node').forEach(nodeitems => nodeitems.remove());
  nodes.forEach((node, index) => {
    let newDiv =`<div class="node box">
    <div class="title">
    <h3>${node.title}</h3>
    <pre><p>${node.desc}</p></pre>
    </div>
    <div class="bottom">
      <div class="date">${node.nodeDate
      }</div>
      <div class="icons">
        <i class="fa-solid fa-pen-to-square" onclick="editNode(${index},'${node.title}','${node.desc}')"></i>
        <i class="fa-solid fa-trash" onclick="deleteNode(${index})"></i>
      </div>
    </div>

  </div>`
  addNextNode.insertAdjacentHTML("afterend", newDiv);

    });
};

updateNodeList();

function deleteNode(nodeId){
  let conform = confirm("Are you sure to delete this Note?");
  if(!conform) return;
  nodes.splice(nodeId, 1);
  localStorage.setItem("nodes", JSON.stringify(nodes));
  updateNodeList();
}

function editNode(nodeId, title, desc) {
  isUpdate = true;
  updateId = nodeId;
  openBox();
  titleBox.value = title;
  descBox.value = desc;
  boxTitleName.innerText = 'Update a note';
  btnName.innerText = 'Update';
};

function addNode() {
  let nodeTitle = titleBox.value;
  let nodeDesc = descBox.value;

  if (!nodeTitle || !nodeDesc) {
    return false;
  }
  else {
    let date = new Date();
    let day = date.getDate();
    let month = months[date.getMonth()];
    let saal = date.getFullYear();
    let nodeDetails = {
      title: nodeTitle, desc: nodeDesc,
      nodeDate: `${day} ${month} ${saal}`
    };

    if(!isUpdate){
      nodes.push(nodeDetails);
    }
    else{
      isUpdate = false;
      nodes[updateId] = nodeDetails;
    }
    localStorage.setItem("nodes", JSON.stringify(nodes));
    console.log(nodeDetails);
    updateNodeList();
    closeBox();
  }
};