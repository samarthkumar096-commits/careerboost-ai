# 🔗 Flutter API Integration - Complete Guide

## ✅ API INTEGRATION COMPLETE!

### What's Connected:
```
✅ Backend API: https://careerboost-ai-two.vercel.app
✅ All endpoints configured
✅ Authentication system
✅ Token management
✅ State management
✅ Error handling
✅ WebView ↔ Flutter bridge
✅ Secure storage
✅ API interceptors
```

---

## 🎯 FEATURES

### API Services:
```
✅ Authentication (Login/Register/Logout)
✅ Resume Generation
✅ Resume Management (CRUD)
✅ ATS Score Checking
✅ Cover Letter Generation
✅ Payment Integration (Razorpay)
✅ User Profile Management
✅ File Upload
```

### Communication:
```
✅ Flutter → Backend API (REST)
✅ WebView → Flutter (JavaScript Bridge)
✅ Flutter → WebView (JavaScript Injection)
✅ Real-time data sync
✅ Token-based authentication
✅ Secure storage
```

---

## 📦 API STRUCTURE

### Files Created:
```
lib/
├── services/
│   └── api_service.dart (Complete API client)
├── models/
│   └── models.dart (Data models)
├── providers/
│   ├── app_provider.dart (App state)
│   └── api_providers.dart (API state)
└── utils/
    └── api_constants.dart (Endpoints)
```

---

## 🔌 API ENDPOINTS

### Authentication:
```dart
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Resume:
```dart
POST /api/resume/generate
GET  /api/resume/list
GET  /api/resume/:id
PUT  /api/resume/update/:id
DELETE /api/resume/delete/:id
```

### ATS Score:
```dart
POST /api/ats/check
GET  /api/ats/history
```

### Cover Letter:
```dart
POST /api/cover-letter/generate
GET  /api/cover-letter/list
```

### Payment:
```dart
POST /api/payment/create-order
POST /api/payment/verify
GET  /api/payment/history
```

### User:
```dart
GET  /api/user/profile
PUT  /api/user/update
POST /api/upload
```

---

## 💻 USAGE EXAMPLES

### Login:
```dart
final authProvider = Provider.of<AuthProvider>(context);

bool success = await authProvider.login(
  'user@example.com',
  'password123'
);

if (success) {
  // Navigate to home
  Navigator.pushReplacementNamed(context, '/home');
}
```

### Generate Resume:
```dart
final resumeProvider = Provider.of<ResumeProvider>(context);

bool success = await resumeProvider.generateResume({
  'name': 'John Doe',
  'email': 'john@example.com',
  'experience': [...],
  'education': [...],
  'skills': [...],
});

if (success) {
  // Resume generated successfully
  final resume = resumeProvider.currentResume;
}
```

### Check ATS Score:
```dart
final apiService = ApiService();

final response = await apiService.checkAtsScore({
  'resumeId': 'resume_id_here',
  'jobDescription': 'Job description text...',
});

if (response.statusCode == 200) {
  final atsScore = AtsScore.fromJson(response.data);
  print('Score: ${atsScore.score}');
}
```

### Upload File:
```dart
final apiService = ApiService();

final response = await apiService.uploadFile('/path/to/file.pdf');

if (response.statusCode == 200) {
  final fileUrl = response.data['url'];
  print('File uploaded: $fileUrl');
}
```

---

## 🌉 WEBVIEW ↔ FLUTTER BRIDGE

### Flutter → WebView (Inject JS):
```dart
_controller.runJavaScript('''
  // Your JavaScript code here
  console.log('Hello from Flutter!');
  
  // Call web functions
  window.someWebFunction();
''');
```

### WebView → Flutter (JavaScript Channel):
```dart
// In Flutter:
_controller.addJavaScriptChannel(
  'FlutterChannel',
  onMessageReceived: (message) {
    print('Message from web: ${message.message}');
  },
);

// In Web (JavaScript):
FlutterChannel.postMessage(JSON.stringify({
  type: 'login',
  data: { userId: '123', token: 'abc' }
}));
```

### Events:
```javascript
// Web dispatches event
window.dispatchEvent(new CustomEvent('userLoggedIn', {
  detail: { userId: '123', token: 'abc' }
}));

// Flutter listens via injected JS
window.addEventListener('userLoggedIn', function(event) {
  FlutterChannel.postMessage({
    type: 'login',
    data: event.detail
  });
});
```

---

## 🔐 AUTHENTICATION FLOW

### Login Process:
```
1. User enters credentials
2. Flutter calls API: POST /api/auth/login
3. Backend validates & returns token
4. Flutter saves token (secure storage)
5. Token added to all API requests
6. User authenticated
```

### Token Management:
```dart
// Save token
await ApiService().saveToken('your_token_here');

// Get token
String? token = await ApiService().getToken();

// Clear token (logout)
await ApiService().clearToken();
```

### Auto-attach Token:
```dart
// Interceptor automatically adds token to headers
_dio.interceptors.add(
  InterceptorsWrapper(
    onRequest: (options, handler) async {
      final token = await getToken();
      if (token != null) {
        options.headers['Authorization'] = 'Bearer $token';
      }
      return handler.next(options);
    },
  ),
);
```

---

## 📊 STATE MANAGEMENT

### Providers:
```dart
// App Provider (UI state)
- isDarkMode
- isLoading
- currentUrl

// Auth Provider (Authentication)
- user
- isAuthenticated
- login()
- register()
- logout()

// Resume Provider (Resume management)
- resumes
- currentResume
- fetchResumes()
- generateResume()
- deleteResume()
```

### Usage:
```dart
// Access provider
final authProvider = Provider.of<AuthProvider>(context);

// Listen to changes
Consumer<AuthProvider>(
  builder: (context, auth, child) {
    if (auth.isAuthenticated) {
      return HomeScreen();
    }
    return LoginScreen();
  },
);
```

---

## 🛡️ ERROR HANDLING

### API Errors:
```dart
try {
  final response = await apiService.login(email, password);
  // Handle success
} catch (e) {
  if (e is DioException) {
    if (e.response?.statusCode == 401) {
      // Unauthorized
    } else if (e.response?.statusCode == 500) {
      // Server error
    }
  }
  // Handle error
}
```

### Auto-logout on 401:
```dart
_dio.interceptors.add(
  InterceptorsWrapper(
    onError: (error, handler) async {
      if (error.response?.statusCode == 401) {
        await clearToken();
        // Navigate to login
      }
      return handler.next(error);
    },
  ),
);
```

---

## 🔄 DATA MODELS

### User Model:
```dart
class User {
  final String id;
  final String name;
  final String email;
  final String? phone;
  final String? avatar;
  
  User.fromJson(Map<String, dynamic> json);
  Map<String, dynamic> toJson();
}
```

### Resume Model:
```dart
class Resume {
  final String id;
  final String userId;
  final String title;
  final Map<String, dynamic> content;
  
  Resume.fromJson(Map<String, dynamic> json);
  Map<String, dynamic> toJson();
}
```

### ATS Score Model:
```dart
class AtsScore {
  final String id;
  final int score;
  final Map<String, dynamic> analysis;
  final List<String> suggestions;
  
  AtsScore.fromJson(Map<String, dynamic> json);
}
```

---

## 🚀 ADVANCED FEATURES

### File Upload:
```dart
FormData formData = FormData.fromMap({
  'file': await MultipartFile.fromFile(filePath),
});

final response = await _dio.post(
  '/api/upload',
  data: formData,
);
```

### Pagination:
```dart
Future<Response> getResumes({int page = 1, int limit = 10}) async {
  return await _dio.get(
    '/api/resume/list',
    queryParameters: {
      'page': page,
      'limit': limit,
    },
  );
}
```

### Search:
```dart
Future<Response> searchResumes(String query) async {
  return await _dio.get(
    '/api/resume/search',
    queryParameters: {'q': query},
  );
}
```

---

## 💡 BEST PRACTICES

### 1. Always use try-catch:
```dart
try {
  final response = await apiService.someMethod();
  // Handle success
} catch (e) {
  // Handle error
}
```

### 2. Show loading states:
```dart
setState(() => _isLoading = true);
try {
  await apiCall();
} finally {
  setState(() => _isLoading = false);
}
```

### 3. Validate before API call:
```dart
if (email.isEmpty || password.isEmpty) {
  showError('Please fill all fields');
  return;
}
await login(email, password);
```

### 4. Use providers for state:
```dart
// Don't store in widget state
// Use Provider instead
final authProvider = Provider.of<AuthProvider>(context);
```

---

## 🔧 CONFIGURATION

### Timeout:
```dart
BaseOptions(
  connectTimeout: Duration(seconds: 30),
  receiveTimeout: Duration(seconds: 30),
)
```

### Base URL:
```dart
// Change in api_constants.dart
static const String baseUrl = 'https://your-api.com';
```

### Headers:
```dart
static Map<String, String> getHeaders({String? token}) {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    if (token != null) 'Authorization': 'Bearer $token',
  };
}
```

---

## ✅ TESTING

### Test API calls:
```dart
void main() {
  test('Login API', () async {
    final apiService = ApiService();
    final response = await apiService.login(
      'test@example.com',
      'password123'
    );
    expect(response.statusCode, 200);
  });
}
```

---

## 🎯 SUMMARY

**Complete API Integration:**
```
✅ All endpoints configured
✅ Authentication system
✅ Token management
✅ State management
✅ Error handling
✅ WebView bridge
✅ Secure storage
✅ Data models
✅ Providers
✅ Best practices
```

**Ready to use:**
```
✅ Login/Register
✅ Generate Resume
✅ Check ATS Score
✅ Generate Cover Letter
✅ Payment Integration
✅ File Upload
✅ Profile Management
```

---

**🎉 FLUTTER FULLY CONNECTED TO BACKEND! 🎉**
