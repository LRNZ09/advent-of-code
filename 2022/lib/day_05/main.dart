import 'package:advent_of_code/utils.dart';
import 'package:collection/collection.dart';
import 'package:tuple/tuple.dart';

class CrateMove {
  final int amount;
  final int from;
  final int to;

  const CrateMove(this.amount, this.from, this.to);

  @override
  String toString() => 'Move $amount from $from to $to';
}

enum CrateMoveMode { single, multiple }

Iterable<Iterable<String>> parseCargos(List<String> lines) =>
    lines.reversed.map(
      (crate) =>
          crate.split('').whereIndexed((index, element) => index % 4 == 1),
    );

int parseNumberOfCargos(String line) =>
    line.trim().split(RegExp(r'\s*')).map((e) => int.parse(e)).max;

Iterable<CrateMove> parseMoves(List<String> lines) => lines.map((move) {
      final parsedMove =
          move.split(' ').map((e) => int.tryParse(e)).whereNotNull();
      return CrateMove(
        parsedMove.elementAt(0),
        parsedMove.elementAt(1) - 1,
        parsedMove.elementAt(2) - 1,
      );
    });

List<List<String>> moveCrates({
  required int numberOfCargos,
  required Iterable<Iterable<String>> cargos,
  required Iterable<CrateMove> moves,
  required CrateMoveMode mode,
}) {
  final queuedCargos = List<List<String>>.generate(
    numberOfCargos,
    (index) => cargos
        .map((crates) => crates.elementAt(index))
        .where((maybeCrate) => maybeCrate.trim().isNotEmpty)
        .toList(),
    growable: false,
  );

  for (final move in moves) {
    final crates = List<String>.generate(
      move.amount,
      (index) => queuedCargos[move.from].removeLast(),
    );
    queuedCargos[move.to]
        .addAll(mode == CrateMoveMode.single ? crates : crates.reversed);
  }

  return queuedCargos;
}

String getTopCrates(List<List<String>> cargos) =>
    cargos.map((e) => e.lastOrNull).join();

Future<Tuple2<String, String>> getResults() async {
  final lines = await getInputFile(day: 5, year: 2022).readAsLines();

  final separatorLine = 9;
  final cargosLine = separatorLine - 1;

  final cargos = parseCargos(lines.sublist(0, cargosLine));
  final numberOfCargos = parseNumberOfCargos(lines[cargosLine]);
  final moves = parseMoves(lines.sublist(separatorLine + 1));

  final crates9000 = moveCrates(
    numberOfCargos: numberOfCargos,
    cargos: cargos,
    moves: moves,
    mode: CrateMoveMode.single,
  );
  final topCargos9000 = getTopCrates(crates9000);

  final crates9001 = moveCrates(
    numberOfCargos: numberOfCargos,
    cargos: cargos,
    moves: moves,
    mode: CrateMoveMode.multiple,
  );
  final topCargos9001 = getTopCrates(crates9001);

  return Tuple2(topCargos9000, topCargos9001);
}

void main() async {
  final results = await getResults();
  print('Part 1: ${results.item1}');
  print('Part 2: ${results.item2}');
}
