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
var storage = firebase.storage();
var storageRef = storage.ref();
db = firebase.firestore();




// Points to 'images'
var imagesRef = storageRef.child('images');

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
var fileName = 'post';

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

  
db.collection("users").where('userId','==',user.uid).get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => { 
     username = doc.data().FullName;
     
     

    document.getElementById('username').innerHTML = username;
    usernames = document.getElementById('postername');
    if(usernames!=null)usernames.innerHTML = username;
   
      
  });
});









document.getElementById('tweetbtn').onclick =function(){
  var user = firebase.auth().currentUser;


  
 ;
   //var imageName = image.name;

   //console.log(imageName);


   var metadata = {
    contentType: 'image/jpeg'
  };


  var file = document.getElementById('upload').files[0];

//document.getElementById('upload').file = file;
  

  var uploadTask = storageRef.child('images/'+ names + new Date +'.png').put(file);

  
  db.collection('profilePics').where('userId','==',user.uid).get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
      var profilePhoto  = doc.data().Profile;
      console.log(profilePhoto);

     

       
       
  
      // document.getElementById('username').innerHTML = username;
      // usernames = document.getElementById('postername');
      // if(usernames!=null)usernames.innerHTML = username;
     
        




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
          var imgUrl = ('images/', downloadURL);
          var tweet = document.getElementById('tweetbar').value;
           


     
     

   
   
      


          db.collection("tweets").doc().set({

   
                    Name : username,  
                    Tweet: tweet,
                    userId : user.uid,
                    Image : imgUrl,
                    ProfilePhoto:  profilePhoto  
                  
                }).then(()=>{
                  window.location.reload();
                });});
      
      }
    );
  
  
  });
});




    }


  function renderTweet(doc){
    let twt = doc.data().Tweet;
    let myName = doc.data().Name;
    let myimage = doc.data().Image;
    let profileImage = doc.data().ProfilePhoto;
    console.log(profileImage);
   
  
    let tweetList =document.getElementById('tweeters');
      
      let li = document.createElement('li');
      let tweet = document.createElement('p');
      let images = document.createElement('img')
      let showName = document.createElement('span');
      let del = document.createElement('span');
      let prof = document.createElement('img');
      let profpost = document.createElement('span');
      li.setAttribute('data-id',doc.id);

      showName.textContent =myName; 
      tweet.textContent =twt ;
      images.src = myimage;
     prof.src =  profileImage;
      del.innerHTML ='<span style=" display:flex; margin-left:40px" id = "react">'+
                      '<p style="padding-right:80px" id ="reply">reply</p>'+
                      '<p style="padding-right:80px">retweet</p>'+
                      '<p style="padding-right:80px">like</p>'+
                      '<p style="padding-right:80px">share</p>'+
                      '</span>'
      prof.innerHTML  = '<div style ="border-radius:5%;background-color:gray;">'+
                        
                       '</div>'
     

      profpost.append(prof);
      profpost.appendChild(showName); 
    
      prof.style.borderRadius='50%'; 
      prof.style.paddingLeft='20px';
      prof.style.paddingTop='5px';
     
      li.appendChild(profpost);
      showName.appendChild(tweet);
      if (myimage!=null)li.append(images);
      li.appendChild (del);

     //profpost.style.display ='flex';
     
     tweetList.appendChild(li);
     
    showName.style.font = '70px';
    
     li.style.width = '634px';
     li.style.borderBottom = '3px solid rgb(245, 245, 245)';
     li.style.borderTop ='none';
     li.style.borderRight ='none';
     //li.style.borderLeft ='20px';
     //li.style.padding ='10px';
     li.style.listStyle ='none';

     images.style.paddingLeft ='100px';
     images.style.borderRadius = '25px'
     //images.style.borderRadius = '150px'
     images.style.width='500px'
     images.style.height ='250px'
     profpost.style.display ='flex';
     prof.style.PadingRight ='50px';
     showName.style.fontSize = '17px';
     showName.style.marginBottom = '0px';
     showName.style.fontWeight = 'bold';
     tweet.style.fontSize ='16px';
     tweet.style.fontWeight ='normal';

     tweetList.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;';

    }

     db.collection('tweets').get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
       
          renderTweet(doc);

         
        })

     });
}} 
);
