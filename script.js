const API = "https://crudcrud.com/api/c24cf12c0c5d4d01b1060c47550ab76d";
const submitBtn = document.getElementById("submit");

window.addEventListener("DOMContentLoaded", function (e) {
  axios
    .get(
      "https://crudcrud.com/api/c24cf12c0c5d4d01b1060c47550ab76d/appointments"
    )
    .then((res) => {
      Array.from(res.data).forEach((user) => {
        addNewUser(user);
      });
    })
    .catch((err) => console.log(err));
});

function submitData(e) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const Phone = document.getElementById("phone").value;
  const user = {
    name,
    email,
    Phone,
  };
  axios
    .post(
      `https://crudcrud.com/api/c24cf12c0c5d4d01b1060c47550ab76d/appointments`,
      user
    )
    .then((res) => addNewUser(res.data))
    .catch((err) => console.error(err));
}

function addNewUser(user) {
  const ul = document.getElementById("items");
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode(
      `Name: ${user.name}, Email: ${user.email}, Phone: ${user.Phone}`
    )
  );
  li.id = `${user._id}`;
  li.className = "item-list";
  const Edit = document.createElement("button");
  Edit.appendChild(document.createTextNode("Edit"));
  Edit.className = "btn btn-success";
  Edit.classList.add("mx-2");
  Edit.addEventListener("click", () => {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.Phone;
    axios
      .delete(
        `https://crudcrud.com/api/c24cf12c0c5d4d01b1060c47550ab76d/appointments/${user._id}`
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    li.remove();
  });
  li.appendChild(Edit);

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  deleteBtn.className = "btn btn-danger";
  deleteBtn.classList.add("mx-2");
  deleteBtn.addEventListener("click", () => {
    axios
      .delete(
        `https://crudcrud.com/api/c24cf12c0c5d4d01b1060c47550ab76d/appointments/${user._id}`
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    li.remove();
  });
  li.appendChild(deleteBtn);
  ul.appendChild(li);
}
