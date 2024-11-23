let sortSelect = document.querySelector('#select-bar')
let nameFilterInput = document.querySelector('#text-input')
let productsWrapper = document.querySelector('.products-wrapper')

async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products?limit=0');
    const products = await response.json();
    return products;
}

fetchProducts().then(PRODUCTS => {
    displayProducts(PRODUCTS.products);

    sortSelect.addEventListener('change', () => display(PRODUCTS.products));
    nameFilterInput.addEventListener('change', () =>
        display(PRODUCTS.products)
    );
});

function displayProducts(products){
    productsWrapper.innerHTML= ''
    for(let i = 0; i < 30; i++){

        let productDiv = document.createElement('div')
        productDiv.classList.add('product-contener')

        let productImg = document.createElement('img')
        productImg.classList.add('product-img')
        productImg.src = products[i].thumbnail
        productImg.alt = `img id ${products[i].id}`
        
        let productText = document.createElement('div')
        productText.classList.add('product-text')

        let productTitle = document.createElement('h2')
        productTitle.classList.add('product-title')
        productTitle.textContent = products[i].title

        let productDesc = document.createElement('p')
        productDesc.classList.add('product-description')
        productDesc.textContent = products[i].description

        productText.appendChild(productTitle)
        productText.appendChild(productDesc)

        productDiv.appendChild(productImg)
        productDiv.appendChild(productText)

        productsWrapper.appendChild(productDiv)
    }

}

function display(products){

    let select = sortSelect.value
    let textSearch = nameFilterInput.value
    let sortIndex = 0
    let newProducts = []
    
    products.forEach(element => {
        if(element.title.toLowerCase().includes(textSearch.toLowerCase()) || element.description.toLowerCase().includes(textSearch.toLowerCase())){
            newProducts.push(element)
        }
    });

    switch (select) {
        case 'A-Z':
            sortIndex = -1
            break;
        case 'Z-A':
            sortIndex = 1
            break;
        default:
            break;
    }

    newProducts.sort((a, b) => {
        const nameA = a.title.toLowerCase(); // ignore upper and lowercase
        const nameB = b.title.toLowerCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return sortIndex;
        }
        if (nameA > nameB) {
            return sortIndex*(-1);
        }
        return 0;
    });

    displayProducts(newProducts)
}