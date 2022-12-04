import 'package:test/test.dart';

import 'package:advent_of_code/2022/day_4/main.dart' as day_4;

void main() {
  group('Day 4 results', () {
    test('for part 1 should be correct', () async {
      final results = await day_4.getResults();
      expect(results.item1, equals(503));
    });
    test('for part 2 should be correct', () async {
      final results = await day_4.getResults();
      expect(results.item2, equals(827));
    });
  });
}
