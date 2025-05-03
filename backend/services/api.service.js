const { PrismaClient } = require("@prisma/client");
const { default: axios } = require("axios");
const { executeScrape } = require("../scrapingService/api.scrape");
const prisma = new PrismaClient();

class ApiServices {

    fetchLinks = async (url) => {
        try {
            const response = await axios.get(url);
            if (response.status !== 200) {
                throw new Error('Invalid response from API');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching links:', error);
            throw error;
        }
    }

    processUrls = async (urls) => {
        try {
            for (const url of urls) {
                const data = await executeScrape(url);
                if (!data) {
                    throw new Error('Failed to scrape data from URL');
                } 
                await prisma.inspiration.create({
                    data: {
                        title: data.title,
                        description: data.description,
                        link: data.link,
                        d_ss: data.d_ss,
                        m_ss: data.m_ss,
                        fonts: data.fonts,
                        colors: data.colors,
                        tech_stack: data.tech_stack,
                        categories: data.categories,
                        niche: data.niche,
                        slug: data.slug,
                        page_views: 0,
                    },
                });
            }
        } catch (error) {
            console.error('Error processing URLs:', error);
            throw error;
        }
    }

    fetchInspirations = async (page) => {
        try {
            const skip = (page - 1) * 10;
            const response = await prisma.inspiration.findMany({
                orderBy: {
                    createdAt: 'asc',
                },
                skip,
                take: 10
            });
            return response;
        } catch (error) {
            console.error('Error fetching inspirations:', error);
            throw error;
        }
    }

    fetchInspirationBySlug = async (slug) => {
        try {
            const inspiration = await prisma.inspiration.findUnique({
                where: { slug },
            });
    
            if (!inspiration) {
                throw new Error("Inspiration not found");
            }
    
            const updatedInspiration = await prisma.inspiration.update({
                where: { slug },
                data: {
                    views: inspiration.views + 1,
                },
            });

            return updatedInspiration;
    
        } catch (error) {
            console.error('Error fetching inspiration by slug:', error);
            throw error;
        }
    }
}

module.exports = ApiServices;