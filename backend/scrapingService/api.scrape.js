require('dotenv').config();


const executeScrape = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport for desktop screenshot
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract Title, Description, and Meta Info
    const title = await page.title();
    const metaDescription = await page.$eval('meta[name="description"]', el => el.content || '');
    const metaTitle = await page.$eval('meta[name="title"]', el => el.content || title);

    // Take Screenshots
    await page.screenshot({ path: 'desktop_screenshot.png' });

    // Set viewport for mobile screenshot
    await page.setViewport({ width: 375, height: 667 }); 
    await page.screenshot({ path: 'mobile_screenshot.png' });

    // Extract Fonts & Color Scheme
    const fonts = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
            .map(el => getComputedStyle(el).fontFamily)
            .filter((v, i, a) => a.indexOf(v) === i);
    });

    const colors = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
            .map(el => getComputedStyle(el).color)
            .filter((v, i, a) => a.indexOf(v) === i);
    });

    // Extract Technology Stack
    const techStack = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('script[src]'))
            .map(script => script.src);
    });

    // Extract Categories (example heuristic method)
    const categories = ['Landing Page', 'Pricing Page', 'About Page']; // Manually defined
    const niche = 'Technology'; // Define niche dynamically if needed

    // Generate a unique slug based on title
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    // Default values
    const pageViews = 0;
    const timestamps = { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };

    // Format extracted data
    const data = {
        title,
        description: metaDescription.slice(0, 300),
        link: url,
        d_ss: 'desktop_screenshot.png',
        m_ss: 'mobile_screenshot.png',
        color: colors.join(', '),
        fonts,
        stack: techStack,
        categories: { create: categories.map(category => ({ id: category })) },
        niche,
        slug: parseInt(slug.replace(/\D/g, ''), 10) || null,
        meta_title: metaTitle,
        meta_description: metaDescription,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    };


    

    await browser.close();
    return data

}

module.exports = { executeScrape };

