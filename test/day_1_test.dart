import 'package:test/test.dart';

import 'package:advent_of_code/2022/day_1/main.dart' as day_1;

void main() {
  group('Day 1 results', () {
    test('for part 1 should be correct', () async {
      final results = await day_1.getResults();
      expect(results.item1, equals(66487));
    });
    test('for part 2 should be correct', () async {
      final results = await day_1.getResults();
      expect(results.item2, equals(197301));
    });
  });
}
