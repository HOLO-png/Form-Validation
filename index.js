document.addEventListener(
  'DOMContentLoaded',
  () => {
    window.onload = function () {
      const $$ = document.querySelectorAll.bind(document);
      const $ = document.querySelector.bind(document);

      const inputEle = $$('input');
      const titleError = $$('#emailHelpId');
      const btn = $('#submit');
      const icon = $$('i');

      const errorKey = {
        color: 'red !important',
        className: 'errorInput',
      };
      var isCheckValid = false;
      var nameVal;
      var emailVal;
      var numberVal;
      var passwordVal;
      var ischeckboxVal = true;
      var passwordVal4;
      let arrayKey = [nameVal, emailVal, numberVal, passwordVal, passwordVal4];
      class valueInputValid {
        constructor(name, email, numPhone, password) {
          this.name = name;
          this.email = email;
          this.numPhone = numPhone;
          this.password = password;
        }
        getValue() {
          return this.name + this.email + this.numPhone + this.password;
        }
      }

      function addValueInput() {
        inputEle[0].oninput = function (e) {
          nameVal = e.target.value;
          checkLengthValueInput(nameVal, 0);
        };
        inputEle[1].oninput = function (e) {
          emailVal = e.target.value;
          checkLengthValueInput(emailVal, 1);
        };
        inputEle[2].oninput = function (e) {
          numberVal = Number(e.target.value);
          checkLengthValueInput(numberVal, 2);
        };
        inputEle[3].oninput = function (e) {
          passwordVal = e.target.value;
          checkLengthValueInput(passwordVal, 3);
          checkTheSimilarity(passwordVal);
        };
        inputEle[5].onclick = function () {
          ischeckboxVal = inputEle[5].checked;
        };
      }

      function checkLengthValueInput(value, i) {
        if (value.length == 0) {
          checkIfFalse('Bạn phải nhập giá trị vào ô này!', i);

          checkValidForm(isCheckValid);
        } else if (value.length > 30) {
          checkIfFalse('Không nhập quá 30 kí tự', i);
          checkValidForm(isCheckValid);
        } else {
          if (i == 0) {
            let ReName = /^[a-zA-Z0-9]*$/i;
            if (ReName.test(value)) {
              checkIfTrue('&nbsp;', i);
            } else {
              checkIfFalse(
                'Tên đăng nhập ko quá 30 kí tự, ko chứa kí tự số và các kí tự đặc biệt',
                i
              );
            }
          }
          if (i == 1) {
            let ReEmails = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (ReEmails.test(value)) {
              checkIfTrue('&nbsp;', i);
            } else {
              checkIfFalse('Email phải đúng với Email hiện tại của bạn', i);
            }
          }
          if (i == 2) {
            let ReNumPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if (ReNumPhone.test(value)) {
              checkIfTrue('&nbsp;', i);
            } else {
              checkIfFalse('Số điện thoại mà bạn được cấp', i);
            }
          }
          if (i == 3) {
            let RePassword =
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (value.length <= 8) {
              checkIfFalse('Mật khẩu phải lớn hơn 8 kí tự!', i);
            } else {
              if (RePassword.test(value)) {
                checkIfTrue('&nbsp;', i);
              } else {
                checkIfFalse(
                  'Mật khẩu phải lớn hơn 8 kí tự chứa ít nhất 1 kí tự hoa, 1 số và 1 kí tự đặc biệt!',
                  i
                );
              }
            }
          }
          if (i == 4) {
            checkIfTrue('Nhập mật khẩu phải khớp nhau', i);
          }
        }
      }
      function checkIfFalse(mes, i) {
        titleError[i].innerHTML = mes;
        inputEle[i].classList.add('errorInput');
        titleError[i].classList.add('title-error');
        isCheckValid = false;
        icon[i].style.display = 'block';
        icon[i].classList.remove('fa-check');
        icon[i].classList.add('fa-exclamation');

        checkValidForm(isCheckValid);
      }
      function checkIfTrue(mes, i) {
        titleError[i].innerHTML = mes;
        inputEle[i].classList.remove('errorInput');
        titleError[i].classList.remove('title-error');
        isCheckValid = true;
        icon[i].style.display = 'block';
        icon[i].classList.remove('fa-exclamation');
        icon[i].classList.add('fa-check');

        checkValidForm(isCheckValid);
      }
      function checkEmptyInput(val, i) {
        if (val == undefined || val.length == 0) {
          checkIfFalse('Bạn phải nhập giá trị vào ô này!', i);
          checkValidForm(isCheckValid);
        }
        if (val === false) {
          alert('Bạn phải đồng ý với các điều khoản mà chúng tôi đưa ra!');
        }
      }
      function checkTheSimilarity(valInput3) {
        inputEle[4].oninput = function (e) {
          passwordVal4 = e.target.value;
          if (valInput3 == 'undefined') {
            checkIfFalse('Nhập mật khẩu phải khớp nhau', 4);
          } else {
            if (passwordVal4 == valInput3) {
              checkIfTrue('Nhập mật khẩu khớp', 4);

              checkValidForm(isCheckValid);
            } else if (passwordVal4 != valInput3) {
              checkIfFalse('Mật khẩu ko khớp!', 4);

              checkValidForm(isCheckValid);
            }
          }
        };
      }
      function checkValidForm(isCheckValid) {
        if (isCheckValid === false) {
          btn.setAttribute('disabled', 'disabled');
        } else if (isCheckValid === true) {
          btn.removeAttribute('disabled');
        }

        btn.onclick = function (e) {
          let valueInput = new valueInputValid(
            nameVal,
            emailVal,
            numberVal,
            passwordVal
          );
          console.log(valueInput);

          checkEmptyInput(nameVal, 0);
          checkEmptyInput(emailVal, 1);
          checkEmptyInput(numberVal, 2);
          checkEmptyInput(passwordVal, 3);
          checkEmptyInput(passwordVal4, 4);
          checkEmptyInput(ischeckboxVal);

          e.preventDefault();
          deleteValueInput();
        };
      }
      function deleteValueInput() {
        console.log(inputEle);
        for (let i = 0; i < inputEle.length; i++) {
          if (i !== 5) {
            inputEle[i].value = '';
          }
        }
        isCheckValid = false;
      }
      addValueInput();
      checkValidForm();
      checkTheSimilarity(passwordVal);
    };
  },
  false
);
