import 'package:test/test.dart';

import 'package:advent_of_code/2022/day_3/main.dart' as day_3;

void main() {
  group('Day 3 results', () {
    test('for part 1 should be correct', () async {
      final results = await day_3.getResults();
      expect(results.item1, equals(8252));
    });
    test('for part 2 should be correct', () async {
      final results = await day_3.getResults();
      expect(results.item2, equals(2828));
    });
  });
}
