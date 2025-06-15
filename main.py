from prettytable import PrettyTable


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
    for _ in range(4):
        for i in range(len(grid) - len(boat) + 1):
            for j in range(len(grid[i]) - len(boat[0]) + 1):
                can_place = True
                for k, row in enumerate(boat):
                    for l, col in enumerate(row):
                        if isinstance(grid[i + k][j + l], str) and col != 0:
                            can_place = False
                            break
                    if not can_place:
                        break

                if can_place:
                    for k, row in enumerate(boat):
                        for l, col in enumerate(row):
                            if col != 0:
                                grid[i + k][j + l] += col

        # rotate boat
        boat = rotate_boat(boat)
    return grid


grid = [[0, 0, 0, 0],
        [0, 0, "x", 0],
        [0, 0, 0, 0]]

boat = [[1, 1],
        [1, 0],
        [1, 1]]

grid = get_stats(boat, grid)
display_grid(grid)

boat = [[0, 1],
        [1, 1],
        [1, 0]]

grid = get_stats(boat, grid)
display_grid(grid)
