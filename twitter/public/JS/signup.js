var firebaseConfig = {
    apiKey: "AIzaSyDXY7i_CBcJN-TbzYKVXMhYwg6_hFpJpvU",
    authDomain: "twitter-5e748.firebaseapp.com",
    projectId: "twitter-5e748",
    storageBucket: "twitter-5e748.appspot.com",
    messagingSenderId: "153234505700",
    appId: "1:153234505700:web:c99e47b8d204b113b011f1",
    measurementId: "G-73QHKXQX65"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
db = firebase.firestore();
// var storage = firebase.storage();
//var storageRef = storage.ref();


$('#signupbtn').click(function(){

  let fullname = $('#fullname').val();
  console.log(fullname);
  let email = $('#Email').val();
  let phone = $('#phone').val();
  let password = $('#passwd').val();
 
  
  

  if(email != "" && password != ""){
  firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{

      var user = firebase.auth().currentUser;

    return db.collection("users").doc(user.uid).set({
      FullName: fullname,
      Email: email,
      Phone: phone,
      Password:password,
      userId: user.uid
    });
  }).then(() => {

    window.location.href = 'index.html';
 

  });


  };

});
