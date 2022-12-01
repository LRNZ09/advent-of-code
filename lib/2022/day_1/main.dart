import 'dart:math';

import 'package:advent_of_code/utils.dart';
import 'package:tuple/tuple.dart';

Future<Tuple2<int, int>> getResults() async {
  final contents = await getInputFile(day: 1, year: 2022).readAsString();

  final allCalories = contents
      // Split by each elf
      .split('\n\n')
      // Sum all the calories
      .map(
        (element) => element.split('\n').fold(
              0,
              (previousValue, element) => previousValue + int.parse(element),
            ),
      );
  final maxCalories = allCalories.reduce(max);

  final sortedCalories = allCalories.toList()..sort();
  final topThreeMaxCaloriesSum = sortedCalories
      .sublist(allCalories.length - 3)
      .fold(0, (previousValue, element) => previousValue + element);

  return Tuple2(maxCalories, topThreeMaxCaloriesSum);
}

void main() async {
  final results = await getResults();
  print('Part 1: ${results.item1}');
  print('Part 2: ${results.item2}');
}
