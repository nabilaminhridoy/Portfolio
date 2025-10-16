// Simple test to verify form data structure
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message to verify the contact form is working properly.'
};

console.log('Test form data:', testData);
console.log('JSON stringified:', JSON.stringify(testData));

// Test validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log('Email validation:', emailRegex.test(testData.email));
console.log('Name length valid:', testData.name.trim().length >= 2 && testData.name.trim().length <= 100);
console.log('Message length valid:', testData.message.trim().length >= 10 && testData.message.trim().length <= 2000);