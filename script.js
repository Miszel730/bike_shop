//fetch("http://belikemiszel.com/bikes/wp-json/wp/v2/bike")
//    .then(initial => initial.json())
//    .then(callback);
//
//function callback(data) {
//    data.forEach(showBike);
//}
//
//function showBike(singleBike) {
//    console.log(singleBike);
//    const template = document.querySelector('template').content;
//    const clone = template.cloneNode(true);
//
//
//    clone.querySelector('h2').textContent = singleBike.title;
//
//    const mainEl = document.querySelector('main');
//    main.appendChild(clone);
//}

getData();//fetching products
function getData(){
    fetch("http://belikemiszel.com/bikes/wp-json/wp/v2/bike_embed")
    .then(function(response){
        return response.json();
    })
    .then(showPosts);
}
//showing products
function showPosts(posts){
    //console.log(posts);
    posts.forEach(showBike);
}
function showBike(bike){
    console.log(bike);
    const temp= document.querySelector("template").content;
    //clone  the template
    const myCopy=temp.cloneNode(true);
    //showimgs
    const img =myCopy.querySelector("img");
    img.setAttribute("src",bike._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    document.querySelector('main').appendChild(myCopy)
}
function showColor(color){
    const liEl=
          document.createElement(li);
    liEl.textContent=color;
}
