import 'package:advent_of_code/utils.dart';
import 'package:collection/collection.dart';
import 'package:tuple/tuple.dart';

bool isUppercase(String str) => str == str.toUpperCase();

Set<String> parseCompartment(String compartment) =>
    Set.unmodifiable(compartment.split(''));

int parseItem(String item) {
  final codeUnit = item.codeUnitAt(0);
  if (isUppercase(item)) {
    return codeUnit - 38;
  }
  return codeUnit - 96;
}

Future<Tuple2<int, int>> getResults() async {
  final rucksacks = await getInputFile(day: 3, year: 2022).readAsLines();

  final totalPriorities = rucksacks.map((rucksack) {
    final half = rucksack.length ~/ 2;
    final firstCompartment = parseCompartment(rucksack.substring(0, half));
    final secondCompartment = parseCompartment(rucksack.substring(half));
    final item = firstCompartment.intersection(secondCompartment).first;
    return parseItem(item);
  }).sum;

  final totalGroupPriorities = rucksacks.slices(3).map((rucksacksGroup) {
    final firstElf = parseCompartment(rucksacksGroup[0]);
    final secondElf = parseCompartment(rucksacksGroup[1]);
    final thirdElf = parseCompartment(rucksacksGroup[2]);
    final item = firstElf.intersection(secondElf).intersection(thirdElf).first;
    return parseItem(item);
  }).sum;

  return Tuple2(totalPriorities, totalGroupPriorities);
}

void main() async {
  final results = await getResults();
  print('Part 1: ${results.item1}');
  print('Part 2: ${results.item2}');
}
