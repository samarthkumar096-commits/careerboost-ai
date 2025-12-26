import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../models/models.dart';

class AuthProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  
  User? _user;
  bool _isAuthenticated = false;
  bool _isLoading = false;
  String? _errorMessage;

  User? get user => _user;
  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  // Login
  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await _apiService.login(email, password);
      
      if (response.statusCode == 200) {
        final data = response.data;
        
        // Save token
        if (data['token'] != null) {
          await _apiService.saveToken(data['token']);
        }
        
        // Save user
        if (data['user'] != null) {
          _user = User.fromJson(data['user']);
        }
        
        _isAuthenticated = true;
        _isLoading = false;
        notifyListeners();
        return true;
      }
      
      _errorMessage = 'Login failed';
      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // Register
  Future<bool> register(Map<String, dynamic> data) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await _apiService.register(data);
      
      if (response.statusCode == 200 || response.statusCode == 201) {
        final responseData = response.data;
        
        // Save token
        if (responseData['token'] != null) {
          await _apiService.saveToken(responseData['token']);
        }
        
        // Save user
        if (responseData['user'] != null) {
          _user = User.fromJson(responseData['user']);
        }
        
        _isAuthenticated = true;
        _isLoading = false;
        notifyListeners();
        return true;
      }
      
      _errorMessage = 'Registration failed';
      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // Logout
  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();

    try {
      await _apiService.logout();
    } catch (e) {
      // Ignore error, logout anyway
    }

    _user = null;
    _isAuthenticated = false;
    _isLoading = false;
    notifyListeners();
  }

  // Check authentication status
  Future<void> checkAuth() async {
    final token = await _apiService.getToken();
    
    if (token != null) {
      try {
        final response = await _apiService.getUserProfile();
        
        if (response.statusCode == 200) {
          _user = User.fromJson(response.data);
          _isAuthenticated = true;
        }
      } catch (e) {
        _isAuthenticated = false;
      }
    }
    
    notifyListeners();
  }

  // Clear error
  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}

class ResumeProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  
  List<Resume> _resumes = [];
  Resume? _currentResume;
  bool _isLoading = false;
  String? _errorMessage;

  List<Resume> get resumes => _resumes;
  Resume? get currentResume => _currentResume;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  // Get all resumes
  Future<void> fetchResumes() async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _apiService.getResumes();
      
      if (response.statusCode == 200) {
        final List<dynamic> data = response.data['resumes'] ?? [];
        _resumes = data.map((json) => Resume.fromJson(json)).toList();
      }
    } catch (e) {
      _errorMessage = e.toString();
    }

    _isLoading = false;
    notifyListeners();
  }

  // Generate resume
  Future<bool> generateResume(Map<String, dynamic> data) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _apiService.generateResume(data);
      
      if (response.statusCode == 200 || response.statusCode == 201) {
        _currentResume = Resume.fromJson(response.data['resume']);
        await fetchResumes();
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } catch (e) {
      _errorMessage = e.toString();
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  // Delete resume
  Future<bool> deleteResume(String id) async {
    try {
      final response = await _apiService.deleteResume(id);
      
      if (response.statusCode == 200) {
        _resumes.removeWhere((resume) => resume.id == id);
        notifyListeners();
        return true;
      }
    } catch (e) {
      _errorMessage = e.toString();
    }

    return false;
  }
}
