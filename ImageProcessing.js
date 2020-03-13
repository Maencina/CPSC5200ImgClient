var base64Img = null;

//console.log("Count:" + document.cnt);
var loadFile = function(event) {
  console.log(event);
  var image = document.getElementById("inputImage");
  console.log(image);
  if (event.srcElement.files && event.srcElement.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      base64Img = e.target.result.substring(e.target.result.indexOf(",") + 1);
      image.src = e.target.result;
    };

    reader.readAsDataURL(event.srcElement.files[0]);
  }
};

var displayFile = function(event) {
  var image = document.getElementById("outputImage");
  image.src = "data:image/jpeg;base64," + event;
};

/* Actions users are allowed to perform on picture */
function UserAction() {
  if (document.getElementById("radio_rotate_right").checked) {
    var methodName = "rotate90";
    var methodParam = "rotate90Param=-1";
  } else if (document.getElementById("radio_rotate_left").checked) {
    var methodName = "rotate90";
    var methodParam = "rotate90Param=1";
  } else if (document.getElementById("radio_horizontal").checked) {
    var methodName = "flip";
    var methodParam = "flipParam=1";
  } else if (document.getElementById("radio_vertical").checked) {
    var methodName = "flip";
    var methodParam = "flipParam=-1";
  } else if (document.getElementById("radio_grayscale").checked) {
    var methodName = "grayscale";
    var methodParam = "";
  } else if (document.getElementById("radio_thumbnail").checked) {
    var methodName = "thumbnails";
    var methodParam = "";
  } else if (document.getElementById("radio_resize").checked) {
    var methodName = "resize";
    var Width = document.getElementById("txtWidthRes").value;
    var Height = document.getElementById("txtHeightRes").value;
    var methodParam = "width=" + Width + "&height=" + Height;
  } else if (document.getElementById("radio_rotate").checked) {
    var methodName = "rotateAny";
    var rotateParam = document.getElementById("txtDegreeRot").value;
    var methodParam = "rotateParam=" + rotateParam;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(e) {
    if (this.readyState == 4 && this.status == 200) {
      displayFile(this.response);
    }
  };
  url = "http://localhost:5001/get/";
  url += methodName;
  url += "?img=";
  url += base64Img;
  url += "&" + methodParam;
  xhttp.open("POST", url);

  xhttp.send("get/" + url);
}

function ShowHideDiv1() {
  var chkYes = document.getElementById("radio_rotate");
  var rotateAttr = document.getElementById("rotateAttr");
  rotateAttr.style.display = chkYes.checked ? "block" : "none";
}

function ShowHideDiv2() {
  var chkYes = document.getElementById("radio_resize");
  var widthHeight = document.getElementById("widthHeight");
  widthHeight.style.display = chkYes.checked ? "block" : "none";
}
