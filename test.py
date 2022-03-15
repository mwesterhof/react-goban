# capture processing algorithm

WHITE = False
BLACK = True


def print_board(data):
    def get_char(value):
        if value is True:
            return ' B '
        if value is False:
            return ' W '
        return ' . '

    separator = '-' * (len(data[0]) * 4 + 1)
    print(separator)
    for line in data:
        printed_line = '|' + '|'.join([get_char(v) for v in line]) + '|'
        print(printed_line)
        print(separator)


def get_board(size):
    return [
        [None for i in range(size)]
        for j in range(size)
    ]


def process_captures(board, for_player):
    board_size = len(board)
    counts = get_board(board_size)

    def count_liberties(row, col, tracked=None):
        if tracked is None:
            tracked = set()

        if (row, col) in tracked:
            return 0
        tracked.add((row, col))

        if board[row][col] is (not for_player):
            return 0
        if row not in range(board_size):
            return 0
        if col not in range(board_size):
            return 0
        if board[row][col] is None:
            return 1
        results = [
            count_liberties(row - 1, col, tracked),
            count_liberties(row + 1, col, tracked),
            count_liberties(row, col - 1, tracked),
            count_liberties(row, col + 1, tracked)
        ]
        return sum([result for result in results if result])

    for row_idx, line in enumerate(board):
        for col_idx, cell in enumerate(line):
            if cell == for_player:
                counts[row_idx][col_idx] = count_liberties(row_idx, col_idx)

    for row_idx, line in enumerate(counts):
        for col_idx, cell in enumerate(line):
            if cell == 0:
                board[row_idx][col_idx] = None
    return board


data = get_board(10)

data[1][1] = BLACK
data[1][2] = BLACK

data[0][1] = WHITE
data[2][1] = WHITE
data[1][0] = WHITE
data[0][2] = WHITE
data[2][2] = WHITE
data[1][3] = WHITE

data[3][3] = BLACK

print_board(data)
print()
data = process_captures(data, BLACK)
print_board(data)
