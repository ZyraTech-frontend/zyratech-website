import contentService from './contentService';

const heroService = {
    // Get all slides - use contentService to fetch from backend
    getAllSlides: async () => {
        try {
            const response = await contentService.getAllHeroSlides();
            return { data: response || [] };
        } catch (error) {
            console.error('Error fetching hero slides:', error);
            return { data: [] };
        }
    },

    // Get single slide - use getHeroSlide from contentService
    getSlide: async (id) => {
        try {
            const response = await contentService.getHeroSlide(id);
            return { data: response };
        } catch (error) {
            console.error('Error fetching hero slide:', error);
            throw error;
        }
    },

    // Alias for getSlide for backward compatibility
    getSlideById: async (id) => {
        return heroService.getSlide(id);
    },

    // Create new slide - use contentService
    createSlide: async (slideData) => {
        try {
            const response = await contentService.createHeroSlide(slideData);
            return { data: response };
        } catch (error) {
            console.error('Error creating hero slide:', error);
            throw error;
        }
    },

    // Update existing slide - use contentService
    updateSlide: async (id, slideData) => {
        try {
            const response = await contentService.updateHeroSlide(id, slideData);
            return { data: response };
        } catch (error) {
            console.error('Error updating hero slide:', error);
            throw error;
        }
    },

    // Delete slide - use contentService
    deleteSlide: async (id) => {
        try {
            const response = await contentService.deleteHeroSlide(id);
            return { success: true, data: response };
        } catch (error) {
            console.error('Error deleting hero slide:', error);
            throw error;
        }
    }
};

export default heroService;
