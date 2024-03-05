function handleAddCart(e) {
    const product = JSON.parse(
        decodeURIComponent(e.getAttribute("data-myobject"))
    );
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
        cart = [];
        cart.push({ product, quantity: 1 });
    } else {
        const ind = cart.findIndex((item) => item.product.id == product.id);
        if (ind !== -1) cart[ind].quantity++;
        else cart.push({ product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toastr.clear();
    toastr.success(`Add 1 ${product.name} successfully`);
}

function renderProduct(type) {
    fetch("https://65e1e74ea8583365b31796c1.mockapi.io/api/products")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            const listProducts = document.querySelector(".list-products");
            listProducts.innerHTML = "";
            let html = "";
            if (!type) {
                products.forEach((product, index) => {
                    html += `<div class="card col-3 me-3 mb-3" style="width: 18rem;">
                  <img src="${product.img}" class="card-img-top" alt="${product.name
                        }">
                  <div class="card-body">
                    <h5 class="card-title">${product.price} $</h5>
                    <p class="card-text">${product.desc}</p>
                    <button class="btn btn-primary" onclick="handleAddCart(this)" data-myobject="${encodeURIComponent(
                            JSON.stringify(product)
                        )}">Add to cart</button>
                  </div>
                </div>`;
                });
            } else {
                products.forEach((product, index) => {
                    if (type === product.type)
                        html += `<div class="card col-3 me-3 mb-3" style="width: 18rem;">
                  <img src="${product.img}" class="card-img-top" alt="${product.name
                            }">
                  <div class="card-body">
                    <h5 class="card-title">${product.price} $</h5>
                    <p class="card-text">${product.desc}</p>
                    <button class="btn btn-primary" onclick="handleAddCart(this)" data-myobject="${encodeURIComponent(
                                JSON.stringify(product)
                            )}">Add to cart</button>
                  </div>
                </div>`;
                });
            }

            listProducts.innerHTML = html;
        })
        .catch(function (error) {
            console.log(error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        showDuration: "1000",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
    };

    renderProduct();

    const selectType = document.getElementById("select-type");
    selectType.addEventListener("change", function () {
        const type = this.value;
        renderProduct(type);
    });
});