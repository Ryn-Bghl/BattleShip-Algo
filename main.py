from prettytable import PrettyTable
import random


def display_grid(grid):
    table = PrettyTable()
    table.hrules = 1
    table.vrules = 1
    table.header = False

    for row in grid:
        table.add_row([str(cell).ljust(2) for cell in row])

    print(table, end="\n\n")


def rotate_boat(boat):
    return [list(reversed(col)) for col in zip(*boat)]


def get_stats(boat, grid):
    for n in range(4):
        for i in range(len(grid) - len(boat) + 1):
            for j in range(len(grid[i]) - len(boat[0]) + 1):
                can_place = True
                for k in range(len(boat)):
                    for l in range(len(boat[k])):
                        if isinstance(grid[i + k][j + l], str):
                            can_place = False
                            break
                    if not can_place:
                        break

                if can_place:
                    for k in range(len(boat)):
                        for l in range(len(boat[k])):
                            grid[i + k][j + l] += boat[k][l]
                    display_grid(boat)
                    display_grid(grid)

        # rotate boat
        boat = rotate_boat(boat)
    return grid


grid = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]]

# boat = [[1, 1, 1], [1, 0, 1]]
boat = [[1, 1, 1], [1, 1, 0]]

grid = get_stats(boat, grid)
display_grid(grid)
