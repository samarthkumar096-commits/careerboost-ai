class ApiConstants {
  // Base URL
  static const String baseUrl = 'https://careerboost-ai-two.vercel.app';
  static const String apiBaseUrl = '$baseUrl/api';
  
  // API Endpoints
  static const String login = '$apiBaseUrl/auth/login';
  static const String register = '$apiBaseUrl/auth/register';
  static const String logout = '$apiBaseUrl/auth/logout';
  
  // Resume Endpoints
  static const String generateResume = '$apiBaseUrl/resume/generate';
  static const String getResumes = '$apiBaseUrl/resume/list';
  static const String getResumeById = '$apiBaseUrl/resume';
  static const String updateResume = '$apiBaseUrl/resume/update';
  static const String deleteResume = '$apiBaseUrl/resume/delete';
  
  // ATS Score Endpoints
  static const String checkAtsScore = '$apiBaseUrl/ats/check';
  static const String getAtsHistory = '$apiBaseUrl/ats/history';
  
  // Cover Letter Endpoints
  static const String generateCoverLetter = '$apiBaseUrl/cover-letter/generate';
  static const String getCoverLetters = '$apiBaseUrl/cover-letter/list';
  
  // Payment Endpoints
  static const String createOrder = '$apiBaseUrl/payment/create-order';
  static const String verifyPayment = '$apiBaseUrl/payment/verify';
  static const String getPaymentHistory = '$apiBaseUrl/payment/history';
  
  // User Endpoints
  static const String getUserProfile = '$apiBaseUrl/user/profile';
  static const String updateUserProfile = '$apiBaseUrl/user/update';
  static const String uploadFile = '$apiBaseUrl/upload';
  
  // Headers
  static Map<String, String> getHeaders({String? token}) {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }
  
  static Map<String, String> getMultipartHeaders({String? token}) {
    return {
      'Accept': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }
}
