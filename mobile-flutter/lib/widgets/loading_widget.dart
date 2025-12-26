import 'package:flutter/material.dart';

class LoadingWidget extends StatelessWidget {
  final int progress;

  const LoadingWidget({super.key, required this.progress});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFF8B5CF6),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
            ),
            const SizedBox(height: 20),
            Text(
              'Loading... $progress%',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontFamily: 'Poppins',
              ),
            ),
          ],
        ),
      ),
    );
  }
}
