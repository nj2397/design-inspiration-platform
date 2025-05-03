const { default: axios } = require("axios");
const ApiServices = require("../services/api.service.js");
const apiServices = new ApiServices();

class ApiController {
  getLinks = async(req, res) => {
    try {
        const { url } = req.body;
        const response = await apiServices.fetchLinks(url);
        res.status(200).json({
            "status": 200,
            "message": "Data fetched successfully",
            "data": response.data,
        })
    } catch (error) {
        res.status(500).json({ 
            "status": 500,
            "message": "Failed to fetch data",
            "data": error.message 
        });
    }
  }

  addInspiration = async(req, res) => {
    try {
        const { urls } = req.body;
        const response = await apiServices.processUrls(urls);
        res.status(200).json({
            "status": 200,
            "message": "Data processed successfully",
        })
    } catch (error) {
        res.status(500).json({ 
            "status": 500,
            "message": error.message, 
        });
    }
  }

  getInspirations = async(req, res) => {
    try {
        const { pageNo } = req.body;
        const response = await apiServices.fetchInspirations(pageNo);
        res.status(200).json({
            "status": 200,
            "message": "Data fetched successfully",
            "data": response.data,
        })
    } catch (error) {
        res.status(500).json({ 
            "status": 500,
            "message": error.message, 
        });
    }
  }

  getInspirationBySlug = async(req, res) => {
    try {
        const { slug } = req.params;
        const response = await apiServices.fetchInspirationBySlug(slug);
        res.status(200).json({
            "status": 200,
            "message": "Data fetched successfully",
            "data": response.data,
        })
    } catch (error) {
        res.status(500).json({ 
            "status": 500,
            "message": error.message, 
        });
    }
  }

}

module.exports = ApiController;