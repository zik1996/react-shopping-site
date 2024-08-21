import { useEffect, useState } from "react"

export function ShoppingSite(){
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([{id:0, title:'', price:0, description:'', category:'', image:'', rating:{rate:0, count:0}}])
    const [cartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)
    const [cartToggle, setCartToggle] = useState(true)
    function LoadCategories(){
        fetch("https://fakestoreapi.com/products/categories")
        .then(res=>res.json())
        .then(category=>{
            category.unshift("all")
            setCategories(category)
        })
    }

    function LoadProducts(url){
        fetch(url)
        .then(res=>res.json())
        .then(products=>{
            setProducts(products)
        })
    }

    function handleCategoryChange(e){
        if(e.target.value === "all"){
            LoadProducts("https://fakestoreapi.com/products")
        }else{
            LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
        }
    }
    function handleAddToCartClick(e){
        fetch(`https://fakestoreapi.com/products/${e.target.id}`)
        .then(res=>res.json())
        .then(productItem=>{
            cartItems.push(productItem);
            console.log(productItem)
            setCartCount(cartItems.length);
            alert(`${productItem.title} \nAdded into cart`)
        })

    }

    function cartToggleClick(){
        setCartToggle(!cartToggle)
    }


    useEffect(()=>{
        LoadCategories()
        LoadProducts("https://fakestoreapi.com/products")
    },[])
    return(
        <div className="container-fluid">
            <header className="d-flex justify-content-between align-items-center bg-danger text-white p-3">
                <div>
                    <p className="h3">Shopping Site</p>
                </div>
                <div>
                    <span className="me-3">Home</span>
                    <span className="me-3">Jewelery</span>
                    <span className="me-3">Electronics</span>
                    <span className="me-3">Men's Fashion</span>
                    <span className="me-3">Women's Fashion</span>
                </div>
                <div>
                    <button className="position-relative btn btn-light" onClick={cartToggleClick}><span className="bi bi-cart4"></span> Your Cart <span className="badge bg-danger rounded rounded-circle position-absolute top-0 end-0">{cartCount}</span></button>
                </div>
            </header>
            <section className="row mt-3">
                <nav className="col-2">
                    <label className="form-label fw-bold">Select Category</label>
                    <select className="form-select" onChange={handleCategoryChange}>
                        {
                            categories.map(category=>
                                    <option key={category} value={category}>{category.toUpperCase()}</option>
                                )
                        }
                    </select>
                </nav>
                <main className="col-8">
                    <div className="d-flex flex-wrap overflow-auto"style={{height:"500px"}}>
                        {
                            products.map(product=>
                                
                                    <div key={product.title} className="card p-2 m-2" style={{width:"180px"}}>
                                        <img src={product.image} alt="img" className="card-image-top" height="140"/>
                                        <div className="card-header overflow-auto" style={{height:"100px"}}>
                                            <p className="card-title">{product.title}</p>
                                        </div>
                                        <div className="card-body">
                                            <dl>
                                                <dt>price</dt>
                                                <dd>{product.price}</dd>
                                                <dt>Rating</dt>
                                                <dd>
                                                    {product.rating.rate}<span className="bi bi-star-fill text-success"></span>
                                                </dd>
                                            </dl>
                                        </div>
                                        <div className="card-body">
                                            <button id={product.id} className="btn btn-danger w-100" onClick={handleAddToCartClick}><span className="bi bi-cart3"></span> Add to cart</button>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </main>
                <aside className="col-2">
                    <table style={{display:cartToggle ?'block':'none'}} className="table table-hover table-active table-bordered caption-top">
                        <caption>Cart Summary</caption>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Preview</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map(product=>
                                        <tr>
                                            <td>{product.title}</td>
                                            <td>
                                                <img src={product.image} height="50" width="100%" alt="img" />
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </aside>
            </section>
        </div>
    )
}