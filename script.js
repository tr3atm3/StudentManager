//student class to create objects of every student that enroll
class Student {
  static count = 0;
  constructor(name, phone, address) {
    this.name = name;
    this.phone = phone;
    this.address = address;

    Student.count++;
  }
  studentCount() {
    return Student.count;
  }
}
//DOM elements selected
let addBtn = document.querySelector("submit");
let form = document.querySelector("form");
let studentName = document.querySelector(".name");
let address = document.querySelector(".address");
let phone = document.querySelector(".phone");
let ul = document.querySelector(".listItems");
let countEle = document.querySelector(".count");

//getting data from api
window.addEventListener("DOMContentLoaded", function (e) {
  axios
    .get(
      "https://crudcrud.com/api/f0e65916746443a6b469fc0f828e0a0b/studentManager"
    )
    .then((res) => {
      countEle.textContent = res.data.length;
      for (let i = 0; i < res.data.length; i++) {
        createLi(res.data[i], ul);
      }
    });
});

//submit button functionality
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const obj = new Student(studentName.value, phone.value, address.value);
  countEle.textContent = `${obj.studentCount()}`;
  axios
    .post(
      "https://crudcrud.com/api/f0e65916746443a6b469fc0f828e0a0b/studentManager",
      obj
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  createLi(obj, ul);
  studentName.value = "";
  phone.value = "";
  address.value = "";
});

//creating list to add to the listItems
function createLi(obj, ul) {
  let li = document.createElement("li");
  li.innerHTML = `${obj.name}-${obj.phone}-${obj.address}`;
  delBtn(li);
  editBtn(li);
  ul.appendChild(li);
}

//delete btn funtionality
function delBtn(li) {
  let btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    let curStudent = e.target.parentElement.firstChild.textContent.split("-");
    axios
      .get(
        "https://crudcrud.com/api/f0e65916746443a6b469fc0f828e0a0b/studentManager"
      )
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].phone === curStudent[1]) {
            axios.delete(
              `https://crudcrud.com/api/f0e65916746443a6b469fc0f828e0a0b/studentManager/${res.data[i]._id}`
            );
            break;
          }
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(
        "https://crudcrud.com/api/f0e65916746443a6b469fc0f828e0a0b/studentManager"
      )
      .then((res) => {
        countEle.textContent = res.data.length;
      });
    e.target.parentElement.style.display = "none";
  });
  li.appendChild(btn);
}

//edit btn functionality
function editBtn(li) {
  let btn = document.createElement("button");
  btn.textContent = "Edit";
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    let curStudent = e.target.parentElement.firstChild.textContent.split("-");
    axios
      .get(
        "https://crudcrud.com/api/f0e65916746443a6b469fc0f828e0a0b/studentManager"
      )
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].phone === curStudent[1]) {
            axios.delete(
              `https://crudcrud.com/api/f0e65916746443a6b469fc0f828e0a0b/studentManager/${res.data[i]._id}`
            );
            break;
          }
        }
      });
    axios
      .get(
        "https://crudcrud.com/api/f0e65916746443a6b469fc0f828e0a0b/studentManager"
      )
      .then((res) => {
        countEle.textContent = res.data.length;
      });
    studentName.value = curStudent[0];
    phone.value = curStudent[1];
    address.value = curStudent[2];
    e.target.parentElement.style.display = "none";
  });
  li.appendChild(btn);
}
