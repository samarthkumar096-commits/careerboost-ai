import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../utils/api_constants.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  
  late Dio _dio;
  final _storage = const FlutterSecureStorage();
  
  ApiService._internal() {
    _dio = Dio(
      BaseOptions(
        baseUrl: ApiConstants.apiBaseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );
    
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          // Add token to headers
          final token = await getToken();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (error, handler) async {
          // Handle 401 Unauthorized
          if (error.response?.statusCode == 401) {
            await clearToken();
            // Navigate to login
          }
          return handler.next(error);
        },
      ),
    );
  }
  
  // Token Management
  Future<void> saveToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }
  
  Future<String?> getToken() async {
    return await _storage.read(key: 'auth_token');
  }
  
  Future<void> clearToken() async {
    await _storage.delete(key: 'auth_token');
  }
  
  // Auth APIs
  Future<Response> login(String email, String password) async {
    try {
      return await _dio.post(
        ApiConstants.login,
        data: {
          'email': email,
          'password': password,
        },
      );
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> register(Map<String, dynamic> data) async {
    try {
      return await _dio.post(ApiConstants.register, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> logout() async {
    try {
      final response = await _dio.post(ApiConstants.logout);
      await clearToken();
      return response;
    } catch (e) {
      rethrow;
    }
  }
  
  // Resume APIs
  Future<Response> generateResume(Map<String, dynamic> data) async {
    try {
      return await _dio.post(ApiConstants.generateResume, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> getResumes() async {
    try {
      return await _dio.get(ApiConstants.getResumes);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> getResumeById(String id) async {
    try {
      return await _dio.get('${ApiConstants.getResumeById}/$id');
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> updateResume(String id, Map<String, dynamic> data) async {
    try {
      return await _dio.put('${ApiConstants.updateResume}/$id', data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> deleteResume(String id) async {
    try {
      return await _dio.delete('${ApiConstants.deleteResume}/$id');
    } catch (e) {
      rethrow;
    }
  }
  
  // ATS Score APIs
  Future<Response> checkAtsScore(Map<String, dynamic> data) async {
    try {
      return await _dio.post(ApiConstants.checkAtsScore, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> getAtsHistory() async {
    try {
      return await _dio.get(ApiConstants.getAtsHistory);
    } catch (e) {
      rethrow;
    }
  }
  
  // Cover Letter APIs
  Future<Response> generateCoverLetter(Map<String, dynamic> data) async {
    try {
      return await _dio.post(ApiConstants.generateCoverLetter, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> getCoverLetters() async {
    try {
      return await _dio.get(ApiConstants.getCoverLetters);
    } catch (e) {
      rethrow;
    }
  }
  
  // Payment APIs
  Future<Response> createOrder(Map<String, dynamic> data) async {
    try {
      return await _dio.post(ApiConstants.createOrder, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> verifyPayment(Map<String, dynamic> data) async {
    try {
      return await _dio.post(ApiConstants.verifyPayment, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> getPaymentHistory() async {
    try {
      return await _dio.get(ApiConstants.getPaymentHistory);
    } catch (e) {
      rethrow;
    }
  }
  
  // User APIs
  Future<Response> getUserProfile() async {
    try {
      return await _dio.get(ApiConstants.getUserProfile);
    } catch (e) {
      rethrow;
    }
  }
  
  Future<Response> updateUserProfile(Map<String, dynamic> data) async {
    try {
      return await _dio.put(ApiConstants.updateUserProfile, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  // File Upload
  Future<Response> uploadFile(String filePath) async {
    try {
      FormData formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(filePath),
      });
      
      return await _dio.post(
        ApiConstants.uploadFile,
        data: formData,
      );
    } catch (e) {
      rethrow;
    }
  }
  
  // Generic GET request
  Future<Response> get(String endpoint, {Map<String, dynamic>? queryParams}) async {
    try {
      return await _dio.get(endpoint, queryParameters: queryParams);
    } catch (e) {
      rethrow;
    }
  }
  
  // Generic POST request
  Future<Response> post(String endpoint, {dynamic data}) async {
    try {
      return await _dio.post(endpoint, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  // Generic PUT request
  Future<Response> put(String endpoint, {dynamic data}) async {
    try {
      return await _dio.put(endpoint, data: data);
    } catch (e) {
      rethrow;
    }
  }
  
  // Generic DELETE request
  Future<Response> delete(String endpoint) async {
    try {
      return await _dio.delete(endpoint);
    } catch (e) {
      rethrow;
    }
  }
}
