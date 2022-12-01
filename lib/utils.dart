import 'dart:io';

import 'package:path/path.dart' as path;

String findProjectPath() {
  final projectFileName = 'pubspec.yaml';

  final pathsTree = path
      .split(path.current)
      .map((element) => path.current.split(element)[0])
      .where((element) => element.isNotEmpty)
      .toList()
    ..add(path.current);

  final reversedPathsTree = pathsTree.reversed;

  for (final maybeProjectPath in reversedPathsTree) {
    final maybeProjectFilePath = path.join(maybeProjectPath, projectFileName);
    if (File(maybeProjectFilePath).existsSync()) {
      return maybeProjectPath;
    }
  }

  throw 'Project path not found.';
}

File getInputFile({
  required int day,
  required int year,
  String? inputFileName = './input.txt',
}) {
  final projectPath = findProjectPath();
  final inputFilePath = path.normalize(
    path.join(projectPath, 'lib', '$year', 'day_$day', inputFileName),
  );
  return File(inputFilePath);
}
