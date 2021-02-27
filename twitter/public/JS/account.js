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




firebase.auth().onAuthStateChanged(user => {
  if (user) {
    

    firebase.firestore().collection("tweets").where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
    function appender(){
            var myTweet = doc.data().Tweet;
            console.log(myTweet);
            
            
            var twitter =document.getElementById('myTweets');

            var li = document.createElement('li');
            var div = document.createElement('div');
            
            li.setAttribute('data-id',doc.id);

           
            div.textContent = myTweet;
           

            li.appendChild(div);
          
            if(twitter !=null)twitter.appendChild(li);
            li.style.color ='green';
            li.style.paddingLeft = '500px';
            li.style.paddingRight = '800px';
            li.style.listStyle = 'none';
            li.style.backgroundColor = 'whiteSmoke';
            li.style.border ='white solid 10px';
            li.style.width = '200px'
            }

    return appender();

    
         
        });
    
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
      

      

     
       
       
}});



  

