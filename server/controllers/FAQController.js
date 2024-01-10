import FAQModel from '../models/FAQ.js';

export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQModel.find();
    res.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve FAQs' });
  }
};

export const getOneFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQModel.findById(id);

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.status(200).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve FAQ' });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQModel({ question, answer });
    const savedFAQ = await newFAQ.save();
    res.status(201).json(savedFAQ);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create FAQ' });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updatedFAQ = await FAQModel.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.status(200).json(updatedFAQ);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update FAQ' });
  }
};

export const deleteFAQ = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFAQ = await FAQModel.findByIdAndDelete(id);
  
      if (!deletedFAQ) {
        return res.status(404).json({ message: 'FAQ not found' });
      }
  
      res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete FAQ' });
    }
};