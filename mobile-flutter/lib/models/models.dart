class User {
  final String id;
  final String name;
  final String email;
  final String? phone;
  final String? avatar;
  final DateTime createdAt;
  final DateTime? updatedAt;

  User({
    required this.id,
    required this.name,
    required this.email,
    this.phone,
    this.avatar,
    required this.createdAt,
    this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? json['_id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'],
      avatar: json['avatar'],
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'avatar': avatar,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}

class Resume {
  final String id;
  final String userId;
  final String title;
  final Map<String, dynamic> content;
  final String? template;
  final DateTime createdAt;
  final DateTime? updatedAt;

  Resume({
    required this.id,
    required this.userId,
    required this.title,
    required this.content,
    this.template,
    required this.createdAt,
    this.updatedAt,
  });

  factory Resume.fromJson(Map<String, dynamic> json) {
    return Resume(
      id: json['id'] ?? json['_id'] ?? '',
      userId: json['userId'] ?? '',
      title: json['title'] ?? '',
      content: json['content'] ?? {},
      template: json['template'],
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'title': title,
      'content': content,
      'template': template,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}

class AtsScore {
  final String id;
  final String userId;
  final String resumeId;
  final int score;
  final Map<String, dynamic> analysis;
  final List<String> suggestions;
  final DateTime createdAt;

  AtsScore({
    required this.id,
    required this.userId,
    required this.resumeId,
    required this.score,
    required this.analysis,
    required this.suggestions,
    required this.createdAt,
  });

  factory AtsScore.fromJson(Map<String, dynamic> json) {
    return AtsScore(
      id: json['id'] ?? json['_id'] ?? '',
      userId: json['userId'] ?? '',
      resumeId: json['resumeId'] ?? '',
      score: json['score'] ?? 0,
      analysis: json['analysis'] ?? {},
      suggestions: List<String>.from(json['suggestions'] ?? []),
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'resumeId': resumeId,
      'score': score,
      'analysis': analysis,
      'suggestions': suggestions,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

class CoverLetter {
  final String id;
  final String userId;
  final String title;
  final String content;
  final String? jobTitle;
  final String? company;
  final DateTime createdAt;
  final DateTime? updatedAt;

  CoverLetter({
    required this.id,
    required this.userId,
    required this.title,
    required this.content,
    this.jobTitle,
    this.company,
    required this.createdAt,
    this.updatedAt,
  });

  factory CoverLetter.fromJson(Map<String, dynamic> json) {
    return CoverLetter(
      id: json['id'] ?? json['_id'] ?? '',
      userId: json['userId'] ?? '',
      title: json['title'] ?? '',
      content: json['content'] ?? '',
      jobTitle: json['jobTitle'],
      company: json['company'],
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'title': title,
      'content': content,
      'jobTitle': jobTitle,
      'company': company,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}

class Payment {
  final String id;
  final String userId;
  final String orderId;
  final double amount;
  final String currency;
  final String status;
  final String? paymentId;
  final DateTime createdAt;

  Payment({
    required this.id,
    required this.userId,
    required this.orderId,
    required this.amount,
    required this.currency,
    required this.status,
    this.paymentId,
    required this.createdAt,
  });

  factory Payment.fromJson(Map<String, dynamic> json) {
    return Payment(
      id: json['id'] ?? json['_id'] ?? '',
      userId: json['userId'] ?? '',
      orderId: json['orderId'] ?? '',
      amount: (json['amount'] ?? 0).toDouble(),
      currency: json['currency'] ?? 'INR',
      status: json['status'] ?? '',
      paymentId: json['paymentId'],
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'orderId': orderId,
      'amount': amount,
      'currency': currency,
      'status': status,
      'paymentId': paymentId,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
