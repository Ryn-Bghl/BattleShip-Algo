from typing import List, Any


def display_grid(grid):
    for row in grid:
        print(' '.join(str(cell) for cell in row))


def rotate_boat(boat):
    return [list(reversed(col)) for col in zip(*boat)]


def isplacable(boat, grid):
    try:
        for i in range(len(boat)):
            for j in range(len(boat[i])):
                if boat[i][j] == 1 and type(grid[i][j]) != int:
                    return False
        return True
    except:
        return False


def get_frequency(grid, boat):
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if isplacable(boat, grid):
                grid[i][j] += 1
    return


def get_max_width(matrix):
    return max(len(row) for row in matrix)


def set_next_position(boat: List[List[int]], grid: List[List[int]]) -> None:
    """Set the next position of the boat in the grid."""
    for i, row in enumerate(boat):
        for j, cell in enumerate(row):
            if isplacable(boat, grid):
                if get_max_width(boat) != get_max_width(grid):
                    return [[0] + row[:-1] for row in boat]
                else:
                    zero_row = [0] * len(boat[0])
                    return [zero_row] + boat[:-1]


grid = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]]

boat = [[1, 1, 0],
        [0, 0, 0],
        [0, 0, 0]]

# display_grid(boat)
set_next_position(boat, grid)
display_grid(boat)
