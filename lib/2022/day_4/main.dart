import 'package:advent_of_code/utils.dart';
import 'package:tuple/tuple.dart';

Future<Tuple2<int, int>> getResults() async {
  final lines = await getInputFile(day: 4, year: 2022).readAsLines();

  final sectionsSetsList = lines.map(
    (sectionPair) => sectionPair.split(',').map((sections) {
      final edges = sections.split('-');
      final min = int.parse(edges[0]);
      final max = int.parse(edges[1]);
      return List<int>.generate(
        max - min + 1,
        (int index) => index + min,
      ).toSet();
    }).toList(),
  );

  final totalContainsAll = sectionsSetsList.where(
    (sectionsSets) {
      final firstSection = sectionsSets[0];
      final secondSection = sectionsSets[1];

      return firstSection.containsAll(secondSection) ||
          secondSection.containsAll(firstSection);
    },
  ).length;

  final totalContainsSome = sectionsSetsList.where(
    (sectionsSets) {
      final firstSection = sectionsSets[0];
      final secondSection = sectionsSets[1];

      return firstSection.intersection(secondSection).isNotEmpty ||
          secondSection.intersection(firstSection).isNotEmpty;
    },
  ).length;

  return Tuple2(totalContainsAll, totalContainsSome);
}

void main() async {
  final results = await getResults();
  print('Part 1: ${results.item1}');
  print('Part 2: ${results.item2}');
}
