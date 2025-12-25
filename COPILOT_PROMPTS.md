# GitHub Copilot Prompts for CareerBoost AI

## 🎯 Ready-to-Use Prompts

### Payment Integration

```javascript
// Create Razorpay payment order
// Accept amount in INR, convert to paise
// Return order ID, amount, currency, and key
// Handle errors with proper error messages
// Add logging for debugging
```

```javascript
// Verify Razorpay payment signature
// Accept order_id, payment_id, and signature
// Use HMAC SHA256 for verification
// Return success/failure with proper error handling
// Log verification attempts
```

---

### Resume Builder

```javascript
// Create AI-powered resume content generator
// Use Gemini API for content generation
// Accept user data: name, experience, skills, education
// Generate professional resume content
// Optimize for ATS (Applicant Tracking Systems)
// Return formatted resume sections
```

```javascript
// Calculate ATS score for resume
// Analyze resume text for keywords
// Check formatting and structure
// Provide improvement suggestions
// Return score (0-100) with detailed feedback
```

---

### Authentication

```javascript
// Implement Supabase authentication
// Support email/password login
// Add social login (Google, GitHub)
// Handle session management
// Include protected route wrapper
// Add error handling and loading states
```

```javascript
// Create protected route component
// Check user authentication status
// Redirect to login if not authenticated
// Show loading spinner during check
// Handle authentication errors
```

---

### API Integration

```javascript
// Create reusable API client
// Support GET, POST, PUT, DELETE methods
// Add authentication headers
// Handle errors with retry logic
// Include request/response interceptors
// Add loading states
```

```javascript
// Implement API error handling
// Categorize errors (network, auth, server, validation)
// Show user-friendly error messages
// Log errors for debugging
// Add retry mechanism for failed requests
```

---

### Form Handling

```javascript
// Create form validation hook
// Support multiple validation rules
// Show real-time error messages
// Handle async validation
// Return validation state and errors
```

```javascript
// Create multi-step form component
// Track current step and progress
// Validate each step before proceeding
// Save form data between steps
// Handle form submission
```

---

### State Management

```javascript
// Create global state context
// Support user data, authentication, theme
// Provide hooks for accessing state
// Include actions for updating state
// Add persistence to localStorage
```

```javascript
// Create custom hook for API data fetching
// Support loading, error, and success states
// Add caching mechanism
// Include refetch functionality
// Handle race conditions
```

---

### UI Components

```javascript
// Create reusable button component
// Support variants: primary, secondary, outline, ghost
// Add loading state with spinner
// Include disabled state
// Support different sizes
// Add icon support
```

```javascript
// Create modal component
// Support open/close animations
// Add backdrop click to close
// Include header, body, footer sections
// Support custom sizes
// Add keyboard navigation (ESC to close)
```

---

### Testing

```javascript
// Write Jest tests for payment verification function
// Test successful verification
// Test invalid signature
// Test missing parameters
// Test error handling
// Mock Razorpay SDK
```

```javascript
// Write React Testing Library tests for login form
// Test form rendering
// Test input validation
// Test form submission
// Test error messages
// Mock authentication API
```

---

### Performance Optimization

```javascript
// Optimize React component rendering
// Add React.memo for expensive components
// Use useMemo for computed values
// Use useCallback for event handlers
// Implement code splitting
// Add lazy loading for routes
```

```javascript
// Implement image lazy loading
// Use Intersection Observer API
// Add loading placeholder
// Handle loading errors
// Support responsive images
```

---

### Error Handling

```javascript
// Create global error boundary
// Catch React component errors
// Show user-friendly error UI
// Log errors to monitoring service
// Add retry mechanism
// Include error reporting
```

```javascript
// Create error logging service
// Support different log levels (info, warn, error)
// Send errors to backend
// Include user context
// Add error grouping
// Support error filtering
```

---

### Database Operations

```javascript
// Create Supabase database service
// Support CRUD operations
// Add query filtering and sorting
// Include pagination
// Handle errors gracefully
// Add TypeScript types
```

```javascript
// Implement real-time subscriptions
// Listen to database changes
// Update UI automatically
// Handle connection errors
// Add reconnection logic
```

---

### File Upload

```javascript
// Create file upload component
// Support drag and drop
// Show upload progress
// Validate file type and size
// Handle upload errors
// Support multiple files
```

```javascript
// Upload file to Supabase Storage
// Generate unique filename
// Show upload progress
// Return file URL
// Handle upload errors
// Add file compression
```

---

### Email Integration

```javascript
// Send email using SendGrid
// Support HTML templates
// Add dynamic content
// Handle sending errors
// Add email tracking
// Support attachments
```

```javascript
// Create email template for payment confirmation
// Include order details
// Add payment receipt
// Include company branding
// Support responsive design
```

---

### Analytics

```javascript
// Implement Google Analytics tracking
// Track page views
// Track custom events
// Track user interactions
// Add conversion tracking
// Support custom dimensions
```

```javascript
// Create analytics hook
// Track component mount/unmount
// Track button clicks
// Track form submissions
// Support custom event properties
```

---

### SEO Optimization

```javascript
// Create SEO component
// Set page title and description
// Add Open Graph tags
// Include Twitter Card tags
// Add canonical URL
// Support dynamic meta tags
```

```javascript
// Generate sitemap.xml
// Include all public pages
// Add last modified dates
// Set priority for pages
// Support dynamic routes
```

---

## 💡 Tips for Better Prompts

### 1. Be Specific
```javascript
// ❌ Bad: Create a button
// ✅ Good: Create a reusable button component with variants, sizes, and loading state
```

### 2. Include Context
```javascript
// ✅ Good:
// Using Razorpay payment gateway
// Amount should be in paise (INR * 100)
// Return order ID for frontend
```

### 3. Specify Error Handling
```javascript
// ✅ Good:
// Handle network errors
// Show user-friendly messages
// Log errors for debugging
// Add retry mechanism
```

### 4. Mention Dependencies
```javascript
// ✅ Good:
// Using React 18 and TypeScript
// With Tailwind CSS for styling
// Using React Hook Form for validation
```

---

## 🎯 Project-Specific Prompts

### CareerBoost AI Features

```javascript
// Create AI resume optimizer
// Analyze resume content
// Suggest improvements for ATS
// Enhance keywords and phrases
// Improve formatting
// Return optimized resume with change highlights
```

```javascript
// Generate cover letter from resume
// Extract key skills and experience
// Match to job description
// Create personalized content
// Use professional tone
// Return formatted cover letter
```

```javascript
// Create resume template selector
// Show preview of each template
// Support filtering by industry
// Allow customization
// Export to PDF
// Save user preferences
```

---

**Use these prompts to speed up development! 🚀**
