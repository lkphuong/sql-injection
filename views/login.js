function toggleSignup() {
  document.getElementById("login-toggle").style.backgroundColor = "#fff";
  document.getElementById("login-toggle").style.color = "#222";
  document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
  document.getElementById("signup-toggle").style.color = "#fff";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function toggleLogin() {
  document.getElementById("login-toggle").style.backgroundColor = "#57B846";
  document.getElementById("login-toggle").style.color = "#fff";
  document.getElementById("signup-toggle").style.backgroundColor = "#fff";
  document.getElementById("signup-toggle").style.color = "#222";
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

$(document).ready(function () {
  // Get value on button click and show alert
  $("#btn-login").click(function () {
    var username = $("#login-username").val();
    var password = $("#login-password").val();

    if (username == "" || password == "") {
      alert("Yêu cầu nhập username và password");
    } else {
      fetch("/auth/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "Đăng nhập thành công") {
            localStorage.setItem("user_id", data.data.id);
            window.location = "/todo";
          } else {
            alert("Sai tài khoản hoặc mật khẩu");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  //Sign up
  $("#btn-signup").click(function () {
    var username = $("#signup-email").val();
    var password = $("#signup-password").val();

    if (username == "" || password == "") {
      alert("Yêu cầu nhập đầy đủ thông tin");
    } else {
      fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Đăng ký thành công");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
});
