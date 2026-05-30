const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'vasavi_secret_key_123_foundry';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure local uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// -------------------------------------------------------------
// CLOUDINARY & MULTER CONFIGURATION
// -------------------------------------------------------------
let cloudinary = null;
let useCloudinary = false;

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  try {
    cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    useCloudinary = true;
    console.log("-> Configured Cloudinary successfully.");
  } catch (err) {
    console.error("-> Failed to set up Cloudinary.", err);
  }
}

// Always use local disk storage for multer (temp storage before Cloudinary upload)
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});
const upload = multer({ storage: diskStorage });
console.log("-> Configured Multer disk storage for file uploads.");

// Helper to get correct absolute image URL
const formatImageUrl = (req, imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http') || imagePath.startsWith('/src/assets/')) {
    return imagePath;
  }
  const host = req.get('host');
  // Check if server is running on localhost or custom domain
  const protocol = req.protocol;
  return `${protocol}://${host}/${imagePath.replace(/\\/g, '/')}`;
};

// -------------------------------------------------------------
// DATABASE SETUP (MONGODB OR IN-MEMORY FALLBACK)
// -------------------------------------------------------------
let isMongoConnected = false;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
      isMongoConnected = true;
      console.log("-> Connected to MongoDB Database successfully.");
      await seedDatabase();
    })
    .catch((err) => {
      console.error("-> MongoDB connection failed:", err.message);
      console.log("-> Running on in-memory storage fallback.");
    });
} else {
  console.log("-> MONGODB_URI not provided in .env. Running on in-memory storage.");
}

// Mongoose Models definitions
const bannerSchema = new mongoose.Schema({
  mainText: { type: String, maxLength: 50, required: true },
  secondaryText: { type: String, maxLength: 50, required: true },
  imageUrl: { type: String, required: true }
});

const clientSchema = new mongoose.Schema({
  company: { type: String, required: true },
  quote: { type: String, required: true }, // limit enforced in frontend
  logoUrl: { type: String, required: true }
});

const ceoSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  quote: { type: String, required: true }
});

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, default: '' },
  imageUrl: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  desc: { type: String, required: true },
  alloy: { type: String, required: true },
  weightRange: { type: String, required: true },
  hardness: { type: String, required: true },
  application: { type: String, required: true },
  specs: [{ label: String, value: String }],
  imageUrl: { type: String, required: true }
});

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const Banner = mongoose.model('Banner', bannerSchema);
const Client = mongoose.model('Client', clientSchema);
const Ceo = mongoose.model('Ceo', ceoSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Product = mongoose.model('Product', productSchema);
const Certification = mongoose.model('Certification', certificationSchema);

// In-Memory Database store fallback
const memoryDb = {
  banners: [
    {
      _id: "mem-banner-1",
      mainText: "HIGH-PERFORMANCE IRON CASTINGS",
      secondaryText: "Sri Vasavi delivers precision cast components.",
      imageUrl: "/src/assets/hero_foundry.jpg"
    },
    {
      _id: "mem-banner-2",
      mainText: "TÜV SÜD CERTIFIED QUALITY SYSTEMS",
      secondaryText: "Operating under strict ISO 9001 specifications.",
      imageUrl: "/src/assets/inspection_stage.jpg"
    }
  ],
  clients: [
    {
      _id: "mem-client-1",
      company: "Schwing Stetter",
      quote: "Sri Vasavi Foundry's precision-cast components have elevated our mixer manufacturing standards. Their material strength and dimensional accuracy are consistently outstanding.",
      logoUrl: "SCHWING" // Represented by SVG text in UI
    },
    {
      _id: "mem-client-2",
      company: "PROMAN",
      quote: "The high-chrome cavity wear plates and cones supplied by Sri Vasavi have significantly extended the service life of our heavy industrial crushers.",
      logoUrl: "PROMAN"
    },
    {
      _id: "mem-client-3",
      company: "JSW Steel",
      quote: "Excellent chemical stability and microstructural consistency. Their custom wear castings successfully endure severe abrasion in our mill zones.",
      logoUrl: "JSW"
    },
    {
      _id: "mem-client-4",
      company: "AF",
      quote: "Reliable production scheduling and premium metallurgy. Their castings for our infrastructure projects have set a benchmark in durability.",
      logoUrl: "AF"
    },
    {
      _id: "mem-client-5",
      company: "Belvik",
      quote: "Exceptional surface finishes and strict tolerance controls. Vasavi's pre-pour spectrometer checking ensures zero-defect batches.",
      logoUrl: "BELVIK"
    },
    {
      _id: "mem-client-6",
      company: "DISA",
      quote: "Sri Vasavi Foundry matches deep metallurgical knowledge with prompt service. Their wear components offer superior wear life profiles.",
      logoUrl: "DISA"
    }
  ],
  ceo: {
    _id: "mem-ceo-1",
    imageUrl: "/src/assets/employee_operations.png",
    quote: "Sri Vasavi Foundry has been dedicated to manufacturing high-quality cast iron and ductile iron castings since our founding. We believe in precision, durability, and customer satisfaction above all."
  },
  employees: [
    {
      _id: "mem-emp-1",
      name: "D. Sridharan",
      role: "Operations Head",
      phone: "+91 98765 43210",
      imageUrl: "/src/assets/employee_operations.png"
    },
    {
      _id: "mem-emp-2",
      name: "T. Murugesan",
      role: "Quality Assurance Chief",
      phone: "+91 98765 43211",
      imageUrl: "/src/assets/employee_quality.png"
    },
    {
      _id: "mem-emp-3",
      name: "Dr. K. Raghavan",
      role: "Lead Metallurgical Scientist",
      phone: "+91 98765 43212",
      imageUrl: "/src/assets/employee_metallurgist.png"
    }
  ],
  products: [
    {
      _id: "prod-1",
      name: "Cavity Wear Block Set",
      category: "Wear Plates",
      desc: "High-chrome iron wear blocks designed for rotor cavity protection in vertical shaft impactors.",
      alloy: "High Chrome Alloy (28% Cr)",
      weightRange: "3 - 8 kg per block",
      hardness: "60 - 65 HRC",
      application: "VSI rotor pocket lining",
      imageUrl: "/src/assets/premium_wear_plate.png",
      specs: [
        { label: "Hardness", value: "60-65 HRC" },
        { label: "Service Life", value: "2x Standard" }
      ]
    },
    {
      _id: "prod-2",
      name: "Trapezoidal Guide Plates",
      category: "Wear Plates",
      desc: "Precision-cast trapezoidal guide plates with double mounting holes for severe abrasion protection.",
      alloy: "Ni-Hard / High Chrome Iron",
      weightRange: "4 - 10 kg",
      hardness: "58 - 62 HRC",
      application: "Chute liners and chute transfer zones",
      imageUrl: "/src/assets/premium_wear_plate.png",
      specs: [
        { label: "Mounting", value: "2x Bolt Holes" },
        { label: "Tolerance", value: "±0.5mm" }
      ]
    },
    {
      _id: "prod-3",
      name: "Hooked Liner Blocks",
      category: "Wear Plates",
      desc: "Rectangular wear liners featuring integrated hooking lips for secure interlock attachment under heavy vibration.",
      alloy: "Manganese Steel / High Chrome",
      weightRange: "6 - 15 kg",
      hardness: "45 - 62 HRC",
      application: "VSI crushers and impact chutes",
      imageUrl: "/src/assets/premium_wear_plate.png",
      specs: [
        { label: "Attachment", value: "Hook Interlock" },
        { label: "Vibration Resist", value: "Excellent" }
      ]
    }
  ],
  certifications: [
    {
      _id: "mem-cert-1",
      title: "TÜV SÜD ISO 9001:2015",
      imageUrl: "/src/assets/cert_tuv_iso.png"
    },
    {
      _id: "mem-cert-2",
      title: "ZED Pledge Certification",
      imageUrl: "/src/assets/cert_zed_pledge.png"
    },
    {
      _id: "mem-cert-3",
      title: "ZED Bronze MSME Certification",
      imageUrl: "/src/assets/cert_zed_bronze.png"
    },
    {
      _id: "mem-cert-4",
      title: "Udyam registration",
      imageUrl: "/src/assets/cert_udyam.png"
    },
    {
      _id: "mem-cert-5",
      title: "GST appreciation certificate",
      imageUrl: "/src/assets/cert_gst.png"
    }
  ]
};

// -------------------------------------------------------------
// DATABASE SEEDING
// -------------------------------------------------------------
async function seedDatabase() {
  try {
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      const docs = memoryDb.banners.map(({ _id, ...rest }) => rest);
      await Banner.insertMany(docs);
      console.log("-> Seeded default banners to MongoDB.");
    }
    
    const clientCount = await Client.countDocuments();
    if (clientCount === 0) {
      const docs = memoryDb.clients.map(({ _id, ...rest }) => rest);
      await Client.insertMany(docs);
      console.log("-> Seeded default clients to MongoDB.");
    }
    
    const ceoCount = await Ceo.countDocuments();
    if (ceoCount === 0) {
      const { _id, ...rest } = memoryDb.ceo;
      await Ceo.create(rest);
      console.log("-> Seeded default CEO statement to MongoDB.");
    }
    
    const employeeCount = await Employee.countDocuments();
    if (employeeCount === 0) {
      const docs = memoryDb.employees.map(({ _id, ...rest }) => rest);
      await Employee.insertMany(docs);
      console.log("-> Seeded default employees to MongoDB.");
    }
    
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const docs = memoryDb.products.map(({ _id, ...rest }) => rest);
      await Product.insertMany(docs);
      console.log("-> Seeded default products to MongoDB.");
    }
    
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      const docs = memoryDb.certifications.map(({ _id, ...rest }) => rest);
      await Certification.insertMany(docs);
      console.log("-> Seeded default certifications to MongoDB.");
    }
  } catch (err) {
    console.error("-> Failed to seed database:", err.message);
  }
}


// -------------------------------------------------------------
// AUTHENTICATION MIDDLEWARE
// -------------------------------------------------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Access Denied. Token missing." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid session token." });
    req.user = user;
    next();
  });
};

// -------------------------------------------------------------
// EXPRESS ROUTE ENDPOINTS
// -------------------------------------------------------------

// Admin Auth Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@vasavi.com' && password === 'vasavifoundry123') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid email or password." });
});

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    if (useCloudinary && cloudinary) {
      // Upload local file to Cloudinary, then delete local temp file
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'vasavi-foundry'
      });
      // Remove local temp file after successful upload
      fs.unlink(req.file.path, () => {});
      return res.status(200).json({ url: result.secure_url });
    }

    // No Cloudinary — serve from local uploads
    const filePath = `uploads/${req.file.filename}`;
    res.status(200).json({ url: filePath });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Image upload failed: " + (err.message || 'Unknown error') });
  }
});

// 1. BANNERS CRUD
app.get('/api/banners', async (req, res) => {
  try {
    let list;
    if (isMongoConnected) {
      list = await Banner.find();
    } else {
      list = memoryDb.banners;
    }
    const formatted = list.map(item => ({
      ...item.toObject ? item.toObject() : item,
      imageUrl: formatImageUrl(req, item.imageUrl)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/banners', authenticateToken, async (req, res) => {
  const { mainText, secondaryText, imageUrl } = req.body;
  if (mainText.length > 50 || secondaryText.length > 50) {
    return res.status(400).json({ message: "Text fields exceed 50 characters limit." });
  }

  try {
    if (isMongoConnected) {
      const banner = new Banner({ mainText, secondaryText, imageUrl });
      await banner.save();
      res.status(201).json(banner);
    } else {
      const newBanner = { _id: 'banner-' + Date.now(), mainText, secondaryText, imageUrl };
      memoryDb.banners.push(newBanner);
      res.status(201).json(newBanner);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/banners/:id', authenticateToken, async (req, res) => {
  const { mainText, secondaryText, imageUrl } = req.body;
  if (mainText.length > 50 || secondaryText.length > 50) {
    return res.status(400).json({ message: "Text fields exceed 50 characters limit." });
  }

  try {
    if (isMongoConnected) {
      const banner = await Banner.findByIdAndUpdate(
        req.params.id,
        { mainText, secondaryText, imageUrl },
        { new: true }
      );
      if (!banner) return res.status(404).json({ message: "Banner not found" });
      res.json(banner);
    } else {
      const bannerIdx = memoryDb.banners.findIndex(b => b._id === req.params.id);
      if (bannerIdx === -1) return res.status(404).json({ message: "Banner not found" });
      
      memoryDb.banners[bannerIdx] = {
        ...memoryDb.banners[bannerIdx],
        mainText,
        secondaryText,
        imageUrl: imageUrl || memoryDb.banners[bannerIdx].imageUrl
      };
      res.json(memoryDb.banners[bannerIdx]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/banners/:id', authenticateToken, async (req, res) => {
  try {
    if (isMongoConnected) {
      await Banner.findByIdAndDelete(req.params.id);
      res.json({ message: "Banner deleted" });
    } else {
      memoryDb.banners = memoryDb.banners.filter(b => b._id !== req.params.id);
      res.json({ message: "Banner deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. CLIENTS CRUD
app.get('/api/clients', async (req, res) => {
  try {
    let list;
    if (isMongoConnected) {
      list = await Client.find();
    } else {
      list = memoryDb.clients;
    }
    const formatted = list.map(item => ({
      ...item.toObject ? item.toObject() : item,
      logoUrl: formatImageUrl(req, item.logoUrl)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/clients', authenticateToken, async (req, res) => {
  const { company, quote, logoUrl } = req.body;
  try {
    if (isMongoConnected) {
      const client = new Client({ company, quote, logoUrl });
      await client.save();
      res.status(201).json(client);
    } else {
      const newClient = { _id: 'client-' + Date.now(), company, quote, logoUrl };
      memoryDb.clients.push(newClient);
      res.status(201).json(newClient);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/clients/:id', authenticateToken, async (req, res) => {
  const { company, quote, logoUrl } = req.body;
  try {
    if (isMongoConnected) {
      const client = await Client.findByIdAndUpdate(
        req.params.id,
        { company, quote, logoUrl },
        { new: true }
      );
      if (!client) return res.status(404).json({ message: "Client not found" });
      res.json(client);
    } else {
      const clientIdx = memoryDb.clients.findIndex(c => c._id === req.params.id);
      if (clientIdx === -1) return res.status(404).json({ message: "Client not found" });

      memoryDb.clients[clientIdx] = {
        ...memoryDb.clients[clientIdx],
        company,
        quote,
        logoUrl: logoUrl || memoryDb.clients[clientIdx].logoUrl
      };
      res.json(memoryDb.clients[clientIdx]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/clients/:id', authenticateToken, async (req, res) => {
  try {
    if (isMongoConnected) {
      await Client.findByIdAndDelete(req.params.id);
      res.json({ message: "Client deleted" });
    } else {
      memoryDb.clients = memoryDb.clients.filter(c => c._id !== req.params.id);
      res.json({ message: "Client deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. ABOUT (CEO PROFILE & EMPLOYEES)
app.get('/api/about', async (req, res) => {
  try {
    let ceoData;
    let employeeList;
    
    if (isMongoConnected) {
      ceoData = await Ceo.findOne();
      employeeList = await Employee.find();
      
      if (!ceoData) {
        ceoData = new Ceo(memoryDb.ceo);
        await ceoData.save();
      }
    } else {
      ceoData = memoryDb.ceo;
      employeeList = memoryDb.employees;
    }
    
    res.json({
      ceo: {
        ...ceoData.toObject ? ceoData.toObject() : ceoData,
        imageUrl: formatImageUrl(req, ceoData.imageUrl)
      },
      employees: employeeList.map(emp => ({
        ...emp.toObject ? emp.toObject() : emp,
        imageUrl: formatImageUrl(req, emp.imageUrl)
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/about/ceo', authenticateToken, async (req, res) => {
  const { quote, imageUrl } = req.body;
  try {
    if (isMongoConnected) {
      let ceo = await Ceo.findOne();
      if (!ceo) {
        ceo = new Ceo({ quote, imageUrl });
      } else {
        ceo.quote = quote;
        if (imageUrl) ceo.imageUrl = imageUrl;
      }
      await ceo.save();
      res.json(ceo);
    } else {
      memoryDb.ceo = {
        ...memoryDb.ceo,
        quote,
        imageUrl: imageUrl || memoryDb.ceo.imageUrl
      };
      res.json(memoryDb.ceo);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/about/employees', authenticateToken, async (req, res) => {
  const { name, role, phone, imageUrl } = req.body;
  try {
    if (isMongoConnected) {
      const emp = new Employee({ name, role, phone: phone || '', imageUrl });
      await emp.save();
      res.status(201).json(emp);
    } else {
      const newEmp = { _id: 'emp-' + Date.now(), name, role, phone: phone || '', imageUrl };
      memoryDb.employees.push(newEmp);
      res.status(201).json(newEmp);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/about/employees/:id', authenticateToken, async (req, res) => {
  const { name, role, phone, imageUrl } = req.body;
  try {
    if (isMongoConnected) {
      const emp = await Employee.findByIdAndUpdate(
        req.params.id,
        { name, role, phone: phone || '', imageUrl },
        { new: true }
      );
      if (!emp) return res.status(404).json({ message: "Employee not found" });
      res.json(emp);
    } else {
      const empIdx = memoryDb.employees.findIndex(e => e._id === req.params.id);
      if (empIdx === -1) return res.status(404).json({ message: "Employee not found" });

      memoryDb.employees[empIdx] = {
        ...memoryDb.employees[empIdx],
        name,
        role,
        phone: phone || '',
        imageUrl: imageUrl || memoryDb.employees[empIdx].imageUrl
      };
      res.json(memoryDb.employees[empIdx]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/about/employees/:id', authenticateToken, async (req, res) => {
  try {
    if (isMongoConnected) {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ message: "Employee deleted" });
    } else {
      memoryDb.employees = memoryDb.employees.filter(e => e._id !== req.params.id);
      res.json({ message: "Employee deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. PRODUCTS CRUD
app.get('/api/products', async (req, res) => {
  try {
    let list;
    if (isMongoConnected) {
      list = await Product.find();
    } else {
      list = memoryDb.products;
    }
    const formatted = list.map(item => ({
      ...item.toObject ? item.toObject() : item,
      imageUrl: formatImageUrl(req, item.imageUrl)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/products', authenticateToken, async (req, res) => {
  const { name, category, desc, alloy, weightRange, hardness, application, specs, imageUrl } = req.body;
  try {
    if (isMongoConnected) {
      const product = new Product({ name, category, desc, alloy, weightRange, hardness, application, specs, imageUrl });
      await product.save();
      res.status(201).json(product);
    } else {
      const newProd = { _id: 'prod-' + Date.now(), name, category, desc, alloy, weightRange, hardness, application, specs, imageUrl };
      memoryDb.products.push(newProd);
      res.status(201).json(newProd);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/products/:id', authenticateToken, async (req, res) => {
  const { name, category, desc, alloy, weightRange, hardness, application, specs, imageUrl } = req.body;
  try {
    if (isMongoConnected) {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, category, desc, alloy, weightRange, hardness, application, specs, imageUrl },
        { new: true }
      );
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } else {
      const prodIdx = memoryDb.products.findIndex(p => p._id === req.params.id);
      if (prodIdx === -1) return res.status(404).json({ message: "Product not found" });

      memoryDb.products[prodIdx] = {
        ...memoryDb.products[prodIdx],
        name,
        category,
        desc,
        alloy,
        weightRange,
        hardness,
        application,
        specs,
        imageUrl: imageUrl || memoryDb.products[prodIdx].imageUrl
      };
      res.json(memoryDb.products[prodIdx]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    if (isMongoConnected) {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted" });
    } else {
      memoryDb.products = memoryDb.products.filter(p => p._id !== req.params.id);
      res.json({ message: "Product deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. CERTIFICATIONS CRUD
app.get('/api/certifications', async (req, res) => {
  try {
    let list;
    if (isMongoConnected) {
      list = await Certification.find();
    } else {
      list = memoryDb.certifications;
    }
    const formatted = list.map(item => ({
      ...item.toObject ? item.toObject() : item,
      imageUrl: formatImageUrl(req, item.imageUrl)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/certifications', authenticateToken, async (req, res) => {
  const { title, imageUrl } = req.body;
  try {
    if (isMongoConnected) {
      const cert = new Certification({ title, imageUrl });
      await cert.save();
      res.status(201).json(cert);
    } else {
      const newCert = { _id: 'cert-' + Date.now(), title, imageUrl };
      memoryDb.certifications.push(newCert);
      res.status(201).json(newCert);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/certifications/:id', authenticateToken, async (req, res) => {
  try {
    if (isMongoConnected) {
      await Certification.findByIdAndDelete(req.params.id);
      res.json({ message: "Certification deleted" });
    } else {
      memoryDb.certifications = memoryDb.certifications.filter(c => c._id !== req.params.id);
      res.json({ message: "Certification deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve static frontend in production
const frontendDistPath = path.join(__dirname, '../dist');
app.use(express.static(frontendDistPath));

// Catch-all route for React Router (must be after all API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`Sri Vasavi Foundry Backend Server running on Port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log(`===================================================`);
});
