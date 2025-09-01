// Test script to verify the signup API
const testSignup = async () => {
  try {
    console.log('🧪 Testing signup API...');
    
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        fullName: 'Test User',
        email: 'test@example.com',
        contact: '1234567890',
        password: 'TestPassword123!'
      })
    });

    console.log('📊 Response Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Signup API is working!');
      console.log('📄 Response:', result);
    } else {
      const result = await response.json();
      console.log('❌ Signup API error:', result.message);
    }
    
  } catch (error) {
    console.error('🚨 Test failed:', error.message);
  }
};

// Run the test
testSignup();
