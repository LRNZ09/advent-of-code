import 'package:advent_of_code/utils.dart';
import 'package:collection/collection.dart';
import 'package:tuple/tuple.dart';

enum OpponentShape {
  rock,
  paper,
  scissors;

  const OpponentShape();

  factory OpponentShape.fromCode(String code) {
    switch (code) {
      case 'A':
        return OpponentShape.rock;
      case 'B':
        return OpponentShape.paper;
      case 'C':
        return OpponentShape.scissors;
      default:
        throw 'Unhandled code';
    }
  }
}

enum PlayerShape {
  rock(score: 1),
  paper(score: 2),
  scissors(score: 3);

  const PlayerShape({required this.score});

  factory PlayerShape.fromCode(String code) {
    switch (code) {
      case 'X':
        return PlayerShape.rock;
      case 'Y':
        return PlayerShape.paper;
      case 'Z':
        return PlayerShape.scissors;
      default:
        throw 'Unhandled code';
    }
  }

  final int score;
}

enum RoundScore {
  lost(score: 0),
  draw(score: 3),
  won(score: 6);

  const RoundScore({required this.score});

  factory RoundScore.fromCode(String code) {
    switch (code) {
      case 'X':
        return RoundScore.lost;
      case 'Y':
        return RoundScore.draw;
      case 'Z':
        return RoundScore.won;
      default:
        throw 'Unhandled code';
    }
  }

  final int score;
}

RoundScore battleShapes(OpponentShape opponentShape, PlayerShape playerShape) {
  switch (opponentShape) {
    case OpponentShape.rock:
      {
        switch (playerShape) {
          case PlayerShape.rock:
            return RoundScore.draw;
          case PlayerShape.paper:
            return RoundScore.won;
          case PlayerShape.scissors:
            return RoundScore.lost;
        }
      }
    case OpponentShape.paper:
      {
        switch (playerShape) {
          case PlayerShape.rock:
            return RoundScore.lost;
          case PlayerShape.paper:
            return RoundScore.draw;
          case PlayerShape.scissors:
            return RoundScore.won;
        }
      }
    case OpponentShape.scissors:
      {
        switch (playerShape) {
          case PlayerShape.rock:
            return RoundScore.won;
          case PlayerShape.paper:
            return RoundScore.lost;
          case PlayerShape.scissors:
            return RoundScore.draw;
        }
      }
  }
}

PlayerShape getPlayerShape(OpponentShape opponentShape, RoundScore roundScore) {
  switch (opponentShape) {
    case OpponentShape.rock:
      {
        switch (roundScore) {
          case RoundScore.draw:
            return PlayerShape.rock;
          case RoundScore.won:
            return PlayerShape.paper;
          case RoundScore.lost:
            return PlayerShape.scissors;
        }
      }
    case OpponentShape.paper:
      {
        switch (roundScore) {
          case RoundScore.lost:
            return PlayerShape.rock;
          case RoundScore.draw:
            return PlayerShape.paper;
          case RoundScore.won:
            return PlayerShape.scissors;
        }
      }
    case OpponentShape.scissors:
      {
        switch (roundScore) {
          case RoundScore.won:
            return PlayerShape.rock;
          case RoundScore.lost:
            return PlayerShape.paper;
          case RoundScore.draw:
            return PlayerShape.scissors;
        }
      }
  }
}

Future<Tuple2<int, int>> getResults() async {
  final lines = await getInputFile(day: 2, year: 2022).readAsLines();

  final rounds = lines.map(
    (element) => element.split(' '),
  );

  final totalScoreWrong = rounds.map((codes) {
    final opponentShape = OpponentShape.fromCode(codes[0]);
    final playerShape = PlayerShape.fromCode(codes[1]);
    final roundScore = battleShapes(opponentShape, playerShape);
    return roundScore.score + playerShape.score;
  }).sum;

  final totalScoreCorrect = rounds.map((codes) {
    final opponentShape = OpponentShape.fromCode(codes[0]);
    final roundScore = RoundScore.fromCode(codes[1]);
    final playerShape = getPlayerShape(opponentShape, roundScore);
    return roundScore.score + playerShape.score;
  }).sum;

  return Tuple2(totalScoreWrong, totalScoreCorrect);
}

void main() async {
  final results = await getResults();
  print('Part 1: ${results.item1}');
  print('Part 2: ${results.item2}');
}
