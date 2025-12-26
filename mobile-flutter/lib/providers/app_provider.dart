import 'package:flutter/material.dart';

class AppProvider with ChangeNotifier {
  bool _isDarkMode = false;
  bool _isLoading = false;
  String _currentUrl = 'https://careerboost-ai-two.vercel.app';

  bool get isDarkMode => _isDarkMode;
  bool get isLoading => _isLoading;
  String get currentUrl => _currentUrl;

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    notifyListeners();
  }

  void setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }

  void setCurrentUrl(String url) {
    _currentUrl = url;
    notifyListeners();
  }
}
