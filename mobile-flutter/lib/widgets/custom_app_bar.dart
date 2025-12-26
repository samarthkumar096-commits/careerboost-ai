import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final VoidCallback onRefresh;
  final WebViewController controller;

  const CustomAppBar({
    super.key,
    required this.onRefresh,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: const Text('CareerBoost AI'),
      actions: [
        // Back Button
        IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () async {
            if (await controller.canGoBack()) {
              controller.goBack();
            }
          },
        ),
        
        // Forward Button
        IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () async {
            if (await controller.canGoForward()) {
              controller.goForward();
            }
          },
        ),
        
        // Refresh Button
        IconButton(
          icon: const Icon(Icons.refresh),
          onPressed: onRefresh,
        ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
