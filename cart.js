function calculateTotalPrice(arr) {
    const totalPrice = arr.reduce(function (item, currentVal) {
      return (
        Number(item) +
        Number(currentVal.quantity) * Number(currentVal.product.price)
      );
    }, 0);
    return totalPrice;
  }
  function handleAdd(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
      cart = [];
    } else {
      const ind = cart.findIndex((item) => item.product.id == id);
      if (ind !== -1) cart[ind].quantity++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProduct();
  }
  function handleSub(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
      cart = [];
    } else {
      const ind = cart.findIndex((item) => item.product.id == id);
      if (ind !== -1) {
        cart[ind].quantity--;
        if (cart[ind].quantity == 0) cart.splice(ind, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProduct();
  }
  function renderProduct() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    document.querySelector(
      ".total-price"
    ).innerHTML = `<p>Total Price: ${calculateTotalPrice(cart ?? [])}$</p>`;
    document.querySelector("#table-product tbody").innerHTML = "";
    let html = "";
    cart?.forEach((product, index) => {
      html += `<tr>
    <th scope="row">${index + 1}</th>
    <td><img src="${product.product.img}" class="rounded float-start" alt="${product.product.name
        }" style="width: 50px; height: 50px;"></td>
    <td>${product.product.name}</td>
    <td>${product.quantity} x</td>
    <td>${product.product.price}</td>
    <td>
      <button type="button" class="btn btn-secondary me-3" onclick="handleAdd(${product.product.id
        })">+</button>
      <button type="button" class="btn btn-secondary me-3" onclick="handleSub(${product.product.id
        })">-</button>
      <button type="button" class="btn btn-danger me-3" onclick="handleSub(${product.product.id
        })">Remove</button>
    </td>
  </tr>`;
    });
    document.querySelector("#table-product tbody").innerHTML = html;
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

    document
      .querySelector("#checkout")
      .addEventListener("click", function () {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
          localStorage.removeItem("cart");
          renderProduct();
          toastr.success("Checkout success");
        } else {
          toastr.clear();
          toastr.warning("Empty cart can't checkout");
        }
      });
  });