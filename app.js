function fetchContacts() {
  fetch(rootPath + "controller/get-contacts/")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayContactsTable(data);
      //console.log(data);
    });
}

function displayContactsTable(data) {
  let output = `
    <table class="contactTable header">
      <thead>
        <tr>
          <th>Profile Picture</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let a in data) {
    output += `
      <tr onclick="navigateToEditPage(${data[a].id})">
        <td>
          <img src="${rootPath}controller/uploads/${data[a].avatar}" width="40" class="avatarImg" />
        </td>
        <td><h5>${data[a].firstname}</h5></td>
        <td><h5>${data[a].lastname}</h5></td>
      </tr>
    `;
  }

  output += `
      </tbody>
    </table>
  `;

  document.getElementById("table").innerHTML = output;
}

function submitAddForm(e) {
  e.preventDefault();

  const form = new FormData(document.querySelector("#addForm"));
  form.append("apiKey", apiKey);

  fetch(rootPath + "controller/insert-contact/", {
    method: "POST",
    headers: { Accept: "application/json, *.*" },
    body: form,
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data == "1") {
        alert("Contact added.");
        homeLink();
        //link user to homepage
      } else {
        alert(data);
        homeLink();
        //link user to homepage
      }
    });
}

function homeLink() {
  window.open("index.html", "_self");
}

function addContact() {
  window.open("add-contact.html", "_self");
}

function navigateToEditPage(id) {
  window.open("edit-contact.html?id=" + id, "_self");
}
if (document.getElementById("submitForm")) {
  document
    .getElementById("submitForm")
    .addEventListener("click", submitAddForm);
}

if (document.getElementById("homeLink")) {
  document.getElementById("homeLink").addEventListener("click", homeLink);
}

if (document.getElementById("addContact")) {
  document.getElementById("addContact").addEventListener("click", addContact);
}

if (document.getElementById("refresh")) {
  document.getElementById("refresh").addEventListener("click", fetchContacts);
}

var id = getID();

function getID() {
  var url = window.location.href;
  var pos = url.search("=");
  var id = url.slice(pos + 1); //slicing the url at the position plus 1(leaving out the id number on the browser)
  return id;
}

function getContact() {
  fetch(rootPath + "controller/get-contacts/?id=" + id)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displaySingleContact(data);
      //display contact info
      //console.log(data);
    });
}

function displaySingleContact(data) {
  avatarImg = `<img src="${rootPath}controller/uploads/${data[0].avatar}" width="200" class ="avatarImage"/>
  `;
  document.getElementById("avatarImage").innerHTML = avatarImg;

  document.getElementById("firstname").value = data[0].firstname;
  document.getElementById("lastname").value = data[0].lastname;
  document.getElementById("mobile").value = data[0].mobile;
  document.getElementById("email").value = data[0].email;
}

function editContact() {
  document.getElementById("firstname").readOnly = false;
  document.getElementById("lastname").readOnly = false;
  document.getElementById("mobile").readOnly = false;
  document.getElementById("email").readOnly = false;
  document.getElementById("avatar").hidden = false;
  document.getElementById("submitForm").hidden = false;
}
function submitEditForm(e) {
  e.preventDefault();

  const form = new FormData(document.querySelector("#editForm"));
  form.append("apiKey", apiKey);
  form.append("id", id);

  fetch(rootPath + "controller/edit-contact/", {
    method: "POST",
    headers: { Accept: "application/json, *.*" },
    body: form,
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data == "1") {
        alert("Contact edited.");
        homeLink();
        //link user to homepage
      } else {
        alert(data);
        homeLink();
        //link user to homepage
      }
    });
}

function deleteContact() {
  var confirmDelete = confirm("Are you sure you want to delete contact?");

  if (confirmDelete == true) {
    fetch(rootPath + "controller/delete-contact/?id=" + id)
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        if (data == "1") {
          homeLink();
        } else {
          alert(data);
        }
      });
  }
}

if (document.getElementById("editContact")) {
  document.getElementById("editContact").addEventListener("click", editContact);
}
if (document.getElementById("submitForm")) {
  document
    .getElementById("submitForm")
    .addEventListener("click", submitEditForm);
}
if (document.getElementById("deleteContact")) {
  document
    .getElementById("deleteContact")
    .addEventListener("click", deleteContact);
}
