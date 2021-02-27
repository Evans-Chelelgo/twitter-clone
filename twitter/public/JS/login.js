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
//firebase.initializeApp(firebaseConfig);
//firebase.analytics();

 $('#loginbtn').click(function(){

    var email = $('#email').val();
    console.log(email);
    var password = $('#password').val();
    
    if(email != "" && password != ""){

    
      document.getElementById('load').style.display ='block';
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
       
        

        window.location.href='index.html';
       
       window.alert('user logged in succesfully');
        
       
      }).catch((error)=>{
          console.log(error);
      })
     
     
  }
  
});
