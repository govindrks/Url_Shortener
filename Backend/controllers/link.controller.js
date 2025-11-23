import { customAlphabet } from 'nanoid';
import { Link } from '../models/link.model.js';
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);


const BASE_URL = 'https://url-shortener-m2jp.onrender.com';

export async function createShort(req, res) {
  const { originalUrl } = req.body;
  try {
    // Here i am validating the URL
    const urlObj = new URL(originalUrl); // throws if invalid

    // generate unique shortCode (retry on collision)
    let shortCode;
    let exists;
    do {
      shortCode = nanoid();
      exists = await Link.findOne({ shortCode });
    } while (exists);

    console.log(BASE_URL);
    const doc = await Link.create({ shortCode, originalUrl: urlObj.toString() });
    res.status(201).json({ shortUrl: `${BASE_URL}/${doc.shortCode}` });
  } catch (err) {
    res.status(400).json({ error: 'Invalid URL' });
  }
}


// Redirect handler when accessing short URL which is stored in the database each time
export async function handleRedirect(req, res) {
  const { code } = req.params;
  const link = await Link.findOne({ shortCode: code });
  if (!link) return res.status(404).send('Not found');

  // increment clicks (fire-and-forget or await)
  link.clicks += 1;
  link.save().catch(console.error);

  // 301 = permanent, 302 = temporary — choose based on behavior you want
  res.redirect(302, link.originalUrl);
}
