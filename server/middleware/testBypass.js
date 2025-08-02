import User from '../models/User.js';

// DEVELOPMENT ONLY - Bypass authentication for testing
export const testBypass = async (req, res, next) => {
    console.log('🚨 WARNING: Using test bypass middleware - DEVELOPMENT ONLY');
    
    try {
        // Create a mock user or use an existing one for testing
        // You can change this email to match a user in your database
        const testUser = await User.findOne({ email: 'test@example.com' });
        
        if (!testUser) {
            // Create a test user if one doesn't exist
            const newTestUser = await User.create({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'testpassword123' // This will be hashed by your User model
            });
            req.user = newTestUser;
            console.log('✅ Created new test user for bypass');
        } else {
            req.user = testUser;
            console.log('✅ Using existing test user for bypass');
        }
        
        next();
    } catch (error) {
        console.error('❌ Test bypass failed:', error.message);
        return res.status(500).json({ message: "Test bypass failed: " + error.message });
    }
}

// Alternative: Use a hardcoded user ID if you know one exists
export const testBypassWithId = async (req, res, next) => {
    console.log('🚨 WARNING: Using test bypass with hardcoded ID - DEVELOPMENT ONLY');
    
    try {
        // Replace this with an actual user ID from your database
        const userId = "REPLACE_WITH_ACTUAL_USER_ID"; // Put a real ObjectId here
        const testUser = await User.findById(userId).select("-password");
        
        if (!testUser) {
            return res.status(404).json({ message: "Test user not found" });
        }
        
        req.user = testUser;
        console.log('✅ Using test user:', testUser.email);
        next();
    } catch (error) {
        console.error('❌ Test bypass failed:', error.message);
        return res.status(500).json({ message: "Test bypass failed: " + error.message });
    }
}
