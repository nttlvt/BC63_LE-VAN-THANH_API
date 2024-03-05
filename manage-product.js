let myModal = new bootstrap.Modal(document.getElementById("add-product"));
function handleEdit(id) {
    document.getElementById("form-title").textContent = "Edit Product";
    document.getElementById("form-btn").textContent = "Save";
    document.getElementById("id-val").value = id;
    axios
        .get(`https://65e1e74ea8583365b31796c1.mockapi.io/api/products/${id}`)
        .then(function (response) {
            const product = response.data;
            document.getElementById("name").value = product.name;
            document.getElementById("price").value = product.price;
            document.getElementById("screen").value = product.screen;
            document.getElementById("backCamera").value = product.backCamera;
            document.getElementById("frontCamera").value = product.frontCamera;
            document.getElementById("img").value = product.img;
            document.getElementById("desc").value = product.desc;
            document.getElementById("type").value = product.type;
            myModal.show();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function handleDelete(id) {
    axios
        .delete(
            `https://65e1e74ea8583365b31796c1.mockapi.io/api/products/${id}`
        )
        .then(function (response) {
            renderProduct();
            alert("Delete product successfully");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderProduct() {
    axios
        .get("https://65e1e74ea8583365b31796c1.mockapi.io/api/products")
        .then(function (response) {
            const products = response.data;
            const tableBody = document
                .getElementById("table-product")
                .getElementsByTagName("tbody")[0];
            tableBody.innerHTML = "";
            let html = "";
            products.forEach(function (product, index) {
                html +=
                    "<tr>" +
                    "<th scope='row'>" +
                    (index + 1) +
                    "</th>" +
                    "<td><img src='" +
                    product.img +
                    "' class='rounded float-start' alt='" +
                    product.name +
                    "' style='width: 50px; height: 50px;'></td>" +
                    "<td>" +
                    product.name +
                    "</td>" +
                    "<td><button type='button' class='btn btn-secondary me-3' onclick='handleEdit(" +
                    product.id +
                    ")'>Edit</button><button type='button' class='btn btn-danger' onclick='handleDelete(" +
                    product.id +
                    ")'>Delete</button></td>" +
                    "</tr>";
            });
            tableBody.innerHTML = html;
        })
        .catch(function (error) {
            console.log(error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    renderProduct();

    document
        .getElementById("add-button")
        .addEventListener("click", function () {
            document.getElementById("form-title").textContent = "Add Product";
            document.getElementById("form-btn").textContent = "Add";
            document.getElementById("action-product").reset();
            const modal = document.getElementById("add-product");
            myModal.show();
        });

    document
        .getElementById("action-product")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            if (
                document.getElementById("name").value === "" ||
                document.getElementById("price").value === "" ||
                document.getElementById("screen").value === "" ||
                document.getElementById("backCamera").value === "" ||
                document.getElementById("frontCamera").value === "" ||
                document.getElementById("img").value === "" ||
                document.getElementById("desc").value === "" ||
                document.getElementById("type").value === ""
            ) {
                alert("Please provide invalid value");
            } else {
                const formData = new FormData(this);
                const formDataObject = Object.fromEntries(formData);
                const id = document.getElementById("id-val").value;
                if (id === "") {
                    axios
                        .post(
                            "https://65e1e74ea8583365b31796c1.mockapi.io/api/products",
                            formDataObject
                        )
                        .then(function (response) {
                            myModal.hide();
                            renderProduct();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    axios
                        .put(
                            `https://65e1e74ea8583365b31796c1.mockapi.io/api/products/${id}`,
                            formDataObject
                        )
                        .then(function (response) {
                            myModal.hide();
                            renderProduct();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
});