const path = require("path");
const fs = require("fs");

// Try to load dotenv if available
let dotenv;
try {
  dotenv = require("dotenv");
} catch (err) {
  dotenv = null;
}

// Explicitly try loading .env from the project root (process.cwd())
if (dotenv) {
  const rootEnv = path.resolve(process.cwd(), ".env");
  const rootEnvLocal = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(rootEnv)) {
    dotenv.config({ path: rootEnv });
    console.log("Loaded .env from project root:", rootEnv);
  } else if (fs.existsSync(rootEnvLocal)) {
    dotenv.config({ path: rootEnvLocal });
    console.log("Loaded .env.local from project root:", rootEnvLocal);
  } else {
    dotenv.config();
    console.log("dotenv loaded with default behavior (no .env/.env.local found in project root).");
  }
} else {
  console.log("dotenv not installed — relying on environment variables passed to Node.");
}

// Diagnostics
console.log("Current working directory (process.cwd()):", process.cwd());
console.log(".env file present at project root?", fs.existsSync(path.resolve(process.cwd(), ".env")));
console.log(".env.local present at project root?", fs.existsSync(path.resolve(process.cwd(), ".env.local")));
console.log("MONGODB_URI environment variable present?:", !!process.env.MONGODB_URI);

const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("\nMONGODB_URI is not set. Set it and retry.");
    console.error("Tips:");
    console.error('- Place a ".env" or ".env.local" file in the project root containing MONGODB_URI');
    console.error('- Or run inline (mac/linux): MONGODB_URI="your_uri" node ./scripts/seed.js');
    console.error("- Windows PowerShell: $env:MONGODB_URI='your_uri'; node .\\scripts\\seed.js");
    console.error("- Windows CMD: set MONGODB_URI=your_uri && node scripts\\seed.js");
    process.exit(1);
  }

  console.log("Using MONGODB_URI:", uri.startsWith("mongodb") ? "(looks valid)" : uri.slice(0, 50));

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(); // uses default DB from URI (your connection string)
    const col = db.collection("products");

    const now = new Date().toISOString();
    // Ensure each product has a unique `sku` (use slug to guarantee uniqueness)
    const initial = [
      {
        name: "Wireless Headphones",
        slug: "wireless-headphones",
        sku: "WH-0001",
        description: "Comfortable wireless headphones with noise cancellation.",
        price: 99.99,
        category: "electronics",
        inventory: 25,
        lastUpdated: now
      },
      {
        name: "Coffee Mug",
        slug: "coffee-mug",
        sku: "CM-0001",
        description: "Ceramic coffee mug, 350ml.",
        price: 12.5,
        category: "home",
        inventory: 100,
        lastUpdated: now
      },
      {
        name: "Yoga Mat",
        slug: "yoga-mat",
        sku: "YM-0001",
        description: "Eco-friendly non-slip yoga mat.",
        price: 34.0,
        category: "fitness",
        inventory: 8,
        lastUpdated: now
      },
      {
        name: "Running Shoes",
        slug: "running-shoes",
        sku: "RS-0001",
        description: "Lightweight shoes for daily running.",
        price: 79.99,
        category: "footwear",
        inventory: 3,
        lastUpdated: now
      }
    ];

    // Remove any existing seed documents with same slugs to avoid duplicates
    const slugs = initial.map(p => p.slug);
    await col.deleteMany({ slug: { $in: slugs } });

    // Use ordered:false so one error won't stop the whole batch
    try {
      const res = await col.insertMany(initial, { ordered: false });
      console.log(`Inserted ${res.insertedCount} products.`);
      Object.keys(res.insertedIds).forEach(k => {
        console.log(`- insertedId[${k}]: ${res.insertedIds[k]}`);
      });
    } catch (err) {
      // If duplicate key errors occur, the driver still reports result with insertedCount
      console.warn("InsertMany finished with errors (some documents may already exist).");
      if (err.result && typeof err.result.insertedCount === "number") {
        console.log(`Inserted ${err.result.insertedCount} products before error.`);
      }
      console.error(err.message);
    }
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await client.close();
  }
}

main();