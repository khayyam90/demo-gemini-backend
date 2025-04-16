export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT ?? '3000', 10) || 3001,
    GEMINI_API: ''	
});