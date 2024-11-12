type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description: string;
    inStock: boolean;
};

type Electronics = BaseProduct & {
    category: 'electronics';
    warrantyPeriod: number;
    brand: string;
};

type Clothing = BaseProduct & {
    category: 'clothing';
    size: 'S' | 'M' | 'L' | 'XL';
    material: string;
};

type CartItem<T> = {
    product: T;
    quantity: number;
};

/**
 * Find product by ID.
 * @param products - list of products
 * @param id - product's ID
 * @returns founded product or undefined, if product with passed id doesn't exist
 */
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
};

/**
 * Filter products by price lower than provided in signature.
 * @param products - list of products
 * @param maxPrice - maximum price for filtration
 * @returns list of products, where price is lower or equal to maxPrice
 */
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
};

/**
 * Add product to cart or update quantity of product if it already exists in the cart.
 * @param cart - list of cart items
 * @param product - product to add
 * @param quantity - quantity of product
 * @returns updated cart
 */
const addToCart = <T extends BaseProduct>(cart: CartItem<T>[], product: T, quantity: number): CartItem<T>[] => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    return cart;
};

/**
 * Calculate total price of products in the cart.
 * @param cart - list of cart items
 * @returns total price
 */
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total: number, item: CartItem<T>) => total + item.product.price * item.quantity, 0);
};


//Demo
const electronics: Electronics[] = [
    {
        id: 1,
        name: "Smartphone",
        price: 9000,
        description: "Modern smartphone",
        inStock: true,
        category: 'electronics',
        warrantyPeriod: 24,
        brand: "Sony"
    },
    {
        id: 2,
        name: "Tablet",
        price: 15000,
        description: "Tablet for studying",
        inStock: false,
        category: 'electronics',
        warrantyPeriod: 24,
        brand: "Lenovo"
    }
];

const clothing: Clothing[] = [
    {
        id: 3,
        name: "Skirt",
        price: 500,
        description: "Beautiful pink skirt",
        inStock: true,
        category: 'clothing',
        size: 'S',
        material: "Cotton"
    }
];

const phone = findProduct(electronics, 1);
console.log("Founded:", phone);

const filteredProducts = filterByPrice([...electronics, ...clothing], 1000);
console.log("Product with price before 1000 :", filteredProducts);

let cart: CartItem<BaseProduct>[] = [];
if (phone) {
    cart = addToCart(cart, phone, 2);
}
console.log("Cart:", cart);

if (clothing[0]) {
    cart = addToCart(cart, clothing[0], 2);
}
console.log("Cart:", cart);

const total = calculateTotal(cart);
console.log("Total cart sum:", total);