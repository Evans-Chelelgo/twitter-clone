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
  firebase.analytics();
  firebase.storage();
var storageRef =  firebase.storage().ref();
db = firebase.firestore();



  // Points to 'images'
var imagesRef = storageRef.child('profiles');

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
var fileName = 'prof';

var spaceRef = imagesRef.child(fileName);

// File path is 'images/space.jpg'
var path = spaceRef.fullPath;

// File name is 'space.jpg'
var names = spaceRef.name;

// Points to 'images'
var imagesRef = spaceRef.parent;

user= firebase.auth().currentUser;


firebase.auth().onAuthStateChanged(user => {

    if(user ){

  
        db.collection("profilePics").where('userId','==',user.uid).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => { 
             var profilePicture = doc.data().Profile;
             console.log(profilePicture)
             
             var profileCont = document.getElementById('profContainer');
            

             var profilePictures = document.createElement('img');
             profilePictures.src = profilePicture;
              
             if(profileCont!=null)profileCont.append(profilePictures);

             // profile picture styles
             profilePictures.style.marginTop ='5px';
             profilePictures.style.width ='70px';
             profilePictures.style.height ='70px';
             profilePictures.style.borderRadius ='50%';

           
            usernames = document.getElementById('postername');
            if(usernames!=null)usernames.innerHTML = username;
           
              
          });
        });
        }

var setter = document.getElementById('setProfpic');
if(setter!=null)setter.onclick = function(){

    
    var metadata = {
        contentType: 'image/jpeg'
      };
    
    
      var file = document.getElementById('uploadProf').files[0];
    
    //document.getElementById('upload').file = file;
      
    
      var uploadTask = storageRef.child('profiles/'+ names + new Date +'.png').put(file);
    
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, 
      
          (error) => {
            // Handle unsuccessful uploads
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              var profimgUrl = ('profiles/', downloadURL);
            var profiller = document.getElementById('profImage');
            if(profiller !=null)profiller.src = profimgUrl;
           
              db.collection("profilePics").doc().set({
    
       
                       
                        Profile : profimgUrl,
                        userId : user.uid  
                      
                    }).then(()=>{
                      window.location.reload();
                    });
                  
          
 
    db.collection("ProfilePics").doc().set({
    profImage : profimgUrl,
    userId : user.uid  
  
}).then(()=>{
  window.location.reload();
});

})
});
}
})