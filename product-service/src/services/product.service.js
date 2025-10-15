import Product from "../models/product.model.js";

// Lấy tất cả sản phẩm (tương tự hàm index trong ProductController)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Lấy sản phẩm theo ID (tương tự hàm show)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Tạo sản phẩm mới (tương tự hàm store)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image_url } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image_url
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};