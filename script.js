const URL = `http://belikemiszel.com/bikes/wp-json/wp/v2/bike?_embed`;

getData();//fetching products
function getData(){
    fetch(URL)
    .then(function(response){
        return response.json();
    })
    .then(showPosts);
}
//showing products
function showPosts(posts){
    posts.forEach(showBike);
}
async function showBike(bike){
    console.log(bike);

	const setData = (scope, selector, dataMap) => {
		const htmlObject = scope.querySelector(selector);
		htmlObject.append(dataMap);
	}

	const setDataById = (scope, id, dataMap) => {
		const htmlObject = scope.getElementById(id);
		htmlObject.append(dataMap);
	}

	const setColor = (scope, color) => {
		const colorHtmlObject = scope.getElementById('color');
		colorHtmlObject.innerHTML = `<div class="color-tile" style="background-color: ${color}"></div>`
	}

    const template = document.querySelector("template").content;
    //clone  the template
    const myCopy = template.cloneNode(true);

    //set price
	setData(myCopy, "p", bike.price);

    //set name
    setData(myCopy, "h3", bike.title.rendered);

    //set color
	setColor(myCopy, bike.color);

    //set in_stock
	setDataById(myCopy, "stock", bike.in_stock);

	//set categories
	setData(myCopy, "h4", await getCategoryNameById(bike.categories[0]))

	//showimgs
    const img = myCopy.querySelector("img");
    img.setAttribute("src",bike._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

    document.getElementById('view').appendChild(myCopy)
}

async function getCategoryNameById(categoryId) {

	const CATEGORIY_URL = `http://belikemiszel.com/bikes/wp-json/wp/v2/categories/${categoryId}`;

	const data = await fetch(CATEGORIY_URL)
	.then(result => {
		return result.json();
	});

	return data.name;
}
