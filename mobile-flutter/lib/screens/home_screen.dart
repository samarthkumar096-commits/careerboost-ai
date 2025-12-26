import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:provider/provider.dart';
import '../widgets/custom_app_bar.dart';
import '../widgets/loading_widget.dart';
import '../widgets/error_widget.dart';
import '../providers/api_providers.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final WebViewController _controller;
  bool _isLoading = true;
  bool _hasError = false;
  String _errorMessage = '';
  int _loadingProgress = 0;

  @override
  void initState() {
    super.initState();
    _checkConnectivity();
    _initializeWebView();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    await authProvider.checkAuth();
  }

  Future<void> _checkConnectivity() async {
    final connectivityResult = await Connectivity().checkConnectivity();
    if (connectivityResult == ConnectivityResult.none) {
      setState(() {
        _hasError = true;
        _errorMessage = 'No internet connection';
      });
    }
  }

  void _initializeWebView() {
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF8B5CF6))
      ..addJavaScriptChannel(
        'FlutterChannel',
        onMessageReceived: (JavaScriptMessage message) {
          // Handle messages from WebView
          _handleWebViewMessage(message.message);
        },
      )
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            setState(() {
              _loadingProgress = progress;
            });
          },
          onPageStarted: (String url) {
            setState(() {
              _isLoading = true;
              _hasError = false;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
            });
            _injectJavaScript();
          },
          onWebResourceError: (WebResourceError error) {
            setState(() {
              _hasError = true;
              _errorMessage = error.description;
              _isLoading = false;
            });
          },
        ),
      )
      ..loadRequest(Uri.parse('https://careerboost-ai-two.vercel.app'));
  }

  void _injectJavaScript() {
    // Inject JavaScript to communicate with Flutter
    _controller.runJavaScript('''
      window.FlutterChannel = {
        postMessage: function(message) {
          FlutterChannel.postMessage(JSON.stringify(message));
        }
      };
      
      // Notify Flutter when user logs in
      window.addEventListener('userLoggedIn', function(event) {
        FlutterChannel.postMessage({
          type: 'login',
          data: event.detail
        });
      });
      
      // Notify Flutter when user logs out
      window.addEventListener('userLoggedOut', function() {
        FlutterChannel.postMessage({
          type: 'logout'
        });
      });
    ''');
  }

  void _handleWebViewMessage(String message) {
    try {
      // Parse message and handle accordingly
      // Example: Handle login/logout events
      print('Message from WebView: $message');
    } catch (e) {
      print('Error handling message: $e');
    }
  }

  Future<void> _reload() async {
    await _checkConnectivity();
    if (!_hasError) {
      _controller.reload();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        onRefresh: _reload,
        controller: _controller,
      ),
      body: Stack(
        children: [
          // WebView
          if (!_hasError)
            WebViewWidget(controller: _controller),
          
          // Loading Indicator
          if (_isLoading && !_hasError)
            LoadingWidget(progress: _loadingProgress),
          
          // Error Widget
          if (_hasError)
            CustomErrorWidget(
              message: _errorMessage,
              onRetry: _reload,
            ),
        ],
      ),
    );
  }
}
